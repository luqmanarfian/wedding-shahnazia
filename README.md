# Wedding Invitation v2

Aplikasi web undangan pernikahan digital interaktif dan responsif yang dibangun menggunakan **React 19** dan **Vite 8**. Dilengkapi dengan *opening cover* terpersonalisasi, musik latar belakang, animasi *scroll reveal*, formulir konfirmasi RSVP dengan generator QR Code, buku ucapan (*guestbook*), dan amplop digital — terintegrasi langsung ke Google Sheets melalui Google Apps Script Web App.

---

## Gambaran Umum (Overview)

Aplikasi ini dirancang menggunakan pendekatan *mobile-first*. Pada tampilan *desktop*, aplikasi menampilkan tata letak *split-screen*: panel sampul dekoratif di sebelah kiri dan tampilan undangan versi seluler yang dapat digulir (*scrollable*) di sebelah kanan. Tamu membuka undangan dengan menekan tombol pada sampul, yang akan memicu putaran *video intro* dan musik latar sebelum menampilkan seluruh bagian undangan.

Seluruh data undangan (informasi mempelai, jadwal acara, galeri foto, cerita cinta, dan nomor rekening) dikelola secara terpusat pada file [`src/constants/weddingData.js`](./src/constants/weddingData.js).

---

## Fitur Utama

- **Opening Cover Interaktif** dengan personalisasi nama tamu melalui parameter URL (`?to=NamaTamu`).
- **Pemutaran Video Intro** otomatis saat undangan dibuka.
- **Musik Latar Belakang** dengan tombol kontrol *play/pause* melayang.
- **Tampilan Split-Screen Desktop** (panel sampul kiri + kontainer seluler kanan).
- **Animasi Scroll Reveal** menggunakan `IntersectionObserver` API.
- **Hero Section** dengan latar belakang video loop.
- **Countdown Timer** hitung mundur menuju hari pernikahan.
- **Detail Acara** untuk Akad Nikah dan Resepsi.
- **Peta Interaktif** dengan *embed* Google Maps dan tautan petunjuk arah.
- **Cerita Cinta (Love Story)** naratif.
- **Galeri Foto Prewedding**.
- **Formulir RSVP** dengan status kehadiran, jumlah tamu, dan generator QR Code ID unik.
- **Amplop Digital** dengan informasi rekening bank dan fitur salin ke *clipboard*.
- **Buku Ucapan (Guestbook)** dengan pembaruan daftar ucapan secara langsung.
- **Notifikasi Toast** untuk umpan balik aksi penyalinan.
- **Integrasi Google Sheets** untuk penyimpanan data RSVP dan ucapan.

---

## Teknologi (Tech Stack)

| Kategori | Teknologi |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Testing Framework | Vitest 4 |
| Testing Utilities | React Testing Library, `@testing-library/jest-dom`, `@testing-library/user-event`, jsdom |
| Coverage Provider | `@vitest/coverage-v8` |
| Styling | Tailwind CSS v4 + PostCSS |
| Font | Cormorant Garamond, EB Garamond, Montserrat (Google Fonts) |
| Ikon | Font Awesome 6 (CDN) |
| Backend | Google Apps Script Web App |
| Penyimpanan Data | Google Sheets |
| Bahasa | JavaScript (ESM) |
| Linter | ESLint 10 (`react-hooks`, `react-refresh`) |
| CI/CD | Jenkins (Declarative Pipeline) |
| Kontainerisasi | Docker |
| Orchestration | Kubernetes + Helm |

---

## Arsitektur Aplikasi

```
Browser (Klien)
  │
  ├─ Opening Cover (Mengunci scroll sebelum dibuka)
  │
  └─ Main Invitation (Terbuka setelah tombol diklik)
       │
       ├─ Rendering Komponen Utama (HeroSection → ... → Footer)
       │
       └─ Form RSVP & Wishes (Buku Ucapan)
            │
            └─ apiService.js (HTTP POST fetch, Content-Type: text/plain)
                 │
                 └─ Google Apps Script Web App
                      │
                      └─ Google Sheets (Worksheet 'RSVP' & 'Wishes')
```

---

## Struktur Proyek

```
wedding-invitation-v2/
├── public/
│   ├── audio/
│   │   └── bg-music.mp3           # File audio musik latar
│   ├── images/
│   │   ├── bg-cover.jpg           # Latar belakang sampul desktop & mobile
│   │   ├── bg-content-pattern.jpg # Tekstur latar belakang konten utama
│   │   ├── bg-card-potrait.webp   # Latar belakang kartu Hero & LoveStory
│   │   ├── bg-card-landscape-dark.webp  # Latar belakang kartu OpeningQuote
│   │   └── bg-card-square.webp    # Latar belakang kartu EventDetails
│   ├── videos/
│   │   ├── intro.webm             # Video intro saat undangan dibuka
│   │   └── live-hero-bg.webm      # Video loop latar belakang HeroSection
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── couple-main.jpg    # Foto pasangan (Section Countdown)
│   │       └── gallery/           # Foto galeri prewedding & potret mempelai
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── IntroVideo.jsx     # Komponen overlay video intro
│   │   │   └── MusicPlayer.jsx    # Tombol kontrol musik melayang
│   │   └── sections/
│   │       ├── OpeningCover.jsx   # Sampul depan & tombol buka undangan
│   │       ├── HeroSection.jsx    # Section utama dengan latar video
│   │       ├── OpeningQuote.jsx   # Kartu kutipan ayat Al-Qur'an
│   │       ├── CoupleSection.jsx  # Profil mempelai pria dan wanita
│   │       ├── Countdown.jsx      # Timer hitung mundur acara
│   │       ├── EventDetails.jsx   # Kartu informasi Akad & Resepsi
│   │       ├── MapSection.jsx     # Embed Google Maps & petunjuk arah
│   │       ├── LoveStory.jsx      # Section narasi perjalanan cinta
│   │       ├── Gallery.jsx        # Galeri foto prewedding
│   │       ├── RSVPForm.jsx       # Formulir konfirmasi kehadiran & QR Code
│   │       ├── DigitalEnvelope.jsx # Informasi kado digital & nomor rekening
│   │       ├── GuestWishes.jsx    # Buku ucapan tamu & formulir kirim ucapan
│   │       └── Footer.jsx         # Footer aplikasi
│   │
│   ├── constants/
│   │   └── weddingData.js         # Sumber data tunggal seluruh konten undangan
│   │
│   ├── hooks/
│   │   └── useCountdown.js        # Custom hook untuk perhitungan countdown
│   │
│   ├── services/
│   │   └── apiService.js          # Client API pengiriman data ke Apps Script
│   │
│   ├── styles/
│   │   └── globals.css            # Pengaturan Tailwind CSS & utility global
│   │
│   ├── test/
│   │   └── setup.js               # Pengaturan global tes (jest-dom & browser mocks)
│   │
│   ├── App.jsx                    # Komponen utama aplikasi
│   └── main.jsx                   # Entry point React
│
├── google-apps-script.js          # Kode backend Google Apps Script
├── index.html                     # HTML entry point
├── vite.config.js                 # Konfigurasi Vite & Vitest
├── tailwind.config.js             # Konfigurasi Tailwind CSS
├── postcss.config.js              # Konfigurasi PostCSS
├── eslint.config.js               # Konfigurasi ESLint
├── Dockerfile                     # Multi-stage Docker build config
├── nginx.conf                     # Konfigurasi Nginx web server
├── Jenkinsfile                    # Pipeline CI/CD Jenkins
├── .env.example                   # Template variabel lingkungan
└── package.json
```

---

## Prasyarat (Prerequisites)

- **Node.js** v20 atau lebih baru (disarankan Node.js 24)
- **npm** (terikut bersama Node.js)

---

## Instalasi

```bash
# 1. Clone repository
git clone <repository-url>
cd wedding-invitation-v2

# 2. Install dependensi
npm install

# 3. Salin file lingkungan
cp .env.example .env
```

---

## Konfigurasi Lingkungan

### Variabel Lingkungan

Atur variabel lingkungan pada file `.env`:

| Variabel | Wajib | Deskripsi |
|---|---|---|
| `VITE_APPS_SCRIPT_URL` | Ya | URL Web App Google Apps Script yang digunakan untuk pengiriman formulir RSVP dan ucapan. |

> **Catatan:** Jika `VITE_APPS_SCRIPT_URL` tidak diisi, aplikasi akan menjalankan mode *fallback* lokal di mana pengiriman formulir tetap berhasil secara simulasi di sisi klien.

---

## Perintah yang Tersedia (Available Scripts)

Dalam proyek ini, Anda dapat menjalankan perintah-perintah berikut:

### 1. Mode Pengembang (Development)

Menjalankan server pengembang lokal dengan fitur *Hot Module Replacement* (HMR):

```bash
npm run dev
```

Akses aplikasi pada `http://localhost:5173`. Untuk menguji nama tamu terpersonalisasi, tambahkan parameter `?to=NamaTamu`:
```
http://localhost:5173/?to=Budi%20Pratama
```

### 2. Pengujian (Testing)

Menjalankan pengujian *unit* dan *integration* menggunakan **Vitest**:

```bash
npm test
```

### 3. Laporan Coverage Pengujian (Test Coverage)

Menjalankan pengujian dan menghasilkan laporan cakupan (*coverage report*) kode menggunakan `@vitest/coverage-v8`:

```bash
npm run coverage
```

Perintah ini digunakan dalam pipeline Jenkins CI/CD untuk memastikan kualitas dan keandalan kode.

### 4. Build Produksi

Membuat *bundle* produksi teroptimasi pada direktori `dist/`:

```bash
npm run build
```

Untuk mencoba preview hasil build secara lokal:

```bash
npm run preview
```

### 5. Linting

Menjalankan analisis kode statis menggunakan ESLint:

```bash
npm run lint
```

---

## Pengujian dan Coverage (Testing Strategy)

Proyek ini dilengkapi dengan suite pengujian otomatis menggunakan **Vitest** dan **React Testing Library**:

- **Custom Hooks Test** ([`src/hooks/useCountdown.test.js`](./src/hooks/useCountdown.test.js)): Menguji perhitungan waktu hitung mundur dan pembaruan interval.
- **Service API Test** ([`src/services/apiService.test.js`](./src/services/apiService.test.js)): Menguji skenario pengiriman data sukses, respons error HTTP, timeout, penanganan kesalahan jaringan, dan fallback lokal.
- **Component Tests**: Menguji perilaku rendering, penanganan form, pembuatan QR Code, salin nomor rekening ke *clipboard*, dan interaksi tombol pada seluruh komponen UI.

---

## Konfigurasi Backend Google Apps Script

Backend untuk menyimpan data RSVP dan ucapan dikelola melalui Google Apps Script. Kode sumber berada pada file [`google-apps-script.js`](./google-apps-script.js).

### Langkah Deploy:

1. Buka spreadsheet pada Google Sheets.
2. Pilih **Ekstensi > Apps Script**.
3. Hapus kode bawaan, lalu tempelkan seluruh isi file `google-apps-script.js`.
4. Klik **Deploy > Deployment baru**.
5. Pilih jenis **Aplikasi web** (*Web app*).
6. Atur **Jalankan sebagai** (*Execute as*): Saya (*Me*).
7. Atur **Siapa yang memiliki akses** (*Who has access*): Siapa saja (*Anyone*).
8. Klik **Deploy**, selesaikan otorisasi, lalu salin **URL Aplikasi web**.
9. Tempelkan URL tersebut ke variabel `VITE_APPS_SCRIPT_URL` pada file `.env`.

---

## Pipeline CI/CD

Pipeline CI/CD dikonfigurasi melalui file [`Jenkinsfile`](./Jenkinsfile) dengan tahapan berikut:

1. **Checkout**: Mengambil kode sumber dari repositori Git.
2. **Install & Test**: Menjalankan `npm ci` dan `npm run coverage` di dalam kontainer Docker `node:24.12-alpine`.
3. **SonarQube Analysis**: Analisis kualitas kode statis menggunakan SonarScanner.
4. **Quality Gate**: Memastikan standar kualitas SonarQube terpenuhi.
5. **Build Docker Image**: Membuat image Docker aplikasi.
6. **Security Scan**: Pemindaian kerentanan image Docker menggunakan Trivy.
7. **Push Docker Image**: Mengunggah image Docker ke Docker Hub registry.
8. **Deploy & Verify**: Melakukan *deployment* ke cluster Kubernetes menggunakan Helm chart (`./helm/charts`) dan verifikasi *rollout*.

---

## Keamanan & Docker Hardening (Security & Container Practices)

Untuk memastikannya bebas dari kerentanan (*vulnerabilities*) yang dideteksi oleh **Trivy**, proyek ini mengimplementasikan praktik *DevSecOps* dan *security hardening* pada Dockerfile serta CI/CD pipeline:

1. **Pembaruan Base Image Docker**:
   - Stage Build menggunakan `node:22-alpine` (Node.js 22 LTS) untuk memastikan kompatibilitas `npm ci` dan pustaka sistem berbasis Alpine paling stabil.
   - Stage Production menggunakan `nginxinc/nginx-unprivileged:1.27-alpine` untuk memperbarui sistem operasi dasar dan komponen Nginx.

2. **Mitigasi Kerentanan OS Packages**:
   - Eksekusi `apk update && apk upgrade --no-cache` pada stage build maupun stage produksi untuk secara otomatis memperbarui pustaka sistem (*OS packages*) ke versi *patch* keamanan terbaru.
   - Menghapus pustaka berlebih yang tidak dibutuhkan pada runtime (`curl`, `expat`, `libexpat`, `libxml2`, `libxslt`) guna memperkecil *attack surface* dan menjaga ukuran *image* tetap ringan.

3. **Prinsip Least Privilege**:
   - Menjalankan kontainer pada runtime Nginx menggunakan akun non-root (`USER nginx`) demi memenuhi standar keamanan industri dan kepatuhan Kubernetes.

4. **Keamanan Dependensi Node.js**:
   - Audit otomatis dependensi npm via `npm audit` dipastikan berada pada status **0 vulnerabilities**.

5. **Pemindaian Keamanan Otomatis (Trivy Scan)**:
   - Integrasi Trivy scanner versi terbaru pada pipeline Jenkins (`Jenkinsfile`) untuk memindai severity `HIGH` dan `CRITICAL` sebelum proses *image push* dan *deployment* Kubernetes dilakukan.

---

## Pembaruan Section Love Story (Jawa Modern & Borobudur Luxury)

Perbaikan section **Love Story** dilakukan untuk memberikan pengalaman visual yang lebih premium, elegan, mudah dibaca, dan selaras dengan identitas visual website yang terinspirasi oleh **Kemewahan Jawa Modern dan Candi Borobudur**.

### 1. Tujuan Perubahan
- Mengganti teks cerita lama dengan 3 alur cerita baru: **Awal Ceria**, **Lamaran**, dan **Pernikahan**.
- Meningkatkan hierarki tipografi dan keterbacaan (*readability*) pada perangkat seluler.
- Memberikan aksen dekoratif subtle khas Jawa Modern & Borobudur tanpa mengganggu kenyamanan membaca.

### 2. File yang Diubah
- [`src/constants/weddingData.js`](./src/constants/weddingData.js): Memperbarui struktur data `loveStory` dengan 3 babak cerita baru (`stories`) dan menyertakan fallback `paragraphs`.
- [`src/components/sections/LoveStory.jsx`](./src/components/sections/LoveStory.jsx): Redesign penuh komponen visual Love Story dengan whitespace lega, *badge* babak elegan, divider visual Borobudur, dan motif geometris stupa low-opacity (`opacity-[0.06]`).
- [`src/components/sections/LoveStory.test.jsx`](./src/components/sections/LoveStory.test.jsx): Memperbarui pengujian otomatis unit test untuk memverifikasi rendering judul babak, deskripsi cerita, serta mekanisme fallback.
- [`README.md`](./README.md): Menambahkan dokumentasi pembaruan dan alasan desain/teknis.

### 3. Alasan Desain
- **Jawa Modern & Borobudur Heritage**: Motif geometris lattice stupa Borobudur berskala halus dengan opacity 6% memberikan identitas budaya Jawa yang autentik namun tetap minimalis dan eksklusif.
- **Hierarki & Whitespace**: Setiap babak disajikan dalam kartu terpisah dengan *spacing* lega, penanda babak (`BABAK I`, `BABAK II`, `BABAK III`), serta judul beraksen *Cormorant Garamond* italic font-heading.
- **Aksen Soft Gold & Floral Subtle**: Garis batas tipis Soft Gold (`#B99A63`) dan ornamen bunga melati/flora Jawa (`❦`) di sudut kartu mempertegas kesan *luxury timeless*.

### 4. Alasan Implementasi
- **Zero New Dependencies**: Implementasi memanfaatkan Tailwind CSS v4, SVG murni, dan font Google yang sudah tersedia pada proyek.
- **Forward & Backward Compatibility**: Komponen `LoveStory` mendukung array objek `stories` baru maupun array `paragraphs` lama jika ada integrasi eksternal.
- **High Performance**: SVG pattern yang dirender ringan dan ramah pada performa browser seluler.

### 5. Dampak terhadap Proyek
- Menjadikan section Love Story sebagai salah satu *highlight visual* utama pada undangan.
- Seluruh 42 unit test pada Vitest dinyatakan **100% Lulus (Pass)** tanpa regresi maupun *breaking changes*.

---

## SonarQube Fixes

Berikut adalah daftar issue SonarQube yang telah diperbaiki pada komponen frontend:

### 1. Daftar Issue yang Diperbaiki
- **`src/components/sections/CoupleSection.jsx`**:
  - Fix missing props validation: `'couple.groom.name'` and `'couple.bride.name'`.
- **`src/components/sections/LoveStory.jsx`**:
  - Fix missing props validation: `'loveStory.stories'` and `'loveStory.paragraphs'`.
  - Extract nested ternary operation into independent statement.

### 2. Alasan Perubahan
- Menambahkan **PropTypes validation** menggunakan `PropTypes.shape` dan `PropTypes.arrayOf` untuk memastikan tipe data props terverifikasi saat runtime, meminimalkan potensi runtime error (*undefined/null dereference*), serta memenuhi standar SonarQube & React Best Practices.
- Mengeliminasi **nested ternary operation** pada pengolahan fallback cerita di `LoveStory.jsx` dengan menggantinya menggunakan helper function dan ekspresi kondisi `if/else` terpisah yang eksplisit.

### 3. Jaminan Behavior Aplikasi
- Perubahan dilakukan murni pada aspek tipe validasi dan refaktoring sintaksis internal tanpa mengubah logika bisnis, alur eksekusi, maupun tampilan UI aplikasi sama sekali.

### 4. Peningkatan Maintainability & Readability
- Kode komponen menjadi lebih deklaratif, terdokumentasi tipe props-nya secara gamblang, dan mudah dibaca oleh developer lain maupun analisis SonarQube static scanner.

---

## Test Coverage Improvements

Peningkatan cakupan pengujian (*code coverage*) dilakukan untuk memastikan seluruh komponen React, hooks, dan utilitas proyek teruji dengan baik, memenuhi ambang batas SonarQube (≥80%), serta menjaga keandalan aplikasi tanpa mengubah *behavior* maupun UI.

### 1. File yang Ditest
- **`src/App.jsx`**: Interaksi pembukaan undangan, personalisasi nama tamu via URL (`?to=Name`), toggle audio player, event selesai intro video, serta IntersectionObserver reveal.
- **`src/components/sections/CoupleSection.jsx`**: Rendering nama mempelai, info orang tua, dan penanganan fallback `onError` gambar avatar.
- **`src/components/sections/HeroSection.jsx`**: Render nama mempelai & tanggal, interaksi dropdown kalender, eksekusi tautan Google/Outlook Calendar, pengunduhan file `.ics` Apple/Device Calendar, penutupan menu saat *click outside*, serta `onError` fallback gambar.
- **`src/components/sections/Gallery.jsx`**: Grid Bento 5 gambar, fallback grid non-5 gambar, fallback `onError` gambar prewedding, serta prop `gallery` bernilai `undefined`.
- **`src/components/common/IntroVideo.jsx`**: Render video & tombol lewati, callback `onEnded` dengan penundaan *fade out*, penanganan klik ganda, event `ended` video, serta deteksi scroll kontainer.
- **`src/components/sections/RSVPForm.jsx`**: Input nama, status kehadiran (Hadir/Absen), jumlah tamu dropdown, pengiriman data RSVP via Apps Script, tampilan modal tiket QR code, pengunduhan gambar QR, penanganan error jaringan, dan penutupan modal.
- **`src/components/sections/DigitalEnvelope.jsx`**: Penyalinan nomor rekening via `navigator.clipboard`, fallback `document.execCommand`, serta penanganan penolakan/error clipboard.
- **`src/components/sections/OpeningCover.jsx`**: Render nama tamu & tombol buka, pembukaan undangan, animasi *unmount*, dan fallback `onError` gambar sampul.
- **`src/components/sections/Countdown.jsx`**: Grid hitung mundur (Hari, Jam, Menit, Detik) dan fallback `bgImage`.
- **`src/hooks/useCountdown.js`**: Perhitungan selisih waktu tanggal masa depan, tanggal yang sudah lewat, format nilai dua digit (<10) & tanpa nol depan (≥10), serta interval pembaruan tiap detik.

### 2. Skenario & Branch yang Dicakup
- **Normal Case**: Alur pengisian form, rendering data sukses, interaksi tombol, dan konfirmasi.
- **Conditional Rendering**: Tampilan modal tiket QR untuk status *Hadir* vs konfirmasi tanpa QR untuk status *Absen*.
- **Edge Cases & Fallbacks**: Prop `undefined`/`null`, kegagalan muat gambar (`onError`), browser tanpa dukungan `navigator.clipboard`, serta penanganan error Apps Script.
- **Event Listeners**: *Click outside* listener pada kalender dropdown, *scroll event* pada intro video, serta *ended event* pada media HTML5.

### 3. Cara Menjalankan Test & Melihat Coverage
```bash
# Menjalankan seluruh unit test
npm run test

# Menjalankan test suite beserta laporan coverage v8
npm run coverage
```

### 4. Hasil Peningkatan Coverage
| Metrik Coverage | Sebelum | Sesudah |
|---|---|---|
| **Line Coverage** | 80.9% | **92.5%** |
| **Statement Coverage** | 78.9% | **90.5%** |
| **Branch Coverage** | 74.1% | **85.9%** |
| **Function Coverage** | 64.4% | **87.7%** |
| **Total Test Files Passed** | 18 / 18 | **18 / 18 (100%)** |
| **Total Passed Tests** | 42 | **56 (+14 test cases)** |

---

## Lisensi

Proyek ini bersifat pribadi. Tidak diizinkan untuk mendistribusikan atau menggunakan ulang tanpa izin eksplisit.





