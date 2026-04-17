-- ============================================
-- ABADI FARM - Supabase Migration Script
-- Jalankan SQL ini di Supabase SQL Editor
-- Dashboard > SQL Editor > New Query
-- ============================================

-- 1. Tambah kolom goat_number dan height ke tabel live_goats
ALTER TABLE live_goats ADD COLUMN IF NOT EXISTS goat_number TEXT;
ALTER TABLE live_goats ADD COLUMN IF NOT EXISTS height TEXT;

-- 2. Update tipe lama (A,B,C,D,E) menjadi nama baru
UPDATE live_goats SET type = 'Bronze' WHERE type = 'A';
UPDATE live_goats SET type = 'Silver' WHERE type = 'B';
UPDATE live_goats SET type = 'Gold' WHERE type = 'C';
UPDATE live_goats SET type = 'Platinum' WHERE type = 'D';
UPDATE live_goats SET type = 'Diamond' WHERE type = 'E';

-- 3. Update tipe lama di tabel cooked_packages juga
UPDATE cooked_packages SET type = 'Bronze' WHERE type = 'A';
UPDATE cooked_packages SET type = 'Silver' WHERE type = 'B';
UPDATE cooked_packages SET type = 'Gold' WHERE type = 'C';
UPDATE cooked_packages SET type = 'Platinum' WHERE type = 'D';
UPDATE cooked_packages SET type = 'Diamond' WHERE type = 'E';

-- 4. Tambah kolom goat_number dan height ke tabel cooked_packages (opsional)
ALTER TABLE cooked_packages ADD COLUMN IF NOT EXISTS goat_number TEXT;
ALTER TABLE cooked_packages ADD COLUMN IF NOT EXISTS height TEXT;

-- ============================================
-- SELESAI! Refresh halaman admin untuk melihat
-- kolom baru (Nomor Domba & Tinggi)
-- ============================================
