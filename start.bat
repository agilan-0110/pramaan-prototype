@echo off
title SETU Platform Launcher
cls
echo ================================================================
echo           SETU - PUBLIC AUDIT ^& INFRASTRUCTURE MONITORING
echo ================================================================
echo.
echo Starting Backend API (Port 8000) and Frontend Portal (Port 3000)...
echo.

cd /d "%~dp0"

:: 1. Launch FastAPI Backend
start "SETU Backend API (Port 8000)" cmd /k "cd /d %~dp0backend && .\venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000"

:: 2. Launch Frontend Static Server
start "SETU Frontend Portal (Port 3000)" cmd /k "cd /d %~dp0frontend && ..\backend\venv\Scripts\python.exe -m http.server 3000"

:: 3. Wait for servers to spin up and launch Citizen Portal
timeout /t 3 >nul
start http://localhost:3000/#/citizen-portal

echo Servers are running!
echo ----------------------------------------------------------------
echo * Frontend Portal: http://localhost:3000/#/citizen-portal
echo * Backend Swagger: http://127.0.0.1:8000/docs
echo ----------------------------------------------------------------
echo You can keep these server windows open while testing.
echo.
