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
14. Änderungsliste
15. Wichtige Hinweise

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
- Anzeige erledigter Ziele
- Stoppuhr zur direkten Erfassung von Lernzeiten
- Stoppuhr läuft bei Navigation innerhalb der App weiter
- Schnellzugriff zum Erstellen eines Lernziels
- Schnellzugriff auf wichtige Seiten

### Lernziele

- Lernziel erstellen
- Lernziel bearbeiten
- Lernziel löschen
- Lernziel als erledigt markieren
- Lernzielnamen müssen eindeutig sein; Groß-/Kleinschreibung und Leerzeichen am Anfang oder Ende werden bei der Prüfung ignoriert
- Für Teilziele sollten eindeutige Namen wie `Mathe – Lektion 1` verwendet werden
- Beschreibung ist optional
- Beschreibungen erklären den Kontext eines Lernziels und werden in der Fortschrittsansicht angezeigt
- Aktive und erledigte Lernziele werden getrennt angezeigt
- Erledigte Lernziele bleiben als Historie sichtbar, bis sie manuell gelöscht werden
- Anzeige von Status-Emojis
- Status `Überfällig` erscheint erst ab dem Tag nach dem Fälligkeitsdatum
- Speicherung im localStorage

### Lernplan / Kalender

- Monatsplanung mit geplanter Lernzeit für den aktuellen Monat und die nächsten 5 Monate
- Die Monatsplanung definiert die geplanten Stunden pro Lernziel
- Monatsplanungen können bearbeitet und gelöscht werden
- Auswahl mehrerer Ziele pro Monat
- Tagesplanung im Kalender für heute bis maximal 30 Tage in die Zukunft
- Tagesplanung verteilt die geplanten Monatsstunden auf konkrete Kalendereinträge
- `Stunden noch zu verplanen` zeigt pro Lernziel, wie viele Monatsstunden noch nicht im Kalender verteilt sind
- Tagesplanung kann direkt über den Button `Tagesplan erstellen` oder über das `+` im Kalender erstellt werden
- Tagesplanungen können bearbeitet und gelöscht werden
- Startzeit, Endzeit und Ziel pro Tagesplanung
- Überschneidende Tagesplanungen am selben Datum werden blockiert
- Navigation zwischen Monaten
- Kalender zeigt echte Anzahl der Tage pro Monat
- Tagesplanungen bleiben erhalten, auch wenn ein Ziel als erledigt markiert wird
- Tagesplanungen bleiben auch sichtbar, wenn ein Lernziel später gelöscht wird
- Tagesplanungen werden nur über das `X` im Kalender gelöscht
- Browser-Benachrichtigung 15 Minuten nach verpasstem Start einer geplanten Lernsession, sofern Benachrichtigungen erlaubt sind

### Lernzeiten

- Lernzeit über Stoppuhr erfassen
- Lernsession manuell nachtragen
- Lernsession löschen
- Speicherung mit Ziel, Datum, Startzeit, Endzeit und Dauer
- Stoppuhr-Sessions speichern ebenfalls Start- und Endzeit
- Überschneidende doppelte Lernzeiten für dasselbe Ziel werden nach Möglichkeit blockiert
- Eine laufende Stoppuhr verhindert parallele Erfassung für dasselbe Ziel

### Fortschritt

- Übersicht aktiver und erledigter Ziele
- Einfacher Monatsvergleich von geplanten und tatsächlich gelernten Stunden
- Fortschrittsbalken pro Lernziel
- Anzeige von Beschreibung, Fälligkeitsdatum, geplanten Stunden, gelernten Stunden, Fortschritt und Status
- Monatsstunden sind die Quelle für geplante Stunden; Tagesplanungen zählen nur als Fallback, wenn es für ein Ziel in einem Monat keinen Monatsplan gibt

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

Vor der Installation müssen folgende Programme auf dem Rechner installiert sein.

### Node.js

Empfohlen wird **Node.js Version 22**.

Version prüfen:

```bash
node -v
```

### npm

npm wird zusammen mit Node.js installiert.

Version prüfen:

```bash
npm -v
```

### Git

Git wird für die Versionsverwaltung und das Klonen des Repositorys benötigt.

Version prüfen:

```bash
git --version
```

### Visual Studio Code

Visual Studio Code wird als Entwicklungsumgebung empfohlen.

---

## 5. Installation

### Repository klonen

```bash
git clone https://github.com/Abdelrahmanbaraka/lernzeit-manager.git
```

### In den Projektordner wechseln

```bash
cd lernzeit-manager
```

### Abhängigkeiten installieren

```bash
npm install
```

Falls einzelne Bibliotheken fehlen, können sie manuell installiert werden:

```bash
npm install react-router-dom
npm install recharts
npm install react-icons
npm install prop-types
```

Normalerweise reicht aber:

```bash
npm install
```

Alle benötigten Abhängigkeiten stehen in der Datei `package.json`.

---

## 6. Anwendung starten

Die Anwendung lokal starten:

```bash
npm run dev
```

Danach erscheint im Terminal eine lokale URL, meistens:

```text
http://localhost:5173/
```

Diese URL wird im Browser geöffnet.

---

## 7. Login-Daten für das Team

Die Anwendung nutzt Mock-Login-Daten.  
Die Accounts dienen nur zu Test- und Demonstrationszwecken.



## 8. Projektstruktur

Die wichtigste Projektstruktur sieht wie folgt aus:

```text
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
```

---

## 9. Datenhaltung

Die Anwendung verwendet `localStorage`.

Es gibt:

- keine zentrale Datenbank
- kein Backend
- keine serverseitige Benutzerverwaltung

Gespeichert werden unter anderem:

- aktueller Nutzer
- Lernziele
- Monatsplanungen
- Tagesplanungen
- Lernsessions
- aktive Stoppuhr
- bereits versendete Erinnerungen für verpasste Tagesplanungen

Die Speicherung erfolgt nutzerbezogen.  
Das bedeutet, dass `student` und `tutor` getrennte lokale Daten haben.

Beispiele:

```text
student_lernzeit_goals
student_lernzeit_month_plans
student_lernzeit_daily_plans
student_lernzeit_learning_sessions
student_lernzeit_active_stopwatch
student_lernzeit_notified_plans
```

Die Daten bleiben im Browser gespeichert, bis sie vom Nutzer gelöscht werden oder der Browser-Speicher geleert wird.

---

## 10. Git-Workflow

### Aktuellen Stand prüfen

```bash
git status
```

### Änderungen hinzufügen

```bash
git add .
```

### Commit erstellen

```bash
git commit -m "Beschreibung der Änderung"
```

### Änderungen zu GitHub pushen

```bash
git push origin main
```

### Aktuellen Stand von GitHub holen

```bash
git pull origin main
```

---

## 11. Build

Für einen Produktions-Build:

```bash
npm run build
```

Der Build wird im Ordner `dist/` erstellt.

Build lokal testen:

```bash
npm run preview
```

---



## 13. Hinweise für Tests

Für den finalen Sprint wurde ein strukturiertes Testkonzept ergänzt. Es enthält automatisierte Quellcode-Prüfungen, Unit-/Logiktests, Component-Tests, Integrationstests und Regressionstests für zentrale Funktionen. Die Ergebnisse werden zusätzlich in einem CSV- und XLSX-Testprotokoll dokumentiert.

Testkategorien:

- Automatisierte Quellcode-Prüfungen: statische Prüfungen von Quelltexten, keine Component-Tests
- Unit-/Logiktests: direkte Tests von Helper- und Utility-Funktionen
- Component-Tests: echte React-Komponenten-Tests mit Vitest, React Testing Library und jsdom
- Integrationstests: Zusammenspiel mehrerer Logikbereiche, z. B. Monatsplanung, Tagesplanung und Fortschritt
- Regressionstests: Absicherung wichtiger finaler Sprint-Änderungen und bestehender Kernfunktionen
- Manuelle UI-/E2E-Tests: manuell in der Anwendung geprüfte Nutzerflüsse
- Manuelle Responsive-Tests: manuell über Chrome DevTools geprüfte Layouts

Die UI-/E2E-Prüfungen wurden manuell durchgeführt. Eine automatisierte Browser-Testumgebung wie Playwright oder Puppeteer ist aktuell nicht Bestandteil des Projekts.

Die Responsive-Prüfung wurde manuell über Chrome DevTools durchgeführt.

Ausführen:

```bash
npm test
```

Einzelne Testteile:

```bash
npm run test:checks
npm run test:components
```

CSV-Testprotokoll:

```text
test-results-final-sprint.csv
test-results-final-sprint.xlsx
```

### Login

- Login mit `student / 1234`
- Login mit `tutor / 1234`
- Login mit falschen Daten

### Lernziele

- Ziel erstellen
- Prüfen, dass ein zweites Ziel mit gleichem Namen wie `Mathe`, ` mathe ` oder `MATHE` blockiert wird
- Ziel bearbeiten
- Ziel löschen
- Ziel als erledigt markieren
- Prüfen, ob Ziele nach einem Seitenwechsel gespeichert bleiben

### Lernplan

- Monatsplan für den aktuellen Monat oder die nächsten 5 Monate erstellen
- Monatsplan bearbeiten und löschen
- Geplante Stunden eintragen
- Ziele auswählen
- Prüfen, dass mehr als 10 Ziele in einem Monatsplan ausgewählt werden können
- Tagesplanung im Kalender oder über `Tagesplan erstellen` anlegen
- Prüfen, ob `Stunden noch zu verplanen` die Monatsstunden minus Kalenderstunden anzeigt
- Prüfen, dass Tagesplanungen in der Fortschrittsansicht nicht zusätzlich zu Monatsstunden doppelt gezählt werden
- Prüfen, dass neue Tagesplanungen nur für die nächsten 30 Tage möglich sind
- Tagesplanung bearbeiten und löschen
- Zwischen Monaten wechseln
- Prüfen, ob Tagesplanungen nach einem Seitenwechsel erhalten bleiben
- Prüfen, ob vergangene Tagesplanungen sichtbar bleiben
- Tagesplanung über X löschen

### Lernzeiten

- Stoppuhr starten
- Während laufender Stoppuhr innerhalb der App navigieren
- Stoppuhr pausieren
- Stoppuhr stoppen
- Prüfen, ob Stoppuhr-Sessions Start- und Endzeit anzeigen
- Lernsession manuell nachtragen
- Lernsession löschen

### Fortschritt

- Geplante Stunden mit tatsächlichen Lernzeiten vergleichen
- Aktive und erledigte Ziele prüfen
- Fortschrittsbalken pro Lernziel prüfen
- Status Offen, Erledigt und Überfällig prüfen
- Beschreibung unter dem Lernzielnamen prüfen

### Benachrichtigungen

- Browser-Benachrichtigungen erlauben
- Tagesplanung mit Startzeit in der Vergangenheit anlegen
- Prüfen, ob nach 15 Minuten ohne passende Lernsession eine Erinnerung erscheint

### Profil

- Logout testen
- Daten löschen testen

---

## 14. Änderungsliste

- 10-Ziele-Limit aus Anforderungen entfernt.
- Dashboard-Counter `Geplante Stunden` entfernt.
- Login-Daten werden auf der Startseite nicht mehr angezeigt.

---

## 15. Wichtige Hinweise

- Das Projekt befindet sich im finalen Sprint / Feature Freeze. Es werden nur kritische Fehlerbehebungen, kleine UI-Verbesserungen, Dokumentationsupdates und Deployment-Vorbereitung umgesetzt.
- Neue Feature-Wünsche wie Backend, Accounts, Kategorien, Tags oder komplexe Benachrichtigungssysteme sind nicht Bestandteil dieses finalen Stands.
- Das Login ist nur ein Mock-Login.
- Es gibt keine echte Authentifizierung.
- Es gibt kein Backend.
- Es gibt keine zentrale Datenbank.
- Die Daten werden lokal im Browser gespeichert.
- Beim Löschen der Browserdaten können gespeicherte Daten verloren gehen.
- Die Anwendung ist für Demonstrations- und Projektzwecke gedacht.
- HTTPS wird im Deployment über Netlify bereitgestellt.

---

**Projekt:** Lernzeit-Manager
