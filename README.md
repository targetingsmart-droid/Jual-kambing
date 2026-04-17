# ABADI FARM - Kambing Kurban Premium

Website penjualan kambing kurban dengan katalog online, pemesanan via WhatsApp, dan panel admin untuk manajemen produk.

## Live Demo

[https://jual-kambing.vercel.app](https://jual-kambing.vercel.app)

## Fitur

### Halaman Publik
- Hero section dengan desain premium
- Katalog kambing hidup dan paket masak dengan tab switcher
- Kartu produk dengan gambar, harga, dan berat
- Tombol pesan via WhatsApp langsung
- Section fasilitas gratis (pengiriman, pemotongan, pengemasan, pemasakan)
- Floating WhatsApp button
- Scroll-to-top button
- Responsif (mobile, tablet, desktop)

### Panel Admin (`/admin`)
- Login dengan email dan password (Supabase Auth)
- Dashboard dengan statistik produk aktif
- CRUD lengkap untuk kambing hidup
- CRUD lengkap untuk paket masak
- Upload gambar ke Supabase Storage
- Validasi form dengan Zod
- Toast notifikasi untuk setiap aksi

## Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| [Next.js 14](https://nextjs.org/) (Pages Router) | Framework React |
| [Tailwind CSS](https://tailwindcss.com/) | Styling dengan custom design system |
| [Supabase](https://supabase.com/) | Auth, Database (PostgreSQL), Storage |
| [shadcn/ui](https://ui.shadcn.com/) | Komponen UI (Card, Button, Badge, Tabs, Table, Form, Dialog, Toast) |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Validasi form |
| [Framer Motion](https://www.framer.com/motion/) | Animasi |
| [Lucide React](https://lucide.dev/) | Ikon |

## Struktur Database

### Tabel `live_goats`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | UUID | Primary key |
| type | TEXT | A, B, C, D, atau E |
| weight_range | TEXT | Rentang berat (contoh: "21-25 kg") |
| price | INTEGER | Harga dalam Rupiah |
| description | TEXT | Deskripsi produk |
| image_url | TEXT | URL gambar |
| is_active | BOOLEAN | Tampil di katalog atau tidak |

### Tabel `cooked_packages`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | UUID | Primary key |
| type | TEXT | A, B, C, D, atau E |
| weight_range | TEXT | Rentang berat |
| price | INTEGER | Harga dalam Rupiah |
| menu_items | TEXT[] | Array menu masakan |
| description | TEXT | Deskripsi paket |
| image_url | TEXT | URL gambar |
| is_active | BOOLEAN | Tampil di katalog atau tidak |

## Setup Lokal

### Prasyarat
- Node.js 18+
- Akun Supabase

### Langkah

1. Clone repository
```bash
git clone https://github.com/targetingsmart-droid/Jual-kambing.git
cd Jual-kambing
```

2. Install dependencies
```bash
npm install
```

3. Buat file `.env.local` (atau gunakan `.env` yang sudah ada)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_WHATSAPP_NUMBER_1=628xxxxxxxxxx
NEXT_PUBLIC_WHATSAPP_NUMBER_2=628xxxxxxxxxx
```

4. Setup Supabase
   - Buat tabel `live_goats` dan `cooked_packages` (lihat SQL di bawah)
   - Aktifkan RLS dan tambahkan policies
   - Buat storage bucket `goat-images` (public)
   - Buat user admin via Authentication

5. Jalankan development server
```bash
npm run dev
```

6. Buka http://localhost:3000

### SQL Schema

```sql
CREATE TABLE live_goats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  type TEXT NOT NULL CHECK (type IN ('A', 'B', 'C', 'D', 'E')),
  weight_range TEXT NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE cooked_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  type TEXT NOT NULL CHECK (type IN ('A', 'B', 'C', 'D', 'E')),
  weight_range TEXT NOT NULL,
  price INTEGER NOT NULL,
  menu_items TEXT[],
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true
);

ALTER TABLE live_goats ENABLE ROW LEVEL SECURITY;
ALTER TABLE cooked_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON live_goats FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON cooked_packages FOR SELECT USING (true);
CREATE POLICY "Allow authenticated all" ON live_goats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated all" ON cooked_packages FOR ALL USING (auth.role() = 'authenticated');
```

## Panduan Admin Panel

### Login
1. Buka `/admin/login` di browser
2. Masukkan email dan password admin
3. Klik "Masuk"

### Menambah Kambing Hidup
1. Dari dashboard, klik "Kelola Kambing Hidup"
2. Klik tombol "Tambah Baru"
3. Isi form:
   - **Tipe**: Pilih A, B, C, D, atau E
   - **Berat**: Masukkan rentang berat (contoh: "21-25 kg")
   - **Harga**: Masukkan harga dalam Rupiah (contoh: 2500000)
   - **Deskripsi**: Opsional, deskripsi singkat produk
   - **Aktif**: Centang jika ingin ditampilkan di katalog
   - **Gambar**: Klik area upload untuk memilih foto (JPG/PNG/WebP, maks 5MB)
4. Klik "Tambah Kambing"

### Menambah Paket Masak
1. Dari dashboard, klik "Kelola Paket Masak"
2. Klik tombol "Tambah Baru"
3. Isi form sama seperti kambing hidup, ditambah:
   - **Menu Masakan**: Tulis menu dipisahkan koma (contoh: "Rendang, Gulai, Sate")
4. Klik "Tambah Paket"

### Edit dan Hapus
- Klik ikon pensil untuk mengedit produk
- Klik ikon tempat sampah untuk menghapus (ada konfirmasi)

### Tips
- Produk dengan status "Nonaktif" tidak akan muncul di katalog publik
- Gunakan gambar berkualitas tinggi (minimal 600x450 piksel)
- Harga diisi tanpa titik atau koma (contoh: 2500000, bukan 2.500.000)

## Deploy ke Vercel

1. Push ke GitHub
2. Import repository di [vercel.com/new](https://vercel.com/new)
3. Tambahkan environment variables
4. Deploy

## Kontak

WhatsApp: +62 822-2055-3417

## Lisensi

MIT
