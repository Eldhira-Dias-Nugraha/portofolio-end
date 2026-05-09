# File Otomatis untuk Commit dan Push ke GitHub
# Silakan jalankan di Terminal: .\commit_ke_github.ps1

Write-Host "Sedang memulai proses upload ke GitHub..." -ForegroundColor Cyan

# Inisialisasi Git jika belum
if (!(Test-Path .git)) {
    git init
}

# Tambahkan semua file
git add .

# Simpan perubahan dengan pesan yang lebih spesifik
git commit -m "Enhance responsiveness, mobile 3D optimization, and navbar smooth scroll"

# Set branch utama ke main
git branch -M main

# Tambahkan remote origin (Hapus yang lama jika ada)
git remote remove origin 2>$null
git remote add origin https://github.com/Eldhira-Dias-Nugraha/portofolio-end.git

# Push ke GitHub
Write-Host "Sedang mengunggah file ke GitHub (Push)..." -ForegroundColor Yellow
git push -u origin main

Write-Host "`nSelesai! Update terbaru sudah ada di GitHub." -ForegroundColor Green
Write-Host "Link: https://github.com/Eldhira-Dias-Nugraha/portofolio-end" -ForegroundColor Cyan
