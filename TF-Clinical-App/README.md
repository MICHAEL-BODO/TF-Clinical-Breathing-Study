# TF Clinical Breathing App - Setup Instructions

## 📋 Quick Setup

The complete React code for this app is in the Claude artifacts above. Follow these steps:

### Step 1: Copy the Complete App.jsx Code

1. Scroll up to find the artifact titled "TF Clinical Breathing App - Participant"
2. Click the copy button in the artifact
3. Paste the complete code into: `src/App.jsx` (replace the current placeholder)

### Step 2: Install Dependencies

```bash
cd "C:\Users\mis2\Documents\TF-Clinical-Breathing-Study\TF-Clinical-App"
npm install
```

### Step 3: Start the App

```bash
npm start
```

The app should open at http://localhost:3000

## ✅ What This App Does

- ✅ Participant check-in with ID assignment
- ✅ 5 breathing techniques with animations  
- ✅ 5-minute timer with countdown
- ✅ Hungarian/English language toggle
- ✅ Session data storage
- ✅ Haptic feedback (mobile)

## 🎯 Testing

1. Enter test ID: `P-001`
2. Select Group: `1` (Box Breathing)
3. Click through instructions
4. Test the 5-minute breathing session
5. Verify session completes and data saves

## 📱 Deployment

For study day, you can:
- Run on local network: `npm start -- --host 0.0.0.0`
- Build for production: `npm run build`
- Serve from USB: `npx serve -s build`

## Support

Technical: Mihály Bodo
Clinical: Dr. Szabó Sándor András
