# ⚡ Quick Start Guide

Get your chatbot running in **5 minutes**!

## 🎯 Prerequisites

- ✅ Google account (for API key)
- ✅ Text editor (VS Code, Notepad++, etc.)
- ✅ Web browser (Chrome recommended)

## 🚀 3 Simple Steps

### Step 1: Get Your API Key (2 minutes)

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy the key (starts with `AIza...`)

### Step 2: Configure the Project (1 minute)

1. **Extract** the ZIP file
2. **Copy** `config.example.js` → rename to `config.js`
3. **Open** `config.js` in any text editor
4. **Replace** `YOUR_GEMINI_API_KEY` with your actual key:
   ```javascript
   const API_KEY = "AIzaSy...your-actual-key-here";
   ```
5. **Save** the file

### Step 3: Run It! (30 seconds)

**Option A: Double-click**
- Just open `index.html` in your browser

**Option B: Local Server** (recommended)
```bash
# Python (if installed)
python -m http.server 8000

# Then open: http://localhost:8000
```

## 🎉 Done!

You should now see your chatbot! Try sending a message.

---

## 🌐 Want to Deploy Online?

### Deploy to Vercel (5 more minutes)

1. **Create GitHub account**: https://github.com/join
2. **Create Vercel account**: https://vercel.com/signup (use GitHub)
3. **Push to GitHub**:
   ```bash
   cd gemini-chatbot
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/gemini-chatbot.git
   git push -u origin main
   ```
4. **Deploy on Vercel**:
   - Go to: https://vercel.com/new
   - Import your repository
   - Click **Deploy**

5. **Your site is live!** 🎊
   - URL: `https://your-project.vercel.app`

---

## ⚠️ Security Note

Your API key is visible in the browser. For demo/learning this is OK, but for production:
- Use a backend proxy (see `SECURITY.md`)
- Or restrict your API key to your domain in Google Cloud Console

---

## 🆘 Issues?

### "API key not configured"
- ✅ Created `config.js`? (not `.example`)
- ✅ Key copied correctly? (no extra spaces)
- ✅ Saved the file?

### "API request failed"
- ✅ Key is valid?
- ✅ Internet connected?
- ✅ Check browser console (F12) for errors

### "Page won't load"
- ✅ All files in same folder?
- ✅ Try a local server instead of double-clicking
- ✅ Clear browser cache (Ctrl+Shift+Delete)

---

## 📚 More Help

- **Full Documentation**: See `README.md`
- **Deployment Guide**: See `DEPLOYMENT_GUIDE.md`
- **Security Guide**: See `SECURITY.md`

---

**Enjoy your chatbot!** 🤖✨
