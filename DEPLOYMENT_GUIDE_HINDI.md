# ArchLife BHK99 - VPS Deployment Guide (Hindi)

## 🚀 Hostinger VPS Pe Deploy Kaise Karein

### Step 1: Project Upload Karo

**Option A: FileZilla/WinSCP Use Karke**
```
1. FileZilla open karo
2. VPS IP, username, password dalo
3. archlife-bhk99 folder ko /var/www/ me upload karo
```

**Option B: Git Use Karke (Recommended)**
```bash
# SSH se VPS connect karo
ssh root@your-vps-ip

# Project download karo
cd /var/www/
git clone <your-github-repo-url> archlife-bhk99
cd archlife-bhk99
```

### Step 2: Automatic Deployment Script Run Karo

```bash
cd /var/www/archlife-bhk99
sudo bash deploy.sh
```

Ye script **automatically** install karega:
- Node.js 18
- MongoDB
- PM2
- Nginx
- Project dependencies
- Build karega
- Server start karega

### Step 3: Environment Variables Set Karo

```bash
nano .env.local
```

Ye edit karo:
```env
MONGODB_URI=mongodb://localhost:27017/archlife-bhk99
JWT_SECRET=apna-super-secret-key-yahan-likho
ADMIN_EMAIL=admin@archlifebhk99.com
ADMIN_PASSWORD=Admin@123
NEXT_PUBLIC_SITE_URL=http://your-domain.com
```

Save karo: `Ctrl + X`, phir `Y`, phir `Enter`

### Step 4: Domain Name Set Karo

```bash
nano /etc/nginx/sites-available/archlife
```

`your-domain.com` ko apne actual domain se replace karo

Restart karo:
```bash
pm2 restart archlife
systemctl restart nginx
```

### Step 5: Admin Account Banao

Browser me jao:
```
http://your-domain.com/api/auth/init
```

Ye first admin account create karega.

### Step 6: Admin Panel Login Karo

```
http://your-domain.com/admin
```

Default Login:
- Email: `admin@archlifebhk99.com`
- Password: `Admin@123`

**⚠️ IMPORTANT**: Login ke baad immediately password change karo!

---

## 🔧 Common Commands

### Server Restart Karna
```bash
pm2 restart archlife
```

### Server Status Dekhna
```bash
pm2 status
pm2 logs archlife
```

### MongoDB Check Karna
```bash
sudo systemctl status mongod
sudo systemctl start mongod
```

### Build Update Karna (Code change ke baad)
```bash
cd /var/www/archlife-bhk99
git pull  # If using Git
npm run build
pm2 restart archlife
```

---

## 🌐 SSL Certificate (HTTPS) Setup

```bash
# Certbot install karo
sudo apt install certbot python3-certbot-nginx

# SSL certificate setup karo (automatic)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal test karo
sudo certbot renew --dry-run
```

---

## 🎨 Website Customize Karna

### Colors Change Karna
File: `tailwind.config.js`
```js
primary: {
  500: '#f97316',  // Yahan apna color code dalo
}
```

### Company Info Change Karna
File: `components/Footer.tsx`

### Services Update Karna
File: `components/Services.tsx`

### Hero Section Edit Karna
File: `components/Hero.tsx`

---

## 📱 Portfolio Projects Add Karna

1. Admin panel login karo
2. Projects section me jao
3. "Add New Project" click karo
4. Project details aur images upload karo
5. Save karo

---

## ❓ Troubleshooting

### Website nahi chal rahi
```bash
# Check karo server chal raha hai ya nahi
pm2 status

# Logs dekho kya error aa raha hai
pm2 logs archlife

# Restart karo
pm2 restart archlife
```

### Port 3000 already in use
```bash
# Port 3000 pe running process band karo
lsof -i :3000
kill -9 <PID>

# Ya port change karo package.json me
"start": "next start -p 3001"
```

### MongoDB connection error
```bash
# MongoDB start karo
sudo systemctl start mongod
sudo systemctl enable mongod

# Status check karo
sudo systemctl status mongod
```

### Nginx error
```bash
# Configuration test karo
sudo nginx -t

# Restart karo
sudo systemctl restart nginx
```

---

## 📞 Support

Agar koi problem aaye to:
1. Error logs dekho: `pm2 logs archlife`
2. MongoDB running hai check karo: `systemctl status mongod`
3. Nginx running hai check karo: `systemctl status nginx`

---

## ✅ Final Checklist

- [ ] VPS pe project upload ho gaya
- [ ] `deploy.sh` script successfully run ho gaya
- [ ] `.env.local` file edit kar diya
- [ ] Domain name Nginx config me set kar diya
- [ ] Admin account ban gaya
- [ ] Admin panel me login ho gaya
- [ ] Password change kar diya
- [ ] SSL certificate setup kar diya (optional)

**🎉 Congratulations! Aapki website live hai!**

Website: `http://your-domain.com`
Admin: `http://your-domain.com/admin`
