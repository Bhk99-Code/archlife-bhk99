#!/bin/bash

# ArchLife BHK99 - VPS Deployment Script
# Run this on your VPS after uploading the project

echo "🚀 ArchLife BHK99 Deployment Script"
echo "===================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}Please run as root (use sudo)${NC}"
  exit 1
fi

echo -e "${YELLOW}Step 1: Installing Node.js 18...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
echo -e "${GREEN}✓ Node.js installed${NC}"

echo -e "${YELLOW}Step 2: Installing MongoDB...${NC}"
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
apt-get update
apt-get install -y mongodb-org
systemctl start mongod
systemctl enable mongod
echo -e "${GREEN}✓ MongoDB installed and started${NC}"

echo -e "${YELLOW}Step 3: Installing PM2...${NC}"
npm install -g pm2
echo -e "${GREEN}✓ PM2 installed${NC}"

echo -e "${YELLOW}Step 4: Installing project dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"

echo -e "${YELLOW}Step 5: Creating .env.local file...${NC}"
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo -e "${YELLOW}⚠ Please edit .env.local with your MongoDB URI and secrets${NC}"
else
    echo -e "${GREEN}✓ .env.local already exists${NC}"
fi

echo -e "${YELLOW}Step 6: Building Next.js application...${NC}"
npm run build
echo -e "${GREEN}✓ Build completed${NC}"

echo -e "${YELLOW}Step 7: Setting up PM2...${NC}"
pm2 delete archlife 2>/dev/null || true
pm2 start npm --name "archlife" -- start
pm2 save
pm2 startup
echo -e "${GREEN}✓ PM2 configured${NC}"

echo -e "${YELLOW}Step 8: Installing and configuring Nginx...${NC}"
apt-get install -y nginx

# Check if nginx config already exists
if [ ! -f /etc/nginx/sites-available/archlife ]; then
    cat > /etc/nginx/sites-available/archlife <<EOF
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
    ln -s /etc/nginx/sites-available/archlife /etc/nginx/sites-enabled/ 2>/dev/null || true
    echo -e "${YELLOW}⚠ Please edit /etc/nginx/sites-available/archlife and replace 'your-domain.com'${NC}"
else
    echo -e "${GREEN}✓ Nginx config already exists${NC}"
fi

nginx -t
systemctl restart nginx
echo -e "${GREEN}✓ Nginx configured${NC}"

echo ""
echo -e "${GREEN}===================================="
echo "✓ Deployment Complete!"
echo "====================================${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Edit .env.local with your MongoDB URI"
echo "2. Edit /etc/nginx/sites-available/archlife with your domain"
echo "3. Restart services:"
echo "   pm2 restart archlife"
echo "   systemctl restart nginx"
echo ""
echo "4. Initialize admin account:"
echo "   Visit: http://your-domain.com/api/auth/init"
echo ""
echo "5. (Optional) Setup SSL:"
echo "   apt install certbot python3-certbot-nginx"
echo "   certbot --nginx -d your-domain.com"
echo ""
echo -e "${GREEN}Your website should now be live!${NC}"
echo "Website: http://your-domain.com"
echo "Admin: http://your-domain.com/admin"
echo ""
