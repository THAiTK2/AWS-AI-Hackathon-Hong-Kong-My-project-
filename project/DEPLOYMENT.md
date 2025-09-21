# Deployment Options for MHFA Copilot HK

## Free Hosting Options

### 1. GitHub Pages (Recommended)
1. Create a GitHub repository
2. Upload all project files
3. Go to Settings > Pages
4. Select "Deploy from a branch" > main branch
5. Your URL will be: `https://yourusername.github.io/repository-name`

### 2. Netlify
1. Visit netlify.com
2. Drag and drop your project folder
3. Get instant URL like: `https://random-name.netlify.app`
4. Can customize to: `https://mhfa-copilot-hk.netlify.app`

### 3. Vercel
1. Visit vercel.com
2. Import from GitHub or upload files
3. Get URL like: `https://mhfa-copilot-hk.vercel.app`

### 4. Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run: `firebase init hosting`
3. Deploy: `firebase deploy`
4. Get URL like: `https://project-name.web.app`

## Quick Deploy Commands

### For Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir .
```

### For Vercel CLI:
```bash
npm install -g vercel
vercel --prod
```

## Requirements for PWA
- Must be served over HTTPS (all above options provide this)
- Service worker needs to be registered (already included)
- Icons should be added to `/icons/` directory

## Recommended: GitHub Pages
1. Most reliable and free
2. Easy to update
3. Good for open source projects
4. Automatic HTTPS

Your final URL will look like:
`https://yourusername.github.io/mhfa-copilot-hk`