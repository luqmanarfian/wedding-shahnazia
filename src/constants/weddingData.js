// src/constants/weddingData.js

// Import gambar yang dipakai langsung oleh komponen React (Vite akan mengoptimasi & hash saat build)
import coupleMainImg from "../assets/images/couple-main.jpg";
import gallery1 from "../assets/images/gallery/gallery-1.jpg";
import gallery2 from "../assets/images/gallery/gallery-2.jpg";
import gallery3 from "../assets/images/gallery/gallery-3.jpg";
import gallery4 from "../assets/images/gallery/gallery-4.jpg";
import gallery5 from "../assets/images/gallery/gallery-5.jpg";
import maleImg from "../assets/images/gallery/male.jpeg";
import femaleImg from "../assets/images/gallery/female.jpeg";

export const weddingData = {
  couple: {
    groom: {
      name: "Damarjati Wiroprojo",
      shortName: "Damarjati",
      parentInfo: "Putra",
      parents: "Keluarga Bpk Wahyu Jadmono Kresno & Ibu Dehwin Saptamala",
      photo: maleImg
    },
    bride: {
      name: "Shahnazia Triannita Puteri",
      shortName: "Shahnazia",
      parentInfo: "Putri",
      parents: "Keluarga Bpk H. Usman Alie Wandana & Ibu Hj. Mujiyati",
      photo: femaleImg
    },
    couple:{
      photo: coupleMainImg
    }
  },
  date: {
    formattedDay: "Sabtu",
    formattedDate: "5 September 2026",
    targetIsoString: "2026-09-05T11:00:00",
    locationCity: "BOGOR, JAWA BARAT"
  },
  events: {
    akad: {
      title: "Akad Nikah",
      dayDate: "Jumat, 11 September 2026",
      time: "11:00 WIB",
      venue: "Ballroom Royal Hotel Bogor",
      address: "Jl. Pajajaran No.12, Bogor, Jawa Barat"
    },
    resepsi: {
      title: "Resepsi",
      dayDate: "Jumat, 11 September 2026",
      time: "11:00 WIB - Selesai",
      venue: "Ballroom Royal Hotel Bogor",
      address: "Jl. Pajajaran No.12, Bogor, Jawa Barat"
    }
  },
  maps: {
    embedUrl: "https://maps.google.com/maps?q=Royal%20Hotel%20Bogor,%20Jawa%20Barat&t=&z=16&ie=UTF8&iwloc=&output=embed",
    directionsUrl: "https://maps.google.com/?q=Royal+Hotel+Bogor,+Jawa+Barat"
  },
  loveStory: {
    title: "Cerita Cinta Kami",
    subtitle: "How We Met",
    paragraphs: [
      "Di tepi danau Moniyan, Kiyora memainkan melodi lembut yang tanpa sengaja mempertemukannya dengan Lancy. Dari pertemuan sederhana itu, keduanya mulai saling menemukan ketenangan di tengah kerasnya Land of Dawn.",
      "Hingga di bawah cahaya bulan, Lancy berkata,",
      "\"Di setiap perjalanan, akhirnya aku menemukan tempat untuk pulang.\"",
      "Dan sejak saat itu, kisah mereka bukan lagi tentang pertemuan, melainkan tentang dua hati yang memilih untuk tetap bersama."
    ]
  },
  gallery: {
    title: "Galeri Prewedding",
    subtitle: "Captured Memories",
    images: [
      { id: 1, type: "portrait", url: gallery1 },
      { id: 2, type: "portrait", url: gallery2 },
      { id: 3, type: "portrait", url: gallery3 },
      { id: 4, type: "portrait", url: gallery4 },
      { id: 5, type: "portrait", url: gallery5 }
    ]
  },
  gift: {
    bankName: "Bank BCA",
    isPrimary: true,
    accountNumber: "000000000",
    accountHolder: "Lancy Hoshino"
  },
  api: {
    appsScriptUrl: import.meta.env.VITE_APPS_SCRIPT_URL || ""
  },
  assets: {
    // Background images served from public/ via absolute URL path
    desktopCoverBg: "/images/bg-cover.jpg",
    mobileCoverBg: "/images/bg-cover.jpg",
    mainContentBg: "/images/bg-content-pattern.jpg",
    // Audio served from public/ via absolute URL path
    bgMusicUrl: "/audio/bg-music.mp3",
    // Video assets served from public/ via absolute URL path
    introVideo: "/videos/intro.webm",
    heroBgVideo: "/videos/live-hero-bg.webm"
  }
};
