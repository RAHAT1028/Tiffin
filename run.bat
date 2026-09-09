@echo off
title Project JK - Smart School Tiffin Platform
cd /d "%~dp0"

echo ========================================================
echo   Starting Project JK - Smart School Tiffin Platform
echo ========================================================
echo.

if not exist node_modules (
    echo [INFO] node_modules not found. Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed.
        pause
        exit /b %errorlevel%
    )
)

if not exist .env (
    if exist .env.example (
        echo [INFO] Creating .env from .env.example...
        copy .env.example .env >nul
    )
)

echo [INFO] Starting development server at http://localhost:3000 ...
echo [INFO] Press Ctrl+C to stop the server.
echo.

start "" "http://localhost:3000"
call npm run dev
pause
