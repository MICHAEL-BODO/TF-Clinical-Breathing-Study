# TF Clinical Breathing Study

**Version: 0.5.0**  
**Last Updated:** November 16, 2025  
**Status:** Active Development

---

## 🚀 **Quick Links**

- **GitHub Repository:** https://github.com/MICHAEL-BODO/TF-Clinical-Breathing-Study
- **Participant App:** `localhost:3000` (Production URL coming soon)
- **Coordinator Dashboard:** `localhost:3001` (Production URL coming soon)

---

## 📋 **Project Overview**

**50-participant breathing intervention clinical trial**  
**Location:** TF University, Budapest, Hungary  
**Study Date:** December 2025

Randomized controlled trial comparing 5 breathing techniques for anxiety reduction in university students (n=50, 10 per group).

---

## 🎯 **Current Version: v0.5.0**

### **What's New in v0.5**

✅ **Participant App:**
- Pre/Post anxiety assessment (GAD-7 scale 0-21)
- Real-time session progress broadcasting
- Completion screen with full session summary
- Researcher alerts for equipment attachment
- Live data sync with coordinator dashboard
- Hungarian/English language support

✅ **Coordinator Dashboard:**
- Live participant registration count
- Real-time session monitoring with countdown timers
- Equipment data collection tracking (Vienna Test Pre/Post, NeXus-32)
- Complete data pairs counter
- Success rate percentage
- Enhanced CSV export with anxiety scores
- Quick-mark buttons for equipment data
- Recent completions feed

✅ **Infrastructure:**
- Tailwind CSS v3 integration
- PostCSS configuration
- localStorage-based real-time sync
- Proper version control

---

## 📦 **Installation**

### **Prerequisites**
- Node.js 16+ and npm
- Modern web browser (Chrome/Edge/Firefox)
- Git

### **Setup**

```bash
# Clone repository
git clone https://github.com/MICHAEL-BODO/TF-Clinical-Breathing-Study.git
cd TF-Clinical-Breathing-Study

# Install Participant App
cd TF-Clinical-App
npm install
npm start  # Opens on localhost:3000

# Install Coordinator Dashboard (separate terminal)
cd ../TF-Clinical-Coordinator
npm install
npm start  # Opens on localhost:3001
```

---

## 📁 **Repository Structure**

```
TF-Clinical-Breathing-Study/
├── TF-Clinical-App/              # Participant breathing guide
│   ├── src/
│   │   ├── App.jsx               # Main participant component
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── TF-Clinical-Coordinator/      # Researcher dashboard
│   ├── src/
│   │   ├── App.jsx               # Main coordinator component
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── TF-Clinical-MASTER-CSV-GEN/   # Data export utilities
├── TF-Clinical-Hung-Support/     # Hungarian localization
├── docs/                          # Study documentation
├── data/                          # Data templates (gitignored)
├── scripts/                       # Setup scripts
├── .gitignore
├── README.md
└── CHANGELOG.md
```

---

## 🔬 **Study Design**

### **5 Breathing Techniques:**
1. **Box Breathing (4-4-4-4)** - Group 1
2. **4-7-8 Breathing** - Group 2
3. **Coherence/HRV Breathing** - Group 3
4. **Physiological Sigh** - Group 4
5. **Breath Hold/Buteyko** - Group 5

### **Measurements:**
- **Primary:** Anxiety scores (GAD-7 scale, 0-21) pre/post intervention
- **Secondary:** 
  - Heart Rate Variability (NeXus-32 EDF files)
  - STAI scores (Vienna Test System CSV files)
  - Session adherence (cycle completion rate)

### **Equipment:**
- 10x NeXus-32 QEEG/Bio/Neurofeedback Systems
- 10x Vienna Test System computers
- 10x Tablets (participant app)
- 1x Coordinator tablet

---

## 🎮 **Usage Guide**

### **Study Day Workflow:**

**1. Register Participant (Coordinator)**
```
- Open http://localhost:3001
- Enter: ID (P-001), Group (1-5), Demographics
- Click "REGISTER PARTICIPANT"
- Count updates live: "1/50 Registered"
```

**2. Participant Session (Participant App)**
```
- Open http://localhost:3000
- Enter ID and select group
- Rate pre-anxiety (0-21 scale)
- Researcher attaches NeXus sensors
- Complete 5-minute breathing exercise
- Rate post-anxiety (0-21 scale)
- View completion summary
```

**3. Monitor & Export (Coordinator)**
```
- Watch live session progress
- Mark equipment data collected:
  - Vienna Test Pre (Blue button)
  - NeXus-32 (Green button)
  - Vienna Test Post (Orange button)
- Export Master CSV at end of day
```

---

## 📊 **Data Collection Strategy**

### **After Each Participant (Recommended):**

1. Participant completes session
2. Dashboard shows: "P-001 Complete - Export Data Now"
3. Researcher exports:
   - NeXus file: `NX_P001.edf` → USB drive
   - Vienna Pre: `VT_P001_PRE.csv` → USB drive
   - Vienna Post: `VT_P001_POST.csv` → USB drive
4. Mark collected in dashboard
5. Repeat for next participant

**Benefits:**
- Prevents data loss
- Immediate quality check
- Easy file tracking

---

## 📈 **Data Export Format**

Master CSV includes:
```
ParticipantID, Group, Technique, Age, Gender, Weight_kg, Height_cm,
RegisteredAt, SessionStart, SessionEnd,
AnxietyPre, AnxietyPost, AnxietyChange,
CyclesCompleted, Adherence,
CompletionStatus,
ViennaTestPre_File, ViennaTestPre_Collected,
NeXus_File, NeXus_Collected,
ViennaTestPost_File, ViennaTestPost_Collected,
DataComplete
```

---

## 👥 **Study Team**

- **PI:** Dr. Szabó Sándor András
- **CTO/Data Manager:** Mihály Bodo (@MICHAEL-BODO)
- **Wellness Coordinator:** Tamás Avar
- **Statistical Consultant:** Professor Emeritus (TF University)
- **Clinical Advisor:** Prof. Dr. Michael Bodo

---

## 🔐 **Data Security**

- ✅ Anonymous participant IDs only (P-001 to P-050)
- ✅ No personal data committed to Git
- ✅ GDPR compliant data handling
- ✅ Encrypted backups (3 locations)
- ✅ `.gitignore` configured for data files

---

## 📝 **Version History**

### **v0.5.0** - November 16, 2025
- ✅ Added pre/post anxiety assessment (GAD-7 scale)
- ✅ Implemented real-time data sync between app and dashboard
- ✅ Added live participant count
- ✅ Added equipment data tracking section
- ✅ Implemented session completion tracking
- ✅ Added researcher alerts
- ✅ Enhanced CSV export with all metrics
- ✅ Configured Tailwind CSS v3
- ✅ Added PostCSS configuration

### **v0.1.0** - November 15, 2025
- Initial repository setup
- Basic participant app structure
- Basic coordinator dashboard
- GitHub repository created

---

## 🚧 **Roadmap**

### **v0.6.0** (Next Release)
- [ ] GitHub Pages deployment
- [ ] Public URLs for both apps
- [ ] Automated version tagging
- [ ] Production build optimization

### **v0.7.0**
- [ ] WebSocket real-time sync (WiFi)
- [ ] Push notifications for researchers
- [ ] Audio cues for breathing phases
- [ ] Session pause/resume functionality

### **v1.0.0** (Study Day Ready)
- [ ] Complete Hungarian translation review
- [ ] Offline mode support
- [ ] Data backup automation
- [ ] Final QA testing

---

## 🛠️ **Development**

### **Making Changes:**

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes, then:
git add .
git commit -m "feat: description of changes"
git push origin feature/new-feature

# Create pull request on GitHub
```

### **Version Bumping:**

```bash
# Update version in:
# - README.md (top)
# - package.json files
# - CHANGELOG.md

# Tag release
git tag -a v0.5.0 -m "Release v0.5.0"
git push origin v0.5.0
```

---

## 🐛 **Troubleshooting**

### **Apps not loading?**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Styling not working?**
```bash
# Ensure Tailwind is installed
npm install -D tailwindcss@3 postcss@8 autoprefixer@10
```

### **Data not syncing?**
```bash
# Check localStorage in browser DevTools
# Application → Local Storage → localhost:3000
# Should see: tfClinicalSessions, tfClinicalParticipants
```

---

## 📞 **Support**

**Technical Issues:** Mihály Bodo (@MICHAEL-BODO)  
**Clinical Questions:** Dr. Szabó Sándor András  
**GitHub Issues:** https://github.com/MICHAEL-BODO/TF-Clinical-Breathing-Study/issues

---

## 📄 **License**

MIT License (software components)  
Study protocol: Confidential - TF University IRB Approved

---

## 🙏 **Acknowledgments**

- TF University for study approval and facilities
- Hungarian Air Force for participant recruitment
- Professor Emeritus for STAI expertise and statistical analysis
- All 50 graduate student participants

---

**Built with:** React 18, Tailwind CSS 3, Lucide Icons  
**Data Storage:** Browser localStorage (session-based)  
**Deployment:** Local development (GitHub Pages coming soon)