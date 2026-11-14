@echo off
rem Publie une nouvelle version : tests, numero de version, envoi sur GitHub.
cd /d "%~dp0"
node tools\preparer.mjs
if errorlevel 1 (
  echo.
  echo Publication annulee : corrige les erreurs ci-dessus.
  pause
  exit /b 1
)
git add -A
git commit -m "Mise a jour des fiches"
git push
echo.
echo Termine. Sur l'iPad : ouvrir l'app, puis Reglages, Chercher une mise a jour.
pause
