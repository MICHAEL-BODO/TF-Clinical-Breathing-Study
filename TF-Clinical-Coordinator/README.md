# TF Clinical Coordinator Dashboard - Setup Instructions

## 📋 Quick Setup

The complete React code for this dashboard is in the Claude artifacts above. Follow these steps:

### Step 1: Copy the Complete App.jsx Code

1. Scroll up to find the artifact titled "TF Clinical Coordinator Dashboard"
2. Click the copy button in the artifact
3. Paste the complete code into: `src/App.jsx`

### Step 2: Install Dependencies

```bash
cd "C:\Users\mis2\Documents\TF-Clinical-Breathing-Study\TF-Clinical-Coordinator"
npm install
```

### Step 3: Start the Dashboard

```bash
npm start
```

The dashboard should open at http://localhost:3001 (different port from participant app)

## ✅ What This Dashboard Does

- ✅ Real-time session monitoring
- ✅ Participant registration & demographics
- ✅ Group progress tracking (10 per group)
- ✅ Master CSV export
- ✅ Hungarian/English interface
- ✅ Session completion statistics

## 🎯 Testing

1. Register test participant: `P-001`, Group `1`
2. Enter demographics (age, gender, weight, height)
3. Monitor active sessions (runs participant app separately)
4. Export CSV and verify data
5. Test clear data function

## 📊 Master CSV Format

Contains:
- Participant ID, Group, Technique
- Demographics (age, gender, weight, height)
- Session timestamps
- File links: VT_PXXX_PRE.csv, NX_PXXX.edf, VT_PXXX_POST.csv

## Support

Technical: Mihály Bodo
Clinical: Dr. Szabó Sándor András
