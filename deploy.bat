@echo off
REM EduHub Deployment Script for Windows
REM This script prepares the project for deployment without database

echo 🎓 EduHub Deployment Script
echo ================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the client directory
    pause
    exit /b 1
)

REM Create backup of original files
echo 📦 Creating backup of original files...
if exist "package.json" copy "package.json" "package.json.backup" >nul 2>&1
if exist "..\package.json" copy "..\package.json" "..\package.json.backup" >nul 2>&1

REM Use deployment configuration
echo ⚙️  Applying deployment configuration...
if exist "package.json.deployment" (
    copy "package.json.deployment" "package.json" >nul 2>&1
    echo ✅ Using deployment package.json
)

if exist ".env.deployment" (
    copy ".env.deployment" ".env.production" >nul 2>&1
    echo ✅ Using deployment environment
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo 📚 Installing dependencies...
    npm install
)

REM Build the project
echo 🔨 Building for production...
npm run build

REM Check if build was successful
if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!
    echo.
    echo 📁 Build files are in the 'build' directory
    echo.
    echo 🚀 Ready for deployment!
    echo.
    echo Deploy to:
    echo   • Vercel: vercel --prod
    echo   • Netlify: netlify deploy --prod --dir=build
    echo   • GitHub Pages: git subtree push --prefix build origin gh-pages
    echo.
    echo 📖 For detailed instructions, see DEPLOYMENT.md
) else (
    echo ❌ Build failed!
    echo Please check the error messages above
    pause
    exit /b 1
)

REM Ask about restoring original files
set /p restore="🔄 Restore original package.json? (y/N): "
if /i "%restore%"=="y" (
    if exist "package.json.backup" copy "package.json.backup" "package.json" >nul 2>&1
    echo ✅ Original package.json restored
)

echo.
echo 🎉 Deployment preparation complete!
pause
