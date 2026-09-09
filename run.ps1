# TIFFIN - Smart School Tiffin Platform Runner Script
$Host.UI.RawUI.WindowTitle = "TIFFIN - Smart School Tiffin Platform"

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Starting TIFFIN - Smart School Tiffin Platform" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "[INFO] node_modules not found. Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] npm install failed." -ForegroundColor Red
        Read-Host "Press Enter to exit..."
        exit $LASTEXITCODE
    }
}

if (-not (Test-Path ".env")) {
    if (Test-Path ".env.example") {
        Write-Host "[INFO] Creating .env from .env.example..." -ForegroundColor Yellow
        Copy-Item ".env.example" -Destination ".env"
    }
}

Write-Host "[INFO] Starting development server at http://localhost:3000 ..." -ForegroundColor Green
Write-Host "[INFO] Press Ctrl+C to stop the server." -ForegroundColor Gray
Write-Host ""

Start-Process "http://localhost:3000"
npm run dev
