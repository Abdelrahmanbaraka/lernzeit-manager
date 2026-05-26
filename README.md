# Lernzeit-Manager

Der Lernzeit-Manager ist eine webbasierte Anwendung zur Planung, Erfassung und Auswertung von Lernzeiten.  
Die Anwendung richtet sich an Studierende, die ihre Lernziele, Lernplanung und tatsächlichen Lernzeiten übersichtlich verwalten möchten.

Das Projekt wurde als reine Client-Side-Anwendung umgesetzt. Es gibt kein Backend und keine Datenbank.  
Alle Daten werden lokal im Browser über `localStorage` gespeichert.

---

## Inhaltsverzeichnis

1. Projektbeschreibung
2. Funktionen
3. Technologie-Stack
4. Voraussetzungen
5. Installation
6. Anwendung starten
7. Login-Daten für das Team
8. Projektstruktur
9. Datenhaltung
10. Git-Workflow
11. Build
12. Deployment mit Netlify
13. Hinweise für Tests
14. Wichtige Hinweise

---

## 1. Projektbeschreibung

Der Lernzeit-Manager unterstützt Nutzer dabei, Lernziele zu erstellen, Lernzeiten zu planen, Lernzeiten zu erfassen und den Lernfortschritt visuell auszuwerten.

Die Anwendung beinhaltet folgende Hauptbereiche:

- Login
- Dashboard
- Lernziele
- Lernplan / Kalender
- Lernzeiten
- Fortschritt
- Profil

Die Anwendung wurde mit React und Vite entwickelt und läuft vollständig im Browser.

---

## 2. Funktionen

### Login

- Mock-Login ohne echtes Backend
- Login mit Testaccounts
- Lokale Speicherung des aktuell angemeldeten Nutzers
- Weiterleitung zum Dashboard nach erfolgreichem Login
- Fehlermeldung bei falschen Login-Daten
- Hinweis auf lokale Datenhaltung

### Dashboard

- Übersicht über heutige Lernzeit
- Anzeige aktiver Ziele
- Anzeige geplanter Stunden für den aktuellen Monat
- Anzeige erledigter Ziele
- Stoppuhr zur direkten Erfassung von Lernzeiten
- Schnellzugriff auf wichtige Seiten

### Lernziele

- Lernziel erstellen
- Lernziel bearbeiten
- Lernziel löschen
- Lernziel als erledigt markieren
- Anzeige von Status-Emojis
- Speicherung im localStorage

### Lernplan / Kalender

- Monatsplanung mit geplanter Lernzeit
- Auswahl mehrerer Ziele pro Monat
- Tagesplanung im Kalender
- Startzeit, Endzeit und Ziel pro Tagesplanung
- Navigation zwischen Monaten
- Kalender zeigt echte Anzahl der Tage pro Monat
- Tagesplanungen bleiben erhalten, auch wenn ein Ziel als erledigt markiert wird
- Tagesplanungen werden nur über das `X` im Kalender gelöscht

### Lernzeiten

- Lernzeit über Stoppuhr erfassen
- Lernsession manuell nachtragen
- Lernsession löschen
- Speicherung mit Ziel, Datum und Dauer

### Fortschritt

- Diagramm: geplante Stunden vs. absolvierte Stunden im aktuellen Monat
- Diagramm: investierte Stunden pro Ziel
- Diagramm: geplante vs. tatsächliche Stunden in den letzten 6 Monaten
- Detaillierte Fortschrittstabelle pro Lernziel
- Anzeige von geplanten Stunden, tatsächlichen Stunden, Fortschritt und Status

### Profil

- Anzeige des aktuellen Nutzers
- Logout
- Lokale Daten löschen

---

## 3. Technologie-Stack

Das Projekt verwendet folgende Technologien und Bibliotheken:

### Basis

- React 18
- Vite
- JavaScript
- HTML
- CSS

### Routing

- react-router-dom

### Diagramme

- recharts

### Icons

- react-icons

### Entwicklung

- Node.js
- npm
- Git
- GitHub
- Visual Studio Code

### Deployment

- Netlify

---

## 4. Voraussetzungen

Vor der Installation müssen folgende Programme installiert sein:

### Node.js

Empfohlen: Node.js Version 22

Prüfen mit:

```bash
node -v



npm

npm wird zusammen mit Node.js installiert.

Prüfen mit:

npm -v
Git

Prüfen mit:

git --version
Visual Studio Code

Empfohlen als Entwicklungsumgebung.

5. Installation

Repository klonen:

git clone https://github.com/Abdelrahmanbaraka/lernzeit-manager.git

In den Projektordner wechseln:

cd lernzeit-manager

Abhängigkeiten installieren:

npm install

Falls einzelne Bibliotheken fehlen, können sie manuell installiert werden:

npm install react-router-dom
npm install recharts
npm install react-icons
npm install prop-types

Normalerweise reicht aber:

npm install

weil alle Abhängigkeiten in der Datei package.json stehen.

6. Anwendung starten

Die Anwendung lokal starten:

npm run dev

Danach erscheint im Terminal eine lokale URL, meistens:

http://localhost:5173/

Diese URL im Browser öffnen.

7. Login-Daten für das Team

Die Anwendung nutzt Mock-Login-Daten.

Student Account
Benutzername: student
Passwort: 1234
Tutor / Admin Account
Benutzername: tutor
Passwort: 1234

Diese Accounts sind nur für Test- und Demonstrationszwecke vorgesehen.

8. Projektstruktur

Die wichtigste Projektstruktur:

src/
│
├── assets/
│
├── components/
│   ├── layout/
│   ├── goals/
│   ├── planning/
│   ├── timer/
│   ├── progress/
│   ├── profile/
│   └── shared/
│
├── pages/
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── GoalsPage.jsx
│   ├── PlanningPage.jsx
│   ├── LearningTimePage.jsx
│   ├── ProgressPage.jsx
│   ├── ProfilePage.jsx
│   └── NotFoundPage.jsx
│
├── services/
│   ├── storageService.js
│   ├── authService.js
│   ├── goalService.js
│   ├── sessionService.js
│   └── planningService.js
│
├── utils/
│   ├── dateUtils.js
│   ├── storageKeys.js
│   ├── timerUtils.js
│   └── validationUtils.js
│
├── data/
│   └── mockUsers.js
│
├── styles/
│   ├── global.css
│   ├── variables.css
│   └── layout.css
│
├── App.jsx
├── main.jsx
└── routes.jsx
9. Datenhaltung

Die Anwendung verwendet localStorage.

Es gibt keine zentrale Datenbank und kein Backend.

Gespeichert werden unter anderem:

aktueller Nutzer
Lernziele
Monatsplanungen
Tagesplanungen
Lernsessions

Die Speicherung erfolgt nutzerbezogen.
Das bedeutet, dass student und tutor getrennte lokale Daten haben.

Beispiel:

student_lernzeit_goals
student_lernzeit_month_plans
student_lernzeit_daily_plans
student_lernzeit_learning_sessions

Die Daten bleiben im Browser gespeichert, bis sie vom Nutzer gelöscht werden oder der Browser-Speicher geleert wird.

10. Git-Workflow

Aktuellen Stand prüfen:

git status

Änderungen hinzufügen:

git add .

Commit erstellen:

git commit -m "Beschreibung der Änderung"

Änderungen zu GitHub pushen:

git push origin main

Aktuellen Stand von GitHub holen:

git pull origin main
11. Build

Für einen Produktions-Build:

npm run build

Der Build wird im Ordner dist/ erstellt.

Build lokal testen:

npm run preview
12. Deployment mit Netlify

Die Anwendung kann über Netlify bereitgestellt werden.

Vorgehen
Netlify öffnen
Mit GitHub verbinden
Repository lernzeit-manager auswählen
Build Command setzen:
npm run build
Publish Directory setzen:
dist
Deployment starten

Nach erfolgreichem Deployment stellt Netlify eine URL bereit.

13. Hinweise für Tests

Wichtige Testfälle:

Login
Login mit student / 1234
Login mit tutor / 1234
Login mit falschen Daten
Lernziele
Ziel erstellen
Ziel bearbeiten
Ziel löschen
Ziel als erledigt markieren
Prüfen, ob Ziel nach Seitenwechsel gespeichert bleibt
Lernplan
Monatsplan erstellen
Geplante Stunden eintragen
Ziele auswählen
Tagesplanung im Kalender erstellen
Zwischen Monaten wechseln
Prüfen, ob Tagesplanung nach Seitenwechsel erhalten bleibt
Tagesplanung über X löschen
Lernzeiten
Stoppuhr starten
Stoppuhr pausieren
Stoppuhr stoppen
Lernsession manuell nachtragen
Lernsession löschen
Fortschritt
Geplante Stunden mit tatsächlichen Lernzeiten vergleichen
Investierte Stunden pro Ziel prüfen
Fortschrittstabelle pro Lernziel prüfen
Profil
Logout testen
Daten löschen testen
14. Wichtige Hinweise
Das Login ist nur ein Mock-Login.
Es gibt keine echte Authentifizierung.
Es gibt kein Backend.
Es gibt keine zentrale Datenbank.
Die Daten werden lokal im Browser gespeichert.
Beim Löschen der Browserdaten können gespeicherte Daten verloren gehen.
Die Anwendung ist für Demonstrations- und Projektzwecke gedacht.
HTTPS wird im Deployment über Netlify bereitgestellt.
Autor / Team

Projekt: Lernzeit-Manager

Teammitglieder:

Yannick Laubinger
Isabella Buchwieser
Abdelrahman Baraka
Anikka Lynge