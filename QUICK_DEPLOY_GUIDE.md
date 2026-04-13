# 🚀 ArchLife BHK99 - VPS Deployment (MacBook Se)

## PEHLE YE KARO (One-Time Setup)

### 1. FileZilla Install Karo
- Download: https://filezilla-project.org/download.php?platform=osx
- Install karo Applications folder me

### 2. VPS Details Ready Rakho
```
VPS IP: ___.___.___.___ (Hostinger se milega)
Username: root
Password: ********** (Hostinger panel me)
Port: 22
```

---

## DEPLOYMENT STEPS

### STEP 1: FileZilla Se Files Upload Karo

#### FileZilla Open Karo:
1. Applications → FileZilla

#### VPS Connect Karo:
1. File → Site Manager (Cmd+S)
2. "New Site" click karo
3. Details bharo:
   - Protocol: SFTP - SSH File Transfer Protocol
   - Host: YOUR_VPS_IP
   - Port: 22
   - Logon Type: Normal
   - User: root
   - Password: YOUR_VPS_PASSWORD
4. "Connect" click karo

#### Folder Banao (Right Side - Remote):
1. Address bar me type karo: /var/www/
2. Right click → Create directory
3. Name: archlife-bhk99
4. Double click karke folder kholo

#### Files Upload Karo:
1. Left side (Local): archlife-bhk99 folder kholo
2. Saari files select karo (Cmd+A)
3. Right side (Remote) me drag-drop karo
4. Wait karo 5-10 minutes

---

### STEP 2: Terminal Se VPS Connect Karo

#### Terminal Open Karo:
```bash
# Cmd+Space → type "terminal" → Enter
```

#### VPS Login Karo:
```bash
ssh root@YOUR_VPS_IP
# Password dalo (dikhega nahi, type karte raho)
```

---

### STEP 3: Automatic Deployment

#### Project Folder Me Jao:
```bash
cd /var/www/archlife-bhk99
```

#### Deployment Script Run Karo:
```bash
chmod +x deploy.sh
sudo bash deploy.sh
```

**Ye Script Install Karega:**
- Node.js 18
- MongoDB
- PM2
- Nginx
- Dependencies
- Build website
- Start server

**Wait: 5-10 minutes**

---

### STEP 4: Environment Setup

```bash
nano .env.local
```

**Content (IP ko apne VPS IP se replace karo):**
```env
MONGODB_URI=mongodb://localhost:27017/archlife-bhk99
JWT_SECRET=MySecretKey12345ChangeThis
ADMIN_EMAIL=admin@archlifebhk99.com
ADMIN_PASSWORD=Admin@123
NEXT_PUBLIC_SITE_URL=http://YOUR_VPS_IP
```

**Save:** Ctrl+X → Y → Enter

---

### STEP 5: Server Start Karo

```bash
pm2 restart archlife
sudo systemctl restart nginx
```

**Check Status:**
```bash
pm2 status
```

Green "online" dikhna chahiye ✅

---

### STEP 6: Admin Account Banao

**Browser me jao:**
```
http://YOUR_VPS_IP/api/auth/init
```

**Success message aana chahiye**

---

### STEP 7: Website Check Karo! 🎉

**Homepage:**
```
http://YOUR_VPS_IP
```

**Admin Panel:**
```
http://YOUR_VPS_IP/admin
```

**Login:**
- Email: admin@archlifebhk99.com
- Password: Admin@123

---

## ✅ CHECKLIST

- [ ] FileZilla se files upload ho gayi
- [ ] Terminal se VPS connect hua
- [ ] deploy.sh script successfully run hui
- [ ] .env.local file banai aur edit ki
- [ ] Server restart kiya
- [ ] http://VPS_IP pe website dikhi
- [ ] Admin panel me login ho gaya
- [ ] Password change kar diya

---

## 🔧 TROUBLESHOOTING

### Website Nahi Khul Rahi:
```bash
pm2 logs archlife
sudo systemctl status nginx
```

### MongoDB Error:
```bash
sudo systemctl start mongod
sudo systemctl status mongod
```

### Server Restart Karna Ho:
```bash
pm2 restart archlife
sudo systemctl restart nginx
```

---

## 📞 SUPPORT

Koi problem ho to ye commands run karke output bhejo:
```bash
pm2 status
pm2 logs archlife --lines 50
sudo systemctl status mongod
sudo systemctl status nginx
```

---

**Made with ❤️ for ArchLife BHK99**
