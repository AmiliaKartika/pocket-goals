# 📄 Functional Requirement Document

## 1. Overview

Dokumen ini mendefinisikan kebutuhan fungsional yang telah diimplementasikan pada aplikasi **Pocket Goals**.

Functional requirements dibagi berdasarkan area utama aplikasi:

1. Main Page
2. Goal/Bill Detail
3. Goal/Bill Management

---

# 2. Functional Requirements

## 2.1 Main Page

| ID        | Requirement                                                                                                                     | Status |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- | :----: |
| **FR-01** | Sistem dapat menyediakan form untuk menambahkan goal/bill baru dengan input keterangan, nominal target, deadline, dan kategori. |    ✅   |
| **FR-02** | Sistem dapat memvalidasi nominal target agar tidak bernilai negatif dan deadline agar tidak berada di masa lalu.                |    ✅   |
| **FR-03** | Sistem dapat menyimpan data goal/bill ke Local Storage.                                                                         |    ✅   |
| **FR-04** | Sistem dapat menampilkan seluruh goal/bill dari Local Storage dalam bentuk card list.                                           |    ✅   |
| **FR-05** | Sistem dapat menghitung dan menampilkan sisa hari menuju deadline secara otomatis.                                              |    ✅   |
| **FR-06** | Sistem dapat menghitung persentase progres berdasarkan dana yang telah terkumpul terhadap target.                               |    ✅   |
| **FR-07** | Sistem dapat menampilkan progress bar dan persentase progres.                                                                   |    ✅   |
| **FR-08** | Sistem dapat mengarahkan pengguna ke halaman detail melalui tombol **"Lihat"**.                                                 |    ✅   |
| **FR-09** | Sistem dapat mengurutkan goal/bill berdasarkan prioritas kategori dengan **Needs** sebagai prioritas utama.                     |    ✅   |

---

## 2.2 Goal/Bill Detail

| ID        | Requirement                                                                                 | Status |
| --------- | ------------------------------------------------------------------------------------------- | :----: |
| **FR-10** | Sistem dapat menampilkan target, total uang terkumpul, dan sisa dana pada dashboard detail. |    ✅   |
| **FR-11** | Sistem dapat menyediakan form untuk menambahkan transaksi tabungan.                         |    ✅   |
| **FR-12** | Sistem dapat memvalidasi nominal tabungan agar tidak bernilai negatif.                      |    ✅   |
| **FR-13** | Sistem dapat menyimpan transaksi tabungan ke Local Storage.                                 |    ✅   |
| **FR-14** | Sistem dapat memperbarui total dana terkumpul dan sisa dana setelah transaksi ditambahkan.  |    ✅   |
| **FR-15** | Sistem dapat menampilkan seluruh riwayat transaksi tabungan dalam bentuk card list.         |    ✅   |
| **FR-16** | Sistem dapat mengurutkan transaksi berdasarkan tanggal terbaru ke tanggal terlama.          |    ✅   |
| **FR-17** | Sistem dapat mengedit transaksi tabungan.                                                   |    ✅   |
| **FR-18** | Sistem dapat menghapus transaksi tabungan dengan konfirmasi pengguna.                       |    ✅   |

---

## 2.3 Goal/Bill Management

| ID        | Requirement                                                                          | Status |
| --------- | ------------------------------------------------------------------------------------ | :----: |
| **FR-19** | Sistem dapat menyediakan fitur Settings pada goal/bill.                              |    ✅   |
| **FR-20** | Sistem dapat mengubah data goal/bill melalui fitur Settings.                         |    ✅   |
| **FR-21** | Sistem dapat menghapus goal/bill melalui fitur Settings dengan konfirmasi pengguna.  |    ✅   |
| **FR-22** | Sistem dapat menghapus riwayat tabungan terkait ketika goal/bill dihapus.            |    ✅   |
| **FR-23** | Sistem dapat mengubah tampilan card menjadi hijau muda ketika target telah tercapai. |    ✅   |

---

## 3. Requirement Status

Seluruh functional requirements yang tercantum dalam dokumen ini telah diimplementasikan pada versi saat ini.

**Implementation Status: `23 / 23 Completed`**

---

[← Project Scope](./02-project-scope.md) · [Use Case Diagram →](./04-use-case-diagram.md)
