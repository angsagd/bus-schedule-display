# Bus Schedule Display - Surya Bali (versi 2.0)

Aplikasi web ini dibuat **khusus untuk operasional Bus Surya Bali** sebagai papan informasi jadwal di area terminal/loket.

Tujuan utamanya adalah memudahkan petugas mengelola jadwal, lalu menampilkannya secara real-time di layar informasi keberangkatan dan kedatangan.

## Ringkasan

Aplikasi terdiri dari 2 jenis halaman:

1. `index.html` (halaman kontrol/admin)
2. `keberangkatan.html` dan `kedatangan.html` (halaman display untuk penumpang)

Data disimpan di browser menggunakan `localStorage`, sehingga perubahan dari halaman kontrol langsung terbaca di halaman display tanpa backend.

## Fitur Utama

### 1. Kelola jadwal keberangkatan dan kedatangan
- Tersedia masing-masing 6 baris data.
- Field yang bisa diisi: nomor, seri bus, plat nomor, mesin, kota, waktu, dan status.
- Status bisa dipilih sesuai konteks (mis. `Segera Berangkat`, `Sudah Tiba`, `Diundur`, dll).

### 2. Tampilkan/sembunyikan kolom
- Operator dapat mengatur kolom mana saja yang ditampilkan di layar display.
- Pengaturan berlaku terpisah untuk tabel keberangkatan dan kedatangan.

### 3. Ubah urutan baris jadwal
- Setiap baris dapat dipindahkan naik/turun dari halaman kontrol.
- Nomor urut otomatis menyesuaikan setelah perpindahan.

### 4. Running text informasi
- Tersedia area running text untuk pengumuman penting kepada penumpang.
- Kecepatan running text dapat diatur dari halaman kontrol.
- Running text ditampilkan di footer layar display.

### 5. Multi-theme tampilan
- Tema yang tersedia: `Classic`, `Modern`, `Aurora`, `Board`, `Night`.
- Tema dipilih dari halaman kontrol dan langsung diterapkan ke halaman display.

### 6. Jam dan tanggal real-time
- Jam/tanggal tampil otomatis di halaman kontrol dan display (locale Indonesia).

### 7. Persistensi data otomatis
- Semua perubahan disimpan ke `localStorage` key: `busSchedule`.
- Saat halaman direfresh, data tetap tersedia.

## Struktur Halaman

- `index.html`: pusat kontrol operator untuk input dan pengaturan.
- `keberangkatan.html`: layar informasi jadwal keberangkatan.
- `kedatangan.html`: layar informasi jadwal kedatangan.

## Struktur Penyimpanan Data

Data utama disimpan dalam objek `busSchedule`:

```json
{
  "setting": {
    "theme": "Classic",
    "speed": 60
  },
  "kolom": {
    "keberangkatan": {},
    "kedatangan": {}
  },
  "keberangkatan": [],
  "kedatangan": [],
  "runningText": "..."
}
```

## Cara Menjalankan

1. Clone atau salin project ke komputer lokal.
2. Buka `index.html` di browser.
3. Isi data jadwal di tab `Keberangkatan` dan `Kedatangan`.
4. Klik tombol `Tampilkan` untuk membuka halaman display.
5. Gunakan monitor/TV terpisah untuk menampilkan `keberangkatan.html` atau `kedatangan.html`.

Catatan: aplikasi ini bersifat frontend-only (tanpa server API), sehingga cocok untuk penggunaan lokal/offline di lingkungan operasional Surya Bali.

## Teknologi

- HTML5
- CSS3
- JavaScript (vanilla + jQuery)
- Bootstrap 5
- Browser `localStorage`

## Catatan Penggunaan

- Aplikasi ini didesain untuk kebutuhan internal dan visual identitas **Bus Surya Bali**.
- Jika ingin dipakai oleh operator lain, disarankan menyesuaikan branding, teks, status, dan tema terlebih dahulu.
