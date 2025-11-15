# TF Clinical Breathing Study

**50-participant breathing intervention trial**  
**TF University, Budapest, Hungary**  
**December 2025**

## 🎯 Quick Start

### IMPORTANT: Complete the App Code

Before running, you need to copy the full React code from the Claude artifacts above:

1. **TF-Clinical-App/src/App.jsx** - Copy from artifact "TF Clinical Breathing App - Participant"
2. **TF-Clinical-Coordinator/src/App.jsx** - Copy from artifact "TF Clinical Coordinator Dashboard"

### Install & Run

```bash
# Participant App
cd TF-Clinical-App
npm install
npm start  # Opens on localhost:3000

# Coordinator Dashboard (in separate terminal)
cd TF-Clinical-Coordinator
npm install
npm start  # Opens on localhost:3001
```

## 📁 Repository Structure

```
TF-Clinical-Breathing-Study/
├── TF-Clinical-App/              Participant breathing guide
├── TF-Clinical-Coordinator/      Researcher dashboard
├── TF-Clinical-MASTER-CSV-GEN/   Data export utilities
├── TF-Clinical-Hung-Support/     Hungarian localization
├── docs/                          Study documentation
├── data/                          Data templates
└── scripts/                       Setup scripts
```

## 🔬 Study Overview

- **Design:** Randomized controlled trial, 5 groups
- **Participants:** 50 university students (10 per group)
- **Duration:** 5-minute breathing interventions
- **Measurements:** STAI anxiety scores + HRV data

## 👥 Study Team

- **PI:** Dr. Szabó Sándor András
- **CTO/Data:** Mihály Bodo  
- **Wellness:** Tamás Avar
- **Statistics:** Professor Emeritus (TF University)

## 🛠️ Equipment

- 10x NeXus-32 QEEG/Bio/Neurofeedback Systems
- 10x Vienna Test System computers
- 10x Tablets (participant app)
- 1x Coordinator tablet

## 📊 Data Flow

```
Participant App → localStorage → Coordinator → CSV Export
                                               ↓
                                         Master CSV
                                         (links to)
                                               ↓
                              NeXus Files + Vienna Test Files
```

## 📚 Documentation

See `docs/` folder for:
- Complete setup guide
- Equipment integration guide  
- Study day deployment procedures
- Data analysis pipeline

## 🔐 Data Security

- Anonymous participant IDs only
- No personal data in Git repository
- GDPR compliant
- Encrypted backups (3 locations)

## 📞 Support

**Technical:** Mihály Bodo (@MICHAEL-BODO)  
**Clinical:** Dr. Szabó Sándor András

## 📄 License

MIT (software) | Confidential (study protocol)
