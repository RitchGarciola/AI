# 🔐 Security Guide

## ⚠️ Important Security Information

This project is a **frontend-only** application, which has inherent security limitations when it comes to API key management.

## 🚨 Critical Security Warnings

### API Key Exposure

**THE PROBLEM:**
- In this frontend-only setup, your Gemini API key is visible in the browser
- Anyone can view it using browser Developer Tools (F12)
- This exposes your API key to potential misuse

**CURRENT PROTECTION:**
- ✅ API key is in `config.js` (gitignored)
- ✅ Not committed to public repositories
- ❌ Still visible to end users in their browser

## 🛡️ Security Recommendations

### For Learning/Demo Projects (Current Setup)

**This is acceptable for:**
- Personal learning projects
- Local development
- Portfolio demonstrations
- Low-traffic hobby projects

**Mitigations:**
1. **Enable API Key Restrictions** in Google Cloud Console:
   - Application restrictions: HTTP referrers
   - Add your domain: `*.vercel.app` or `yourdomain.com`
   - Website restrictions limit (but don't eliminate) misuse

2. **Set Quotas and Budgets**:
   - Set daily/monthly quotas in Google Cloud Console
   - Enable billing alerts
   - Monitor usage regularly

3. **Rotate Keys Regularly**:
   - Generate new API keys monthly
   - Revoke old keys
   - Update your deployment

### For Production Applications ⭐

**YOU SHOULD IMPLEMENT:**

#### Option 1: Backend Proxy (Recommended)

Create a backend server that:
- Stores the API key securely
- Receives requests from your frontend
- Calls Gemini API on behalf of the frontend
- Returns responses to the frontend

**Example architecture:**
```
User Browser → Your Backend API → Gemini API
              (API key hidden)
```

**Technologies:**
- Node.js + Express
- Python + Flask
- Vercel Serverless Functions
- Netlify Functions
- AWS Lambda

#### Option 2: Vercel Serverless Functions

**Create `/api/chat.js`:**

```javascript
export default async function handler(req, res) {
  // API key stored in Vercel environment variables
  const API_KEY = process.env.GEMINI_API_KEY;
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message required' });
  }
  
  try {
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
    res.status(200).json(data);
    
  } catch (error) {
    res.status(500).json({ error: 'API request failed' });
  }
}
```

**Update `script.js`:**

```javascript
async function sendToGemini(message) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  
  if (!response.ok) {
    throw new Error('API request failed');
  }
  
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
```

**Add to Vercel Environment Variables:**
- Key: `GEMINI_API_KEY`
- Value: Your actual API key

#### Option 3: Authentication Layer

Add user authentication to:
- Track who's using your app
- Set per-user rate limits
- Block malicious users
- Monitor usage patterns

**Technologies:**
- Firebase Authentication
- Auth0
- Clerk
- NextAuth.js

## 📋 Security Checklist

### Before Deploying:

- [ ] Remove API key from any public code
- [ ] Add `config.js` to `.gitignore`
- [ ] Verify `config.js` is not in Git history
- [ ] Set up API key restrictions in Google Cloud Console
- [ ] Configure quotas and budgets
- [ ] Enable billing alerts

### After Deploying:

- [ ] Test that API key isn't visible in page source
- [ ] Verify API key restrictions are working
- [ ] Monitor API usage dashboard
- [ ] Set up usage alerts
- [ ] Document your security setup

### For Production:

- [ ] Implement backend proxy or serverless functions
- [ ] Store API keys in environment variables
- [ ] Add rate limiting
- [ ] Implement user authentication (if needed)
- [ ] Set up monitoring and logging
- [ ] Create incident response plan

## 🔍 Checking for Exposed Keys

### Check Git History:

```bash
# Search for API keys in git history
git log --all --full-history --source --pretty=format:'%H' -- config.js

# If found, you need to remove it from history
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch config.js' \
  --prune-empty --tag-name-filter cat -- --all
```

### Check GitHub:

1. Go to your repository
2. Use GitHub search: `AIza` (Gemini keys start with this)
3. Check all branches
4. Check releases and tags

### If Your Key Was Exposed:

1. **Immediately** revoke the exposed key in Google Cloud Console
2. Generate a new API key
3. Update your local `config.js`
4. Redeploy your application
5. Remove the key from Git history (see above)
6. Force push to GitHub: `git push --force`

## 📊 Monitoring API Usage

### Google Cloud Console:

1. Go to: https://console.cloud.google.com/
2. Select your project
3. Navigate to: APIs & Services → Credentials
4. Click on your API key
5. View "Metrics" tab

**Monitor for:**
- Unusual spike in requests
- Requests from unexpected locations
- Requests outside your normal usage patterns

### Set Up Alerts:

1. Create budget alerts
2. Set quota limits
3. Enable email notifications
4. Review usage weekly

## 🆘 What If My Key Is Compromised?

### Immediate Actions:

1. **Revoke the key immediately**
   - Google Cloud Console → APIs & Services → Credentials
   - Find your key → Click ⋮ → Delete

2. **Generate new key**
   - Create API key in new project
   - Add restrictions before use

3. **Update your application**
   - Local: Update `config.js`
   - Vercel: Update environment variables
   - Redeploy

4. **Review the damage**
   - Check API usage for unexpected calls
   - Review billing
   - Check for any data exposure

5. **Implement better security**
   - Move to backend proxy
   - Add authentication
   - Improve monitoring

## 📚 Additional Resources

- [Google Cloud Security Best Practices](https://cloud.google.com/security/best-practices)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [Vercel Security](https://vercel.com/docs/security)

## ⚖️ Legal & Compliance

### Terms of Service

Ensure your usage complies with:
- Google Gemini API Terms of Service
- Google Cloud Terms of Service
- Your local data protection laws (GDPR, CCPA, etc.)

### Data Privacy

Consider:
- What data are you sending to Gemini?
- Are you storing user conversations?
- Do you need user consent?
- Are you complying with privacy regulations?

---

**Remember:** Security is not a one-time setup. It's an ongoing process of monitoring, updating, and improving your security posture.

🔐 **Stay Safe!**
