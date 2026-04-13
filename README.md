# ArchLife BHK99 - Premium Architecture Website

A modern, full-stack architecture firm website with 3D scrolling effects, client submission system, and complete admin dashboard.

## 🎨 Features

### Public Website
- **Apple-style 3D Parallax Scrolling** - Smooth, premium animations
- **Orange-Gray-White Theme** - Modern, professional color scheme
- **Responsive Design** - Mobile-first, works perfectly on all devices
- **Client Submission Form** - Easy project inquiry system
- **Portfolio Gallery** - Showcase your best work
- **Service Pages** - Detailed service descriptions

### Admin Dashboard
- **Project Management** - Add, edit, delete portfolio projects
- **Client Submissions** - View and manage all inquiries
- **Status Updates** - Track submission progress
- **Analytics Dashboard** - View stats and metrics
- **Secure Authentication** - JWT-based admin login

## 🚀 Technology Stack

- **Frontend**: Next.js 14 (React), TypeScript, Tailwind CSS
- **Animations**: Framer Motion, Three.js
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Hostinger VPS

## 📦 Installation

### 1. Prerequisites
```bash
Node.js 18+ installed
MongoDB installed or MongoDB Atlas account
```

### 2. Clone & Install Dependencies
```bash
cd archlife-bhk99
npm install
```

### 3. Environment Setup
Create `.env.local` file:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/archlife-bhk99
# OR use MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/archlife

# JWT Secret (change this!)
JWT_SECRET=your-very-secure-random-string-here

# Admin Credentials (Default)
ADMIN_EMAIL=admin@archlifebhk99.com
ADMIN_PASSWORD=Admin@123

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
```

Website: `http://localhost:3000`  
Admin: `http://localhost:3000/admin`

## 🏗️ VPS Deployment (Hostinger)

### Step 1: Connect to VPS
```bash
ssh root@your-vps-ip
```

### Step 2: Install Node.js & MongoDB
```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Step 3: Install PM2
```bash
npm install -g pm2
```

### Step 4: Upload Project
```bash
# On your local machine
scp -r archlife-bhk99 root@your-vps-ip:/var/www/
```

OR use Git:
```bash
cd /var/www/
git clone <your-repo-url> archlife-bhk99
cd archlife-bhk99
```

### Step 5: Build & Start
```bash
cd /var/www/archlife-bhk99
npm install
npm run build

# Start with PM2
pm2 start npm --name "archlife" -- start
pm2 save
pm2 startup
```

### Step 6: Setup Nginx
```bash
sudo apt install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/archlife
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/archlife /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 7: SSL Certificate (Optional but Recommended)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 🔒 First Time Setup

### Initialize Admin Account
1. Visit: `http://your-domain.com/api/auth/init` (POST request)
2. This creates the first admin account
3. Default credentials:
   - Email: `admin@archlifebhk99.com`
   - Password: `Admin@123`

### Login to Admin Panel
1. Go to: `http://your-domain.com/admin`
2. Login with default credentials
3. **IMPORTANT**: Change password immediately!

## 📁 Project Structure

```
archlife-bhk99/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication
│   │   ├── projects/     # Portfolio CRUD
│   │   └── submissions/  # Client submissions
│   ├── admin/            # Admin dashboard pages
│   ├── submit-project/   # Client submission form
│   └── page.tsx          # Homepage
├── components/
│   ├── Hero.tsx          # 3D Hero section
│   ├── Services.tsx      # Services section
│   ├── Process.tsx       # Process timeline
│   ├── Header.tsx        # Navigation
│   └── Footer.tsx        # Footer
├── models/               # MongoDB schemas
│   ├── Admin.ts
│   ├── Project.ts
│   └── Submission.ts
├── lib/
│   └── dbConnect.ts      # Database connection
└── public/               # Static assets
```

## 🎯 Key Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Main landing page with 3D effects |
| Submit Project | `/submit-project` | Client inquiry form |
| Admin Login | `/admin` | Admin authentication |
| Dashboard | `/admin/dashboard` | Admin overview |
| Submissions | `/admin/submissions` | Manage client inquiries |
| Projects | `/admin/projects` | Manage portfolio |

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js`:
```js
primary: {
  500: '#f97316', // Change to your brand color
}
```

### Update Content
- **Company Info**: Edit `components/Footer.tsx`
- **Services**: Edit `components/Services.tsx`
- **Process**: Edit `components/Process.tsx`

### Add Portfolio Projects
1. Login to admin panel
2. Go to Projects section
3. Add new project with images

## 🐛 Troubleshooting

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

### Port 3000 Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in package.json
"start": "next start -p 3001"
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## 📞 Support

For issues or questions:
- Email: info@archlifebhk99.com
- Admin Panel: Change in Footer.tsx

## 📄 License

Copyright © 2024 ArchLife BHK99. All rights reserved.

---

**Made with ❤️ for ArchLife BHK99**
