@echo off
cd /d "%~dp0"
echo 🌿 Tending the Garden...

:: This command tells Quartz to sync your changes
cmd /c npx quartz sync

echo.
echo ✅ Done! Your garden is live.
pause