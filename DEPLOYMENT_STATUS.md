# TF Clinical Breathing Study - Deployment Status

**Last Updated:** November 17, 2025  
**Version:** v0.5.0  
**Status:** ✅ LIVE AND OPERATIONAL

---

## 🌐 Live Application URLs

### Main Landing Page
**URL:** https://michael-bodo.github.io/TF-Clinical-Breathing-Study/

This is the main entry point with links to both applications and study information.

### Participant App (Mobile/Tablet)
**URL:** https://michael-bodo.github.io/TF-Clinical-Breathing-Study/app/

**Features:**
- ✅ Check-in with Participant ID
- ✅ Pre-intervention anxiety assessment (GAD-7 scale, 0-21)
- ✅ 5-minute guided breathing exercises (5 techniques)
- ✅ Post-intervention anxiety assessment
- ✅ Session completion tracking
- ✅ Bilingual support (English/Hungarian)
- ✅ Offline-capable (PWA)

**Use by:** Study participants during the clinical trial

### Coordinator Dashboard (Researcher Interface)
**URL:** https://michael-bodo.github.io/TF-Clinical-Breathing-Study/coordinator/

**Features:**
- ✅ Participant registration
- ✅ Real-time session monitoring
- ✅ Live participant count tracking
- ✅ Equipment data collection tracking (Vienna Test + NeXus-32)
- ✅ Master CSV export for analysis
- ✅ Group balance monitoring (10 per group)
- ✅ Data quality indicators

**Use by:** Research coordinators and study staff

---

## 🔄 Automatic Deployment System

### Current Setup: ✅ ACTIVE

**Deployment Trigger:** Automatic on every push to `master` branch

**Workflow:**
1. Push code changes to GitHub repository
2. GitHub Actions automatically triggers
3. Apps are built (npm install + npm run build)
4. Artifacts uploaded to GitHub Pages
5. Live URLs updated within 2-3 minutes

**Workflow File:** `.github/workflows/deploy.yml`

**Recent Deployments:**
- ✅ Nov 17, 2025 07:34 - Deploy to GitHub Pages - SUCCESS
- ✅ Nov 17, 2025 07:34 - Pages build and deployment - SUCCESS

### How It Works:

```yaml
on:
  push:
    branches:
      - master  # Deploys automatically on every commit to master
  workflow_dispatch:  # Also allows manual trigger from GitHub UI
```

**View Deployment Status:**
- Go to: https://github.com/MICHAEL-BODO/TF-Clinical-Breathing-Study/actions
- See real-time build and deployment progress
- Green checkmark ✅ = successful deployment
- Red X ❌ = build failed (check logs)

---

## 📱 Testing the Live Apps

### Test Participant Flow:

1. **Open Participant App:** https://michael-bodo.github.io/TF-Clinical-Breathing-Study/app/
2. **Enter Test Data:**
   - Participant ID: `P-001`
   - Group: `1` (Box Breathing)
3. **Pre-Anxiety Rating:** Set slider (e.g., 15)
4. **Start Breathing Exercise:** 5-minute guided session
5. **Post-Anxiety Rating:** Set slider (e.g., 8)
6. **See Results:** Anxiety improvement displayed
7. **Finish:** Session data saved to localStorage

### Test Coordinator Flow:

1. **Open Coordinator:** https://michael-bodo.github.io/TF-Clinical-Breathing-Study/coordinator/
2. **Register Participant:**
   - ID: `P-001`
   - Group: 1
   - Demographics: Age 22, Gender M, Weight 75, Height 180
3. **Monitor Session:** Watch live countdown timer
4. **Mark Equipment Data:** Click Pre/NX/Post buttons
5. **Export CSV:** Download master data file
6. **Verify Data:** Check CSV contains all session information

---

## 🛠️ Development Workflow

### Making Changes to the Apps:

1. **Edit code locally:**
   ```bash
   cd "C:\Users\mis2\Documents\TF-Clinical-Breathing-Study"
   
   # Edit Participant App
   code TF-Clinical-App/src/App.jsx
   
   # Or edit Coordinator
   code TF-Clinical-Coordinator/src/App.jsx
   ```

2. **Test locally:**
   ```bash
   # Terminal 1 - Participant App
   cd TF-Clinical-App
   npm start  # Runs on http://localhost:3000
   
   # Terminal 2 - Coordinator
   cd TF-Clinical-Coordinator
   npm start  # Runs on http://localhost:3001
   ```

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: describe your changes"
   git push origin master
   ```

4. **Automatic deployment:**
   - GitHub Actions automatically triggers
   - Wait 2-3 minutes for build
   - Check https://github.com/MICHAEL-BODO/TF-Clinical-Breathing-Study/actions
   - Visit live URLs to see changes

### Quick Commands:

```bash
# View deployment history
gh run list --limit 10

# Watch latest deployment
gh run watch

# View specific run details
gh run view [RUN_ID]

# Manually trigger deployment (if needed)
gh workflow run deploy.yml
```

---

## 📊 Data Collection System

### Equipment Integration:

**NeXus-32 QEEG/Bio/Neurofeedback (10 units):**
- Measures: HRV, ECG, respiratory rate
- Export format: .edf files
- Naming: `NX_P001.edf`, `NX_P002.edf`, etc.

**Vienna Test System - Schuhfried (10 units):**
- Measures: STAI anxiety scores (pre/post)
- Export format: .csv files
- Naming: `VT_P001_PRE.csv`, `VT_P001_POST.csv`

**Mobile Apps (Web-based):**
- Measures: GAD-7 anxiety scores, session adherence
- Export format: .csv file (master export)
- Naming: `TF_Clinical_Master_YYYYMMDD.csv`

### Data Collection Workflow:

**During Study Day:**
1. Participant registers → Coordinator Dashboard
2. Vienna Test STAI-Pre → Researcher saves file
3. Attach NeXus sensors → Start recording
4. Participant completes breathing session → App tracks
5. Save NeXus file → Researcher exports to USB
6. Vienna Test STAI-Post → Researcher saves file
7. Mark equipment data collected → Coordinator Dashboard

**End of Study Day:**
1. Export Master CSV from Coordinator Dashboard
2. Contains links to all Vienna Test + NeXus files
3. Import to DataLyser for HRV analysis
4. Professor Emeritus Sipos analyzes STAI data
5. Combined statistical analysis in Prism

---

## 🎯 Study Day Checklist

### Pre-Study (1 week before):
- [ ] Test both apps on all tablets
- [ ] Verify all 10 NeXus units calibrated
- [ ] Configure 10 Vienna Test stations with Hungarian STAI
- [ ] Print consent forms (60 copies)
- [ ] Team training session completed
- [ ] Dry run with 2 test participants

### Study Day Morning:
- [ ] All equipment powered on and tested
- [ ] Apps accessible on all devices
- [ ] USB drives ready for data backup
- [ ] Emergency contact list posted
- [ ] Team briefing completed

### During Study:
- [ ] Participant check-in and consent
- [ ] Session monitoring via Coordinator
- [ ] Equipment data marking after each participant
- [ ] Mid-day USB backups (every 10 participants)
- [ ] Quality checks on data files

### Post-Study:
- [ ] Export all NeXus files to USB
- [ ] Export all Vienna Test files to USB
- [ ] Export Master CSV from Coordinator
- [ ] Verify all 50 participants have complete data
- [ ] Email encrypted backup to secure cloud
- [ ] Equipment shutdown and lab cleanup

---

## 🔐 Security & Privacy

### Data Protection:
- ✅ Anonymous participant IDs only (P-001 to P-050)
- ✅ No names or PHI in digital systems
- ✅ GDPR compliant
- ✅ HIPAA aligned
- ✅ SOC 2 Type 2 compatible
- ✅ localStorage data encrypted
- ✅ 3-location backup strategy (2 USB + 1 cloud)

### Access Control:
- Participant ID key file (P-ID to name) stored separately
- Access restricted to Dr. Szabó only
- Data retention: 5 years (Hungarian research standards)

---

## 📞 Support Contacts

**Technical Issues (Apps/GitHub):**
- Mihály Bodo Jr. (CTO) - GitHub: @MICHAEL-BODO

**Clinical Protocol:**
- Dr. Szabó Sándor András (Principal Investigator)
- Prof. Emeritus Sipos Kornél (Statistical Analysis)

**Breathing Techniques:**
- Tamás Avar (Wellness Coordinator)

**Equipment (NeXus/Vienna Test):**
- TF University Technical Support

---

## ✅ Deployment Verification

### Check Deployment Status:
1. Visit: https://github.com/MICHAEL-BODO/TF-Clinical-Breathing-Study/actions
2. Look for green checkmarks ✅
3. Latest run should show "Deploy to GitHub Pages - SUCCESS"

### Test Live Apps:
1. **Landing Page:** https://michael-bodo.github.io/TF-Clinical-Breathing-Study/
   - Should show professional landing page with links
   
2. **Participant App:** https://michael-bodo.github.io/TF-Clinical-Breathing-Study/app/
   - Should load blue gradient UI
   - Check-in form visible
   - Language toggle functional
   
3. **Coordinator:** https://michael-bodo.github.io/TF-Clinical-Breathing-Study/coordinator/
   - Should load gray gradient UI
   - Stats cards showing 0/50
   - Registration form visible

### If Apps Don't Load:
1. Check GitHub Actions for build errors
2. Verify GitHub Pages is enabled in repository settings
3. Wait 5 minutes for DNS propagation
4. Clear browser cache and try again
5. Check browser console (F12) for JavaScript errors

---

## 🎉 Version History

### v0.5.0 (November 17, 2025) - CURRENT
- ✅ Full real-time sync between apps
- ✅ Pre/post anxiety assessments (GAD-7)
- ✅ Equipment data tracking
- ✅ Master CSV export
- ✅ GitHub Pages deployment
- ✅ Tailwind CSS styling
- ✅ Hungarian language support
- ✅ 5 breathing techniques implemented

### Previous Versions:
- v0.4.0 - Core app functionality
- v0.3.0 - Coordinator dashboard
- v0.2.0 - Participant app prototype
- v0.1.0 - Initial repository setup

---

## 📝 Notes

**Browser Compatibility:**
- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported (iOS/macOS)
- Opera: ✅ Supported

**Mobile Responsiveness:**
- ✅ Optimized for tablets (10-12 inches)
- ✅ Works on smartphones (not recommended for study use)
- ✅ Progressive Web App (PWA) - can be installed

**Internet Requirement:**
- First load: Requires internet connection
- After loaded: Works offline (localStorage)
- Data sync: Real-time when online, queued when offline

---

**Last Deployment:** November 17, 2025 at 07:34 UTC  
**Build Status:** ✅ SUCCESS  
**Deployment Duration:** ~1m 15s  
**Next Deployment:** Automatic on next push to master

---

*For the latest code and documentation, visit:*  
*https://github.com/MICHAEL-BODO/TF-Clinical-Breathing-Study*
