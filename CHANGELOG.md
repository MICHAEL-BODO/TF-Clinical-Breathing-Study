# Changelog

All notable changes to the TF Clinical Breathing Study project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.5.0] - 2025-11-16

### Added

#### Participant App
- Pre-session anxiety assessment (GAD-7 scale, 0-21 range)
- Post-session anxiety assessment with improvement calculation
- Session completion screen with full data summary
- Researcher alert notifications (attach sensors, export data)
- Real-time broadcasting of session progress
- Live data sync with coordinator dashboard via localStorage
- Anxiety change indicator with color coding (green ▼ / red ▲)
- Completion message: "Session Complete! Please notify the researcher. Your data has been recorded."
- [FINISH] button to reset for next participant

#### Coordinator Dashboard
- Live participant registration counter (X/50)
- Real-time session monitoring with countdown timers
- Active session cards showing participant ID, group, technique, and pre-anxiety score
- Equipment data collection tracking section:
  - Vienna Test Pre-STAI (CSV files) counter
  - NeXus-32 HRV Data (EDF files) counter
  - Vienna Test Post-STAI (CSV files) counter
- Complete data pairs tracker with success rate percentage
- Quick-mark equipment collection buttons (Pre/NX/Post)
- Recent completions feed showing last 5 sessions
- Anxiety change and adherence % display for completed sessions
- Enhanced CSV export including:
  - Anxiety pre/post scores
  - Anxiety change calculation
  - Equipment collection status (Yes/No)
  - File names or "MISSING" indicator
  - Data completeness status

#### Infrastructure
- Tailwind CSS v3 configuration
- PostCSS configuration files
- Real-time event broadcasting system
- localStorage-based data persistence
- Version control initialization

### Changed
- Updated localStorage data structure to include anxiety scores
- Enhanced session data model with adherence percentage
- Improved CSV export format with comprehensive metrics
- Upgraded participant registration to broadcast immediately

### Fixed
- Tailwind CSS styling not rendering (configured v3 properly)
- PostCSS plugin loading errors
- Data sync between participant app and coordinator dashboard
- Missing anxiety assessment screens
- Incomplete session tracking

---

## [0.1.0] - 2025-11-15

### Added
- Initial project setup
- Basic participant app with 5 breathing techniques:
  1. Box Breathing (4-4-4-4)
  2. 4-7-8 Breathing
  3. Coherence/HRV Breathing
  4. Physiological Sigh
  5. Breath Hold/Buteyko
- Basic coordinator dashboard
- Participant registration form
- Group progress tracking (10 per group)
- Language toggle (English/Hungarian)
- 5-minute breathing timer with animations
- Cycle counter
- Basic CSV export functionality
- GitHub repository creation
- Folder structure setup:
  - TF-Clinical-App
  - TF-Clinical-Coordinator
  - TF-Clinical-MASTER-CSV-GEN
  - TF-Clinical-Hung-Support
  - docs/
  - data/
  - scripts/

### Initial Features
- Participant check-in with ID and group assignment
- Visual breathing animations for all 5 techniques
- Phase-based breath guidance (inhale/hold/exhale)
- Haptic feedback (mobile vibration)
- Session completion detection
- Demographics collection (age, gender, weight, height)
- Group balance tracking
- Basic data export to CSV

---

## [Unreleased]

### Planned for v0.6.0
- GitHub Pages deployment
- Public URLs for participant app and coordinator
- Automated version tagging on releases
- Production build optimization
- Service worker for offline support

### Planned for v0.7.0
- WebSocket real-time sync over WiFi
- Push notifications for researchers
- Audio cues for breathing phases
- Session pause/resume functionality
- Equipment connection status indicators
- Automated data backup system

### Planned for v1.0.0 (Study Day Ready)
- Complete Hungarian translation review by native speaker
- Full offline mode with sync capability
- Automated data backup to multiple locations
- Comprehensive QA testing
- User acceptance testing with study team
- Final documentation and deployment guides
- Emergency recovery procedures
- Study day checklist automation

---

## Version Numbering

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR** version (1.0.0) - Incompatible API changes or major milestones
- **MINOR** version (0.5.0) - New features, backward compatible
- **PATCH** version (0.5.1) - Bug fixes, backward compatible

---

## Git Tagging

Each release is tagged in Git:
```bash
git tag -a v0.5.0 -m "Release v0.5.0 - Real-time sync and anxiety tracking"
git push origin v0.5.0
```

---

## Release Process

1. Update version in:
   - README.md (top)
   - package.json (both apps)
   - This CHANGELOG.md
2. Commit changes: `git commit -m "chore: bump version to 0.5.0"`
3. Create tag: `git tag -a v0.5.0 -m "Release v0.5.0"`
4. Push: `git push origin master --tags`
5. Create GitHub Release with changelog

---

## Contributors

- **Mihály Bodo** - CTO, Lead Developer (@MICHAEL-BODO)
- **Tamás Avar** - Wellness Expert, Requirements
- **Dr. Szabó Sándor András** - Principal Investigator
- **Prof. Dr. Michael Bodo** - Clinical Advisor

---

**Repository:** https://github.com/MICHAEL-BODO/TF-Clinical-Breathing-Study  
**License:** MIT (software) | Confidential (study protocol)
