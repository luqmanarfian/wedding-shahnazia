# Wedding Invitation v2

A modern, responsive digital wedding invitation web application built with React 19 and Vite. Features an animated opening cover, scrollable invitation sections, live RSVP submission, a guestbook, and a digital gift envelope — all backed by Google Sheets via a Google Apps Script Web App.

---

## Overview

This application renders a full digital wedding invitation optimized for mobile viewports. On desktop, it uses a split-screen layout: a static decorative cover panel on the left and the scrollable mobile-width invitation on the right. Guests open the invitation by clicking a button on the cover screen, which triggers an intro video and background music before revealing all invitation sections.

All wedding details (couple info, event schedule, gallery images, love story, gift info) are managed from a single data file: `src/constants/weddingData.js`.

---

## Features

- **Animated opening cover** with guest name personalization via URL query parameter (`?to=GuestName`)
- **Intro video playback** on invitation open
- **Background music** with floating play/pause toggle
- **Split-screen desktop layout** (decorative left panel + scrollable mobile invitation on the right)
- **Scroll reveal animations** using the `IntersectionObserver` API
- **Hero section** with a looping background video
- **Countdown timer** to the wedding date
- **Event details** for Akad Nikah and Resepsi
- **Interactive Google Maps embed** with a directions link
- **Love story** narrative section
- **Pre-wedding photo gallery**
- **RSVP form** with attendance status, guest count, and a unique QR Code ID submission
- **Digital gift envelope** with bank account details and clipboard copy
- **Guest wishes / guestbook** with live display of submitted messages
- **Toast notification** for clipboard copy feedback
- **Google Sheets integration** for RSVP and wishes data persistence

---

## Tech Stack

| Category       | Technology                          |
|----------------|-------------------------------------|
| Framework      | React 19                            |
| Build Tool     | Vite 8                              |
| Styling        | Tailwind CSS v4 + PostCSS           |
| Fonts          | Cormorant Garamond, EB Garamond, Montserrat (Google Fonts) |
| Icons          | Font Awesome 6 (CDN)                |
| Backend        | Google Apps Script Web App          |
| Data Storage   | Google Sheets                       |
| Language       | JavaScript (ESM)                    |
| Linting        | ESLint 10 with `react-hooks` and `react-refresh` plugins |
| CI/CD          | Jenkins (declarative pipeline)      |
| Container      | Docker (via Jenkins pipeline)       |
| Orchestration  | Kubernetes + Helm                   |
| Security Scan  | Trivy                               |
| Code Quality   | SonarQube                           |

---

## Architecture

```
Browser
  │
  ├─ Opening Cover (blocks scroll until opened)
  │
  └─ Main Invitation (unlocked on open)
       │
       ├─ Sections rendered in sequence (HeroSection → ... → Footer)
       │
       └─ RSVP / Wishes
            │
            └─ apiService.js (fetch POST, Content-Type: text/plain)
                 │
                 └─ Google Apps Script Web App
                      │
                      └─ Google Sheets (RSVP worksheet + Wishes worksheet)
```

**Key design decisions:**

- POST requests to Google Apps Script use `Content-Type: text/plain;charset=utf-8` to avoid CORS preflight OPTIONS requests.
- All static assets (images, audio, video) served from `public/` are referenced via absolute URL paths (e.g., `/videos/intro.webm`). Assets imported directly into components use Vite's asset handling.
- Wedding data is centralized in `weddingData.js`; changing this file updates content across all sections without touching individual components.

---

## Project Structure

```
wedding-invitation-v2/
├── public/
│   ├── audio/
│   │   └── bg-music.mp3           # Background music
│   ├── images/
│   │   ├── bg-cover.jpg           # Desktop and mobile cover background
│   │   ├── bg-content-pattern.jpg # Main content background texture
│   │   ├── bg-card-potrait.webp   # Card background (HeroSection, LoveStory)
│   │   ├── bg-card-landscape-dark.webp  # Card background (OpeningQuote)
│   │   └── bg-card-square.webp    # Card background (EventDetails)
│   ├── videos/
│   │   ├── intro.webm             # Intro video played on invitation open
│   │   └── live-hero-bg.webm      # Looping background video (HeroSection)
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── couple-main.jpg    # Couple photo (Countdown section)
│   │       └── gallery/           # Pre-wedding gallery photos + male/female portraits
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── IntroVideo.jsx     # Intro video overlay component
│   │   │   └── MusicPlayer.jsx    # Floating music toggle button
│   │   └── sections/
│   │       ├── OpeningCover.jsx   # Cover screen with open button
│   │       ├── HeroSection.jsx    # Hero with video background
│   │       ├── OpeningQuote.jsx   # Quranic verse card
│   │       ├── CoupleSection.jsx  # Groom and bride profiles
│   │       ├── Countdown.jsx      # Live countdown timer
│   │       ├── EventDetails.jsx   # Akad & Resepsi event cards
│   │       ├── MapSection.jsx     # Google Maps embed + directions link
│   │       ├── LoveStory.jsx      # Narrative story section
│   │       ├── Gallery.jsx        # Pre-wedding photo gallery
│   │       ├── RSVPForm.jsx       # RSVP submission form
│   │       ├── DigitalEnvelope.jsx # Gift / bank transfer details
│   │       ├── GuestWishes.jsx    # Live guestbook display & submission
│   │       └── Footer.jsx         # Footer with couple names
│   │
│   ├── constants/
│   │   └── weddingData.js         # Single source of truth for all wedding content
│   │
│   ├── hooks/
│   │   └── useCountdown.js        # Custom hook: live countdown calculation
│   │
│   ├── services/
│   │   └── apiService.js          # fetch wrapper for Google Apps Script API
│   │
│   ├── styles/
│   │   └── globals.css            # Tailwind import, Google Fonts, global CSS utilities
│   │
│   ├── App.jsx                    # Root component: layout, state, scroll reveal
│   └── main.jsx                   # React entry point
│
├── google-apps-script.js          # Google Apps Script backend source (deploy manually)
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS v4 theme configuration
├── postcss.config.js              # PostCSS configuration
├── eslint.config.js               # ESLint flat config
├── Jenkinsfile                    # Jenkins CI/CD pipeline
├── .env.example                   # Environment variable template
└── package.json
```

---

## Prerequisites

- **Node.js** 20 or later
- **npm** (bundled with Node.js)
- A Google account (for Google Sheets integration)

---

## Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd wedding-invitation-v2

# 2. Install dependencies
npm install

# 3. Copy the environment variable template
cp .env.example .env
```

---

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and fill in the required values.

| Variable               | Required | Description                                                      |
|------------------------|----------|------------------------------------------------------------------|
| `VITE_APPS_SCRIPT_URL` | Yes      | The deployed Google Apps Script Web App URL used for RSVP and wishes form submissions |

> **Note:** If `VITE_APPS_SCRIPT_URL` is not set, form submissions will silently succeed locally without writing to Google Sheets. The application will still run without it.

### Wedding Content

All wedding-specific data (names, dates, venue, love story, gallery images, bank details) is managed in a single file:

```
src/constants/weddingData.js
```

Edit this file to update the invitation content without modifying any component.

---

## Google Apps Script Setup

The backend for RSVP and wishes submissions is a Google Apps Script Web App. The source is in [`google-apps-script.js`](./google-apps-script.js).

**Deploy steps:**

1. Open your Google Sheets spreadsheet.
2. Click **Extensions > Apps Script**.
3. Delete the default code and paste the entire contents of `google-apps-script.js`.
4. Click **Deploy > New deployment**.
5. Set **Type** to **Web app**.
6. Set **Execute as**: Me.
7. Set **Who has access**: Anyone.
8. Click **Deploy**, complete authorization, and copy the **Web app URL**.
9. Paste the URL as `VITE_APPS_SCRIPT_URL` in your `.env` file.

**Google Sheets structure:**

The script automatically creates worksheets on first submission.

| Worksheet | Columns |
|-----------|---------|
| `RSVP`   | `Timestamp`, `Nama`, `Status Kehadiran`, `Jumlah Tamu`, `Pesan`, `QR_Code_ID` |
| `Wishes` | `Timestamp`, `Nama Pengirim`, `Ucapan` |

**RSVP QR Code ID format:**

```
WEDDING-{timestamp}-{random4digit}
```

Example: `WEDDING-1779196584754-3445`

---

## Running Locally

```bash
npm run dev
```

The development server starts at `http://localhost:5173` (default Vite port).

**Guest name personalization:** Append `?to=GuestName` to the URL to display a personalized guest name on the opening cover:

```
http://localhost:5173/?to=John%20Doe
```

If no parameter is provided, the name defaults to `"Tamu Kehormatan"`.

---

## Build

```bash
npm run build
```

Output is written to the `dist/` directory.

```bash
# Preview the production build locally
npm run preview
```

---

## Linting

```bash
npm run lint
```

ESLint is configured with:

- `@eslint/js` recommended rules
- `eslint-plugin-react-hooks` (enforces Rules of Hooks)
- `eslint-plugin-react-refresh` (Vite HMR compatibility)

The `dist/` directory is excluded from linting.

---

## Static Assets

Static assets served via absolute URL paths must be placed in `public/`:

| Path | Purpose |
|------|---------|
| `public/audio/bg-music.mp3` | Background music |
| `public/videos/intro.webm` | Intro video |
| `public/videos/live-hero-bg.webm` | Hero section looping video background |
| `public/images/bg-cover.jpg` | Cover background image |
| `public/images/bg-content-pattern.jpg` | Main content background texture |
| `public/images/bg-card-potrait.webp` | Card background (HeroSection, LoveStory) |
| `public/images/bg-card-landscape-dark.webp` | Card background (OpeningQuote) |
| `public/images/bg-card-square.webp` | Card background (EventDetails) |

Images used directly by React components (gallery, couple photos) are placed under `src/assets/images/` and imported in `weddingData.js`.

---

## CI/CD

The [`Jenkinsfile`](./Jenkinsfile) defines a declarative Jenkins pipeline with the following stages:

| Stage | Description |
|-------|-------------|
| **Checkout** | Checks out source code from SCM |
| **Install & Test** | Runs `npm ci` and `npm run coverage` inside a `node:20-alpine` Docker container |
| **SonarQube Analysis** | Static code analysis via SonarScanner |
| **Quality Gate** | Waits for SonarQube quality gate result; aborts pipeline on failure |
| **Build Docker Image** | Builds the Docker image tagged with the Git commit SHA |
| **Security Scan** | Runs Trivy (v0.51.1) to scan for HIGH and CRITICAL CVEs; fails on detection |
| **Push Docker Image** | Pushes the image to Docker Hub using the `docker-cred` Jenkins credential |
| **Deploy and Verify** | Deploys to Kubernetes via Helm (`./helm/charts`), waits for rollout, and rolls back on failure |

**Pipeline configuration:**

| Setting | Value |
|---------|-------|
| Docker image | `luqmanarfian/wedding-shahnazia:<git-commit-sha>` |
| Kubernetes namespace | `default` |
| Helm release name | `wedding-shahnazia` |
| Build timeout | 30 minutes |
| Builds retained | 10 |

---

## Customization

To adapt this template for a different wedding:

1. **Update wedding content:** Edit `src/constants/weddingData.js` with the correct couple names, dates, venues, and story.
2. **Replace photos:** Place new images in `src/assets/images/gallery/` and update the import paths in `weddingData.js`.
3. **Replace static assets:** Swap files in `public/audio/`, `public/videos/`, and `public/images/`.
4. **Update the page title:** Edit the `<title>` tag in `index.html`.
5. **Configure the backend:** Deploy `google-apps-script.js` to a new Google Sheets document and update `VITE_APPS_SCRIPT_URL`.

---

## Troubleshooting

**RSVP / wishes form not saving data**
- Verify `VITE_APPS_SCRIPT_URL` is set correctly in `.env`.
- Confirm the Apps Script is deployed with **Who has access: Anyone**.
- Check the browser console for network errors.
- Requests time out after 12 seconds; a slow Apps Script response will show a timeout error.

**Intro video or background music does not play**
- Browsers block autoplay until a user gesture occurs. Both audio and video are triggered by the user clicking the open button.
- Confirm the files exist at `public/videos/intro.webm`, `public/videos/live-hero-bg.webm`, and `public/audio/bg-music.mp3`.

**Google Maps embed not showing**
- Ensure `maps.embedUrl` in `weddingData.js` is a valid Google Maps embed URL.

**Guest name not appearing on opening cover**
- Pass the name as a URL query parameter: `?to=YourGuestName`.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`.
3. Commit your changes following conventional commit style.
4. Open a pull request describing what changed and why.

Run `npm run lint` before submitting to ensure no linting errors.

---

## License

This project is private. No license is granted for redistribution or reuse without explicit permission.

---

## 🎨 Pembaruan Background Kartu Love Story (`LoveStory.jsx`)

### 📌 Detail Perubahan:
1. **Background Asset (`bg-card-potrait.webp`)**:
   - Kartu bagian "Cerita Cinta Kami" (`LoveStory.jsx`) diperbarui menggunakan gambar latar belakang `bg-card-potrait.webp`.
   - Di-import secara native (`import bgCardPortrait from "../../assets/images/bg-card-potrait.webp"`).
2. **Optimasi Keterbacaan Teks & Soft Overlay**:
   - **Layer 1**: Background image `bg-card-potrait.webp` (`absolute inset-0 object-cover pointer-events-none select-none`).
   - **Layer 2**: Softened warm tint `bg-ivory/55` yang meredam intensitas latar belakang sehingga cerita narasi tetap sangat nyaman, kontras, dan lembut dibaca.
   - **Layer 3**: Teks cerita dengan warna `espresso` & `sepia` italic.

---

## 🎨 Pembaruan Background Kartu Opening Quote (`OpeningQuote.jsx`)

* Kartu kutipan ayat "Ar-Rum : 21" diperbarui menggunakan gambar latar belakang `bg-card-landscape-dark.webp` (37.68 kB).

---

## 🎨 Pembaruan Background Kartu Hero (`HeroSection.jsx`)

* Kartu utama Hero Section diperbarui menggunakan gambar latar belakang `bg-card-potrait.webp` (46.49 kB).

---

## 🏛️ Refactor Detail Acara (Jawa Modern Borobudur Theme)

* Kartu Akad & Resepsi pada `EventDetails.jsx` menggunakan gambar latar belakang `bg-card-square.webp` (23.56 kB).

---

## 🆔 Format & Aturan `QR_Code_ID` RSVP

```
WEDDING-{timestamp}-{random4digit}
```
* **Contoh ID**: `WEDDING-1779196584754-3445`
* **Lokasi Generator**: [`src/components/sections/RSVPForm.jsx`](./src/components/sections/RSVPForm.jsx)

---

## 📊 Integrasi Google Sheets (RSVP & Wishes Book)

* **Spreadsheet ID**: `1wAe06qhJB6JIFcvSbtLLof7kMU5Ddbxtakj7l7su0e0`
* **Worksheet 1**: `RSVP` (`Timestamp | Nama | Status Kehadiran | Jumlah Tamu | Pesan | QR_Code_ID`)
* **Worksheet 2**: `Wishes` (`Timestamp | Nama Pengirim | Ucapan`)

---

## 📁 Daftar File yang Diubah / Dibuat
* **`src/components/sections/LoveStory.jsx`**: Memperbarui background kartu Love Story menggunakan `bg-card-potrait.webp` dengan pelapis `bg-ivory/55`.
* **`src/components/sections/OpeningQuote.jsx`**: Memperbarui background kartu kutipan.
* **`src/components/sections/HeroSection.jsx`**: Memperbarui background kartu Hero.
* **`src/components/sections/EventDetails.jsx`**: Memperbarui background kartu Detail Acara.
* **`README.md`**: Dokumentasi update kartu Love Story dan fitur undangan.

---

## 🚀 Memulai Project

### Build & Preview
```bash
# Production Build
cmd /c npm run build

# Preview Production Build
cmd /c npm run preview
```
