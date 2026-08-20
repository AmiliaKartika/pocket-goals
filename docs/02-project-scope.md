# 📌 Project Scope

## 1. Project Overview

Pocket Goals merupakan aplikasi web sederhana yang membantu pengguna mengelola target keuangan dan bill berdasarkan **nominal, kategori, progres, dan deadline**.

Pada tahap awal, aplikasi menggunakan **Local Storage** sebagai media penyimpanan data dan tidak memerlukan autentikasi pengguna.

---

## 2. In Scope

Fitur yang termasuk dalam versi saat ini:

### Goal & Bill Management

* Membuat goal/bill baru.
* Melihat daftar goal/bill.
* Melihat detail goal/bill.
* Mengubah data goal/bill.
* Menghapus goal/bill.
* Menentukan kategori goal/bill.

### Savings Management

* Menambahkan transaksi tabungan.
* Melihat riwayat tabungan.
* Mengedit transaksi tabungan.
* Menghapus transaksi tabungan.

### Progress Tracking

* Menghitung total dana yang terkumpul.
* Menghitung sisa dana yang diperlukan.
* Menghitung persentase progres.
* Menampilkan progress bar.
* Menampilkan status target ketika telah tercapai.

### Deadline & Priority

* Menampilkan deadline.
* Menghitung sisa hari menuju deadline.
* Mengurutkan goal/bill berdasarkan prioritas kategori.

---

## 3. Out of Scope

Fitur berikut belum termasuk dalam versi saat ini:

* ❌ User authentication / login.
* ❌ Database eksternal.
* ❌ Sinkronisasi data antar-device.
* ❌ Multi-user account.
* ❌ Backend server.
* ❌ Integrasi payment gateway.
* ❌ Notifikasi atau reminder eksternal.

Fitur-fitur tersebut dapat dipertimbangkan untuk pengembangan pada tahap berikutnya.

---

## 4. Data Storage

Pada versi saat ini, data disimpan menggunakan:

**Browser Local Storage**

Pendekatan ini dipilih karena aplikasi masih berada pada tahap awal pengembangan dan belum membutuhkan backend atau database eksternal.

### Data yang disimpan

* Goal/bill.
* Informasi target.
* Deadline.
* Kategori.
* Riwayat uang tabungan.
* Data yang berkaitan dengan progres.

---

## 5. Authentication

Pocket Goals tidak menggunakan sistem login atau autentikasi pada versi saat ini.

Pengguna dapat langsung menggunakan aplikasi setelah membukanya.

> Authentication dapat dipertimbangkan pada pengembangan selanjutnya apabila aplikasi telah menggunakan backend dan database eksternal.

---

[← Problem Statement](./01-problem-statement.md) · [Functional Requirements →](./03-functional-requirement-document.md)
