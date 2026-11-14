@echo off
rem Lance l'app sur ce PC a l'adresse http://localhost:8080 (fermer cette fenetre pour arreter).
cd /d "%~dp0"
start "" http://localhost:8080
node tools\serveur.mjs 8080
