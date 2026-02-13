# 📦 Complete Deployment Guide

This guide will walk you through deploying your AI Chatbot from start to finish.

## 📋 Table of Contents

1. [Get Google Gemini API Key](#1-get-google-gemini-api-key)
2. [Setup Locally](#2-setup-locally)
3. [Push to GitHub](#3-push-to-github)
4. [Deploy to Vercel](#4-deploy-to-vercel)
5. [Environment Variables](#5-environment-variables)
6. [Testing](#6-testing)

---

## 1️⃣ Get Google Gemini API Key

### Step-by-Step:

1. **Visit Google AI Studio**
   - Go to: https://makersuite.google.com/app/apikey
   - Or: https://aistudio.google.com/

2. **Sign In**
   - Use your Google account
   - Accept terms of service if prompted

3. **Create API Key**
   - Click **"Get API Key"** button
   - Click **"Create API key in new project"** (recommended)
   - Or select an existing Google Cloud project

4. **Copy Your Key**
   - Your API key will look like: `AIzaSyD...` (39 characters)
   - **Keep it safe!** Don't share it publicly

5. **Set Up Restrictions (Optional but Recommended)**
   - Click on your API key
   - Add HTTP referrer restrictions (your domain)
   - Set usage quotas to prevent abuse

---

## 2️⃣ Setup Locally

### Option A: Download ZIP

1. **Extract the ZIP file** to your desired location

2. **Navigate to the folder**
   ```bash
   cd gemini-chatbot
   ```

3. **Create config.js**
   ```bash
   cp config.example.js config.js
   ```

4. **Edit config.js**
   - Open `config.js` in any text editor
   - Replace `YOUR_GEMINI_API_KEY` with your actual API key
   - Save the file

5. **Test Locally**
   - Open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Python
     python -m http.server 8000
     
     # PHP
     php -S localhost:8000
     
     # Node.js (if you have npx)
     npx serve
     ```
   - Visit: `http://localhost:8000`

### Option B: Clone from GitHub

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/gemini-chatbot.git
cd gemini-chatbot

# Create config file
cp config.example.js config.js

# Edit config.js with your API key
nano config.js
# or
code config.js
```

---

## 3️⃣ Push to GitHub

### First Time Setup:

1. **Install Git** (if not already installed)
   - Download from: https://git-scm.com/downloads

2. **Configure Git**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

3. **Create GitHub Repository**
   - Go to: https://github.com/new
   - Repository name: `gemini-chatbot` (or any name)
   - Description: "AI Chatbot powered by Google Gemini"
   - Choose: **Public** or **Private**
   - ⚠️ **DO NOT** initialize with README (we already have one)
   - Click **"Create repository"**

### Push Your Code:

```bash
# Navigate to your project folder
cd gemini-chatbot

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AI Chatbot with Gemini"

# Set main branch
git branch -M main

# Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/gemini-chatbot.git

# Push to GitHub
git push -u origin main
```

### ⚠️ Important: Verify config.js is NOT uploaded

```bash
# Check what's being tracked
git status

# config.js should NOT appear in the list
# If it does, you need to remove it:
git rm --cached config.js
git commit -m "Remove config.js from tracking"
git push
```

---

## 4️⃣ Deploy to Vercel

### Option A: GitHub Integration (Recommended)

1. **Sign Up/Login to Vercel**
   - Go to: https://vercel.com
   - Click **"Sign Up"**
   - Choose **"Continue with GitHub"**
   - Authorize Vercel to access your GitHub

2. **Import Project**
   - Click **"Add New..."** → **"Project"**
   - Select **"Import Git Repository"**
   - Find your `gemini-chatbot` repository
   - Click **"Import"**

3. **Configure Project**
   - **Project Name**: `gemini-chatbot` (or your preferred name)
   - **Framework Preset**: Leave as **"Other"** or **"Static"**
   - **Root Directory**: `./` (default)
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty or `./`
   - Click **"Deploy"**

4. **Wait for Deployment**
   - Vercel will build and deploy your site
   - You'll get a URL like: `https://gemini-chatbot.vercel.app`

### Option B: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd gemini-chatbot
   vercel
   ```

4. **Follow Prompts**
   - Set up and deploy? **Y**
   - Which scope? (Select your account)
   - Link to existing project? **N**
   - What's your project's name? `gemini-chatbot`
   - In which directory is your code located? `./`
   - Want to modify settings? **N**

5. **Production Deploy**
   ```bash
   vercel --prod
   ```

---

## 5️⃣ Environment Variables

### ⚠️ CRITICAL: Secure Your API Key

Since this is a frontend app, you have two options:

### Option A: Use Vercel Environment Variables (Frontend)

1. **Go to Vercel Dashboard**
   - Select your project
   - Go to **"Settings"** tab
   - Click **"Environment Variables"**

2. **Add Variable**
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your actual API key
   - **Environments**: Check all (Production, Preview, Development)
   - Click **"Save"**

3. **Update config.js** to read from environment:
   ```javascript
   // This won't work in frontend-only apps
   // You'll need a backend or serverless function
   ```

### Option B: Keep API Key in Frontend (Less Secure)

1. **Create `config.js` on Vercel**
   - This requires manual upload or build script
   - Not recommended for public projects

2. **Use API Key Restrictions**
   - Go to Google Cloud Console
   - Restrict API key to your Vercel domain
   - Example: `*.vercel.app` or your custom domain

### Option C: Create Backend Proxy (Most Secure) ⭐

Create a Vercel Serverless Function:

1. **Create `api/chat.js`**
   ```javascript
   export default async function handler(req, res) {
     const API_KEY = process.env.GEMINI_API_KEY;
     const { message } = req.body;
     
     const response = await fetch(
       `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
       {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           contents: [{ parts: [{ text: message }] }]
         })
       }
     );
     
     const data = await response.json();
     res.json(data);
   }
   ```

2. **Update `script.js`**
   ```javascript
   // Change API call to your backend
   const response = await fetch('/api/chat', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ message: userMessage })
   });
   ```

---

## 6️⃣ Testing

### Test Locally:

```bash
# Open in browser
open index.html

# Or use a local server
python -m http.server 8000
```

**Checklist:**
- [ ] Page loads without errors
- [ ] Can type messages
- [ ] Can send messages
- [ ] Bot responds
- [ ] No API key errors in console

### Test on Vercel:

1. **Visit your Vercel URL**
   - Example: `https://gemini-chatbot.vercel.app`

2. **Check Browser Console**
   - Press F12
   - Look for errors

3. **Test Chat Functionality**
   - Send a message
   - Verify bot responds
   - Check loading indicators work

4. **Test on Mobile**
   - Open on your phone
   - Check responsive design
   - Test chat functionality

---

## 🔧 Troubleshooting

### Error: "API key not configured"

**Solution:**
- Verify `config.js` exists locally
- Check API key format (should be 39 characters starting with `AIza`)
- Ensure no extra spaces or quotes

### Error: "API request failed"

**Solutions:**
- Check API key is valid
- Verify Gemini API is enabled in Google Cloud Console
- Check API quotas haven't been exceeded
- Look at browser console for detailed error message

### Error: "Failed to fetch"

**Solutions:**
- Check internet connection
- Verify CORS isn't blocking requests
- Check browser console for network errors

### GitHub Push Fails

**Solutions:**
```bash
# If remote exists
git remote rm origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# If authentication fails
# Use personal access token instead of password
# Generate at: https://github.com/settings/tokens
```

### Vercel Deployment Fails

**Solutions:**
- Check build logs in Vercel dashboard
- Verify all files are in repository
- Ensure no build commands are needed
- Check that framework preset is correct

---

## 📞 Need Help?

- **Gemini API Issues**: https://ai.google.dev/docs
- **GitHub Issues**: https://docs.github.com/
- **Vercel Support**: https://vercel.com/docs

---

## 🎉 Success!

If you've followed all steps, your chatbot should now be:
- ✅ Running locally
- ✅ Pushed to GitHub
- ✅ Deployed on Vercel
- ✅ Accessible worldwide

**Your live URL**: `https://your-project-name.vercel.app`

Share it with friends! 🚀
