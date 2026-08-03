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
      dayDate: "Sabtu, 5 September 2026",
      time: "11:00 WIB",
      venue: "Ballroom Royal Hotel Bogor",
      address: "Jl. Pajajaran No.12, Bogor, Jawa Barat"
    },
    resepsi: {
      title: "Resepsi",
      dayDate: "Sabtu, 5 September 2026",
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
    subtitle: "Our Love Journey",
    stories: [
      {
        id: 1,
        badge: "BABAK I",
        title: "Awal Ceria",
        description: "Berawal dari pertemuan sederhana, kami saling mengenal dan mulai berbagi banyak cerita. Tanpa disadari, kebersamaan itu tumbuh menjadi rasa nyaman yang semakin kuat dari hari ke hari."
      },
      {
        id: 2,
        badge: "BABAK II",
        title: "Lamaran",
        description: "Dengan niat yang tulus dan restu keluarga, kami memutuskan untuk melangkah ke tahap yang lebih serius. Momen lamaran menjadi awal dari perjalanan baru yang penuh harapan dan doa baik."
      },
      {
        id: 3,
        badge: "BABAK III",
        title: "Pernikahan",
        description: "Kini kami sampai pada hari yang kami nantikan, hari di mana dua hati dipersatukan dalam ikatan suci pernikahan. Semoga langkah ini menjadi awal kehidupan baru yang penuh cinta, kebahagiaan, dan keberkahan."
      }
    ],
    paragraphs: [
      "Berawal dari pertemuan sederhana, kami saling mengenal dan mulai berbagi banyak cerita. Tanpa disadari, kebersamaan itu tumbuh menjadi rasa nyaman yang semakin kuat dari hari ke hari.",
      "Dengan niat yang tulus dan restu keluarga, kami memutuskan untuk melangkah ke tahap yang lebih serius. Momen lamaran menjadi awal dari perjalanan baru yang penuh harapan dan doa baik.",
      "Kini kami sampai pada hari yang kami nantikan, hari di mana dua hati dipersatukan dalam ikatan suci pernikahan. Semoga langkah ini menjadi awal kehidupan baru yang penuh cinta, kebahagiaan, dan keberkahan."
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
