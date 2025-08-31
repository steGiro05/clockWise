# 🚀 ClockWise

Sistema completo per la gestione di **ingressi, uscite e pause aziendali** basato su **Flask (backend)** e **React Native (frontend mobile)**.  
Il flusso si basa su **QR code generati dinamicamente** a ogni ingresso, con funzionalità di statistiche per i dipendenti e strumenti di monitoraggio in tempo reale per gli amministratori tramite **socket**.  

---

## 📌 Funzionalità principali

### 👩‍💼 Lato Utente
- Login e autenticazione sicura  
- Scansione QR code dinamico per:  
  - **Ingresso** in azienda  
  - **Uscita** dall’azienda  
  - **Inizio e fine pausa**  
- Dashboard personale con:  
  - Statistiche di presenza 
  - Storico ingressi/uscite  

### 🛠️ Lato Admin
- Monitoraggio presenze in **tempo reale** tramite **socket**  
---

## 🏗️ Architettura

- **Backend (Flask)**  
  - Gestione autenticazione JWT  
  - API REST per l’app mobile  
  - Generazione QR code univoco e temporizzato  
  - Database **SQLite** per la persistenza dati  
  - Socket.IO per aggiornamenti in tempo reale  

- **Frontend (React Native)**  
  - App mobile per utenti e admin  
  - Lettura QR code con fotocamera  
  - Dashboard con statistiche personali  
  - Pagine admin per monitoraggio live  

---
### 📜 Licenza
MIT License - libero utilizzo e modifica
