# LoPhone Tracker

A standalone, React-based web application containing interactive, step-by-step checklists for repurposing old phones into hyper-stealthy, off-grid anti-theft car tracking beacons.

## Supported Devices

| Device | OS | Steps |
|--------|----|-------|
| Samsung Galaxy S25 | Android 16 / One UI 8.0 | 15 core + 6 optional |
| iPhone 16 | iOS 18 | 14 core + 5 optional |

## Features

- **Device Selector:** Landing page to choose between Samsung and iPhone configurations
- **Dynamic SIM Toggles:** Switch between "No SIM (Offline Tracking)" and "With SIM (Full Features)" modes to dynamically filter SIM-dependent tasks like SMS tripwires or Remote Lock
- **4-Phase Hardening:**
  - **Phase 1 — Ghost Hardening:** Lock screen, notifications, sounds, display, and security settings
  - **Phase 2 — Find Network:** Bluetooth/Wi-Fi beaconing, Samsung Find / Google Find Hub / Apple Find My
  - **Phase 3 — Tripwire Routines:** Automated alerts via Samsung Routines or iOS Shortcuts (SIM required)
  - **Phase 4 — Optimization:** Battery-saving tweaks (collapsible, optional)
- **Animated Tutorials:** "Show me how" walkthroughs with device-specific Settings UI mockups showing exactly where to tap
- **Export:** 1-click copy for Google Sheets or direct CSV download

## Tech Stack

- React 19 + Vite
- react-router-dom (client-side routing)
- Lucide React (icons)
- Vanilla CSS

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the device selector.

### Routes

| Path | Page |
|------|------|
| `/` | Device selector |
| `/samsung` | Samsung Galaxy S25 tracker |
| `/iphone` | iPhone 16 tracker |

## Project Structure

```
src/
├── main.jsx              # Router setup
├── DeviceSelector.jsx     # Landing page with device cards
├── App.jsx               # Samsung S25 tracker (blue theme)
├── IPhoneApp.jsx          # iPhone 16 tracker (purple theme)
├── TutorialModal.jsx      # Reusable animated tutorial modal
├── App.css               # Global styles
└── index.css             # Base styles
public/
├── settings_home.png      # Samsung Settings UI mockups
├── ios_settings_general.png  # iOS Settings UI mockups
└── ...                    # Additional tutorial images
```

---

## 🚀 Future Development Roadmap

1. **Real-World Field Testing:** Fully field test inside a vehicle to monitor ambient battery drain, beacon ping frequency, and recovery accuracy.
2. **Commercialization:** Upgrade UI/UX to commercial-grade standard.
3. **SEO & Lead Funneling:** SEO optimize and funnel traffic into an IT MSP consultant website.
4. **Automation App:** Native companion app to auto-apply checklist settings via ADB/MDM profiles.
5. **Multi-Platform Expansion:** Add support for Google Pixel/Stock Android and older iOS versions.
6. **Alternative Use-Cases:** Research other novel uses for extreme old phone repurposing (e.g., dedicated hardware MFA tokens).
