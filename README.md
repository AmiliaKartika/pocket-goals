# 💰 Pocket Goals (Goals Finance Pockets)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Aplikasi berbasis web sederhana ala *M-Banking* untuk membantu pengguna mengelola target keuangan (*goals/bills*) dan memantau progres tabungan dengan mudah. Seluruh data disimpan dengan aman di dalam browser menggunakan *Local Storage*.

### 🌐 Live Demo: [Klik di Sini untuk Mencoba Aplikasi!]

https://pocket-goals.vercel.app/

## 📷 Preview

![Home Preview](src/assets/Home.png)

## 🚀 Features

- **Manajemen Goals:** Tambah, Edit, dan Hapus target tabungan (Goal/Bill).
- **Transaksi Tabungan:** Catat riwayat pemasukan uang (CRUD Transaction) ke dalam masing-masing target.
- **Visualisasi Progres:** Dilengkapi dengan *Progress Bar* dan kalkulasi persentase otomatis.
- **Tenggat Waktu (Due Date):** Pantau sisa hari menuju tenggat waktu targetmu.
- **Local Storage:** Data tidak akan hilang saat halaman di-refresh (tanpa perlu database/backend).
- **Responsive UI:** Tampilan modern bergaya *Glassmorphism/Soft Shadow* yang nyaman dilihat di desktop maupun mobile.

## 🛠 Tech Stack

- **Markup:** HTML5
- **Styling:** Tailwind CSS (Modern UI Design)
- **Logic:** Vanilla JavaScript (DOM Manipulation & Logic)
- **Storage:** Window Local Storage API

## 💡 Cara Penggunaan

1. Buka [Live Demo](Masukkan Link Website Kamu Disini), lalu klik tombol **"Tambah"** di halaman utama untuk membuat target tabungan baru.
2. Isi Keterangan, Nominal Target, Tanggal Deadline, dan Kategori.
3. Setelah *Goal* terbuat, klik tombol **"Lihat"** pada kartu (*card*) target tersebut.
4. Di halaman detail, klik **"Tambah Tabungan"** untuk memasukkan uang (misal: "Sisa uang jajan minggu ini").
5. Progres tabungan akan otomatis bertambah dan warna *card* akan berubah menjadi hijau jika target sudah tercapai!

## 📂 Documentation

Proyek ini dibangun dengan perencanaan sistem yang matang. Dokumentasi lengkap proyek tersedia pada folder **`docs/`**, meliputi:
- 🎯 **Problem Statement:** Latar belakang masalah yang diselesaikan.
- 📌 **Project Scope:** Batasan dan ruang lingkup fitur aplikasi.
- 📄 **Functional Requirement Document (FRD):** Daftar kebutuhan fungsional sistem.
- 📊 **Use Case Diagram:** Interaksi antara pengguna dan sistem.
- 🌊 **Flowchart:** Alur logika sistem halaman per halaman.

## 📦 Installation & Setup (Untuk Developer)

Jika kamu ingin menjalankan atau memodifikasi proyek ini di komputer lokal:

1. **Clone repositori**
   ```bash
   git clone [https://github.com/AmiliaKartika/goals-finance-pockets.git](https://github.com/AmiliaKartika/goals-finance-pockets.git)