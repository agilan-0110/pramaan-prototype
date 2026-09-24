Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "          PRAMAAN - PUBLIC AUDIT & INFRASTRUCTURE MONITORING" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting Backend API (Port 8000) and Frontend Portal (Port 3000)..." -ForegroundColor Yellow

$rootDir = $PSScriptRoot
if (-not $rootDir) {
    $rootDir = Get-Location
}

# 1. Start Backend in a dedicated window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\backend'; .\venv\Scripts\Activate.ps1; python -m uvicorn app.main:app --reload --port 8000"

# 2. Start Frontend in a dedicated window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\frontend'; & '$rootDir\backend\venv\Scripts\python.exe' -m http.server 3000"

Start-Sleep -Seconds 2

# 3. Open browser
Start-Process "http://localhost:3000/#/citizen-portal"

Write-Host "Servers started successfully!" -ForegroundColor Green
Write-Host "* Frontend: http://localhost:3000/#/citizen-portal" -ForegroundColor White
Write-Host "* Backend:  http://127.0.0.1:8000/docs" -ForegroundColor White
