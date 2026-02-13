# 🤖 AI Chatbot - Powered by Google Gemini

A modern, responsive chatbot web application built with HTML, Bootstrap 5, Vanilla JavaScript, and Google Gemini API.

![Chatbot Preview](https://img.shields.io/badge/Status-Ready-success)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple)
![Gemini](https://img.shields.io/badge/Gemini-API-blue)

## ✨ Features

- 🎨 Clean and modern UI with Bootstrap 5
- 💬 Real-time chat interface
- 🤖 Powered by Google Gemini AI
- 📱 Fully responsive design
- ⚡ Fast and lightweight
- 🔄 Auto-scroll to latest messages
- ⌨️ Loading indicators
- 🎯 User-friendly experience

## 📁 Project Structure

```
gemini-chatbot/
├── index.html          # Main HTML file
├── style.css           # Custom styles
├── script.js           # Main JavaScript logic
├── config.js           # API key configuration (DO NOT COMMIT)
├── config.example.js   # Configuration template
├── .gitignore          # Git ignore file
└── README.md           # Documentation
```

## 🚀 Getting Started

### Prerequisites

- A Google Gemini API key (free to get)
- A GitHub account
- A Vercel account (free)

### 1️⃣ Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy your API key (keep it safe!)

### 2️⃣ Local Setup

1. **Download or clone this project**

2. **Configure your API key**
   ```bash
   # Copy the example config file
   cp config.example.js config.js
   ```

3. **Edit `config.js`** and replace `YOUR_GEMINI_API_KEY` with your actual API key:
   ```javascript
   const API_KEY = "your-actual-api-key-here";
   ```

4. **Open `index.html`** in your browser
   - Double-click the file, or
   - Use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     ```

5. **Start chatting!** 🎉

## 🌐 Deploy to Vercel

### Method 1: Deploy via GitHub (Recommended)

1. **Create a new GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/gemini-chatbot.git
   git push -u origin main
   ```

2. **Go to [Vercel](https://vercel.com)**
   - Sign in with your GitHub account
   - Click **"Add New Project"**
   - Select your repository
   - Click **"Deploy"**

3. **Configure Environment Variables in Vercel**
   - Go to your project settings
   - Navigate to **"Environment Variables"**
   - Add a new variable:
     - Name: `API_KEY`
     - Value: Your Gemini API key
   - Save and redeploy

4. **Update `config.js` for production** (optional):
   ```javascript
   // Use environment variable in production
   const API_KEY = typeof process !== 'undefined' && process.env.API_KEY 
       ? process.env.API_KEY 
       : "YOUR_GEMINI_API_KEY";
   ```

### Method 2: Direct Vercel CLI Deploy

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts** and your site will be live!

## ⚠️ Security Warning

### API Key Security

**CRITICAL:** Your API key should NEVER be exposed in public repositories!

This project stores the API key in `config.js` which is:
- ✅ Added to `.gitignore` (not tracked by Git)
- ✅ Should be configured locally or via environment variables

**However, this is still a frontend-only app, which means:**
- ⚠️ The API key is visible in the browser's source code
- ⚠️ Anyone can view it using browser DevTools
- ⚠️ This is NOT suitable for production without backend protection

### Recommended Solutions for Production:

1. **Backend Proxy** (Most Secure)
   - Create a backend API that calls Gemini
   - Frontend calls your backend, not Gemini directly
   - API key stays secure on the server

2. **Vercel Serverless Functions**
   - Use Vercel's API routes to proxy requests
   - Keep API key in environment variables
   - Example: `/api/chat` endpoint

3. **API Key Restrictions** (Partial Protection)
   - In Google Cloud Console, restrict your API key to:
     - Specific referrers (your domain only)
     - Specific IP addresses
   - This limits but doesn't eliminate risk

### For Learning/Demo Purposes:
- ✅ This setup is fine for personal projects
- ✅ Use API key quotas and limits
- ✅ Monitor your API usage regularly
- ✅ Rotate your key if exposed

## 🛠️ Customization

### Change Colors

Edit `style.css`:
```css
/* Main gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* User message gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change AI Model

Edit `config.js`:
```javascript
// Use Gemini Pro (default)
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// Or use Gemini Pro Vision (for images)
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent";
```

### Modify Welcome Message

Edit `index.html`:
```html
<p class="mb-0">Your custom welcome message here!</p>
```

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🐛 Troubleshooting

### "API key not configured" error
- Make sure you've created `config.js` from `config.example.js`
- Verify your API key is correct
- Check that `config.js` is not in `.gitignore` during local testing

### "API request failed" error
- Verify your API key is valid
- Check your internet connection
- Ensure you haven't exceeded API quotas
- Check the browser console for detailed errors

### Messages not displaying
- Open browser console (F12) to check for errors
- Verify all files are loaded correctly
- Check that Bootstrap CSS/JS are loading

## 📚 Resources

- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Vercel Documentation](https://vercel.com/docs)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with ❤️ for learning and demonstration purposes.

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Happy Chatting! 🚀**
