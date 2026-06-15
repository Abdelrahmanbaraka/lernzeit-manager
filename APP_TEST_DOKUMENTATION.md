# Lernzeit-Manager: App-Dokumentation fuer Tests

Diese Dokumentation erklaert, wie die App funktioniert und welche Bereiche du beim manuellen Testen pruefen kannst. Sie ist als praktische Hilfe fuer Tests gedacht, nicht als Ersatz fuer das README.

## 1. Zweck der App

Der Lernzeit-Manager ist eine reine Browser-App fuer Studierende. Nutzer koennen Lernziele erstellen, Lernzeiten planen, Lernzeiten erfassen und ihren Fortschritt auswerten.

Die App hat kein Backend und keine Datenbank. Alle Daten werden im Browser ueber `localStorage` gespeichert.

## 2. Start und Login

Die App startet auf der Login-Seite unter `/`.

Der Login ist ein Mock-Login. Nach erfolgreichem Login wird der Nutzer zum Dashboard weitergeleitet.

Wichtig fuer Tests:

- Login-Daten werden auf der Startseite nicht sichtbar angezeigt.
- Bei falschen Daten erscheint eine Fehlermeldung.
- Ohne Login sind die geschuetzten Seiten nicht erreichbar.
- Nach Logout landet der Nutzer wieder auf der Login-Seite.

Testaccounts laut Projektdokumentation:

| Rolle | Benutzername | Passwort |
|---|---|---|
| Student | `student` | `1234` |
| Tutor / Admin | `tutor` | `1234` |

## 3. Navigation

Nach dem Login gibt es eine Sidebar mit diesen Bereichen:

- Dashboard
- Ziele
- Lernplan
- Lernzeiten
- Fortschritt
- Profil

Alle diese Seiten sind geschuetzt und brauchen einen eingeloggten Nutzer.

## 4. Datenhaltung

Die Daten werden in `localStorage` gespeichert. Die Speicherung ist nutzerbezogen. Das bedeutet: `student` und `tutor` haben getrennte lokale Daten.

Gespeichert werden unter anderem:

- aktueller Nutzer
- Lernziele
- Monatsplanungen
- Tagesplanungen
- Lernsessions
- aktive Stoppuhr
- gesendete Benachrichtigungen

Wichtig fuer Tests:

- Daten bleiben nach Seitenwechsel erhalten.
- Daten bleiben nach Browser-Refresh erhalten.
- Daten koennen im Profil geloescht werden.
- Wenn Browserdaten geloescht werden, sind die App-Daten weg.

## 5. Dashboard

Das Dashboard ist die Uebersichtsseite nach dem Login.

Angezeigt werden:

- Begruessung mit Benutzername
- heutige Lernzeit
- aktive Ziele
- erledigte Ziele
- Stoppuhr
- Schnellzugriff zu wichtigen Seiten

Nicht mehr angezeigt wird:

- der Dashboard-Counter `Geplante Stunden`

Wichtige Tests:

- Dashboard laedt nach Login.
- Heutige Lernzeit aktualisiert sich nach gespeicherten Lernsessions.
- Anzahl aktiver Ziele stimmt.
- Anzahl erledigter Ziele stimmt.
- Der Counter `Geplante Stunden` ist nicht sichtbar.
- Schnellzugriff-Buttons fuehren zu den richtigen Seiten.

## 6. Ziele

Auf der Seite `Ziele` koennen Lernziele erstellt, bearbeitet, geloescht und als erledigt markiert werden.

Ein Lernziel hat:

- Name
- optionale Beschreibung
- Faelligkeitsdatum
- Status erledigt oder offen

Status-Anzeige:

- Gruen: erledigt
- Gelb: offen
- Rot: ueberfaellig

Wichtige Regeln:

- Zielnamen muessen eindeutig sein.
- Gross-/Kleinschreibung und Leerzeichen am Anfang oder Ende werden bei der Duplikatspruefung ignoriert.
- Beim Erstellen darf das Faelligkeitsdatum nicht in der Vergangenheit liegen.
- Heute und zukuenftige Daten sind erlaubt.
- Beim Bearbeiten duerfen alte vorhandene Ziele mit altem Datum geladen werden.
- Wenn beim Bearbeiten das Datum geaendert wird, muss das neue Datum heute oder zukuenftig sein.
- Erledigte Ziele bleiben sichtbar, wenn `Erledigte Ziele anzeigen` aktiviert wird.

Wichtige Tests:

- Neues Ziel erstellen.
- Ziel mit Beschreibung erstellen.
- Ziel ohne Beschreibung erstellen.
- Ziel mit Datum heute erstellen.
- Ziel mit zukuenftigem Datum erstellen.
- Ziel mit vergangenem Datum blockieren.
- Doppelten Zielnamen blockieren, z. B. `Mathe`, ` mathe ` und `MATHE`.
- Ziel bearbeiten.
- Ziel loeschen.
- Ziel als erledigt markieren.
- Erledigte Ziele anzeigen und ausblenden.

## 7. Lernplan

Die Seite `Lernplan` besteht aus Kalender und Monatsplan.

### Monatsplanung

In der Monatsplanung werden geplante Stunden pro Lernziel fuer einen Monat eingetragen.

Wichtige Regeln:

- Monatsplanung ist fuer den aktuellen Monat und die naechsten 5 Monate moeglich.
- Mehr als 10 Ziele pro Monatsplan sind erlaubt.
- Fuer jedes ausgewaehlte Ziel muessen geplante Stunden eingetragen werden.
- Monatsplanungen koennen bearbeitet und geloescht werden.
- `Stunden noch zu verplanen` zeigt, wie viele Monatsstunden noch nicht im Kalender verteilt sind.

Wichtige Tests:

- Monatsplan erstellen.
- Mehr als 10 Ziele auswaehlen.
- Geplante Stunden pro Ziel eintragen.
- Monatsplan speichern.
- Monatsplan bearbeiten.
- Monatsplan loeschen.
- Pruefen, ob Summe der geplanten Stunden stimmt.
- Pruefen, ob `Stunden noch zu verplanen` korrekt sinkt, wenn Tagesplanungen erstellt werden.

### Tagesplanung

Tagesplanungen verteilen geplante Lernzeit auf konkrete Kalendereintraege.

Wichtige Regeln:

- Tagesplanung ist nur fuer heute bis maximal 30 Tage in die Zukunft moeglich.
- Startzeit darf nicht in der Vergangenheit liegen.
- Endzeit muss nach Startzeit liegen.
- Ueberschneidende Tagesplanungen am selben Datum werden blockiert.
- Tagesplanungen koennen bearbeitet und geloescht werden.
- Tagesplanungen bleiben sichtbar, auch wenn ein Ziel erledigt oder geloescht wird.

Wichtige Tests:

- Tagesplanung ueber Button `Tagesplan erstellen` anlegen.
- Tagesplanung ueber `+` im Kalender anlegen.
- Datum innerhalb der naechsten 30 Tage auswaehlen.
- Datum ausserhalb der naechsten 30 Tage blockieren.
- Ungueltige Zeit blockieren, z. B. Ende vor Start.
- Ueberschneidung blockieren.
- Tagesplanung bearbeiten.
- Tagesplanung loeschen.

## 8. Lernzeiten

Auf der Seite `Lernzeiten` werden gespeicherte Lernsessions angezeigt. Lernzeiten koennen ueber die Stoppuhr oder manuell erfasst werden.

### Stoppuhr

Die Stoppuhr ist im Dashboard sichtbar.

Wichtige Regeln:

- Vor Start muss ein Ziel ausgewaehlt werden.
- Es kann nur eine Stoppuhr gleichzeitig laufen.
- Die Stoppuhr laeuft bei Navigation innerhalb der App weiter.
- Sessions unter einer Minute werden nicht gespeichert.
- Beim Stoppen wird eine Lernsession gespeichert.
- Ueberschneidende Lernzeiten fuer dasselbe Ziel werden blockiert.

Wichtige Tests:

- Stoppuhr ohne Ziel starten: Fehler erwartet.
- Ziel auswaehlen und Stoppuhr starten.
- Pausieren und fortsetzen.
- Seite wechseln und zurueckkehren.
- Stoppen und gespeicherte Session pruefen.
- Reset pruefen.
- Session unter einer Minute pruefen.

### Manuelle Lernsession

Manuelle Sessions werden ueber `Lernsession nachtragen` erstellt.

Felder:

- Datum
- Startzeit
- Endzeit
- Ziel

Wichtige Regeln:

- Alle Felder sind Pflicht.
- Endzeit muss nach Startzeit liegen.
- Ueberschneidende Sessions fuer dasselbe Ziel werden blockiert.
- Wenn fuer dasselbe Ziel eine passende Stoppuhr laeuft, wird die manuelle Erfassung blockiert.

Wichtige Tests:

- Gueltige manuelle Session speichern.
- Pflichtfelder leer lassen.
- Ungueltige Zeit blockieren.
- Ueberschneidende Session blockieren.
- Session loeschen.

## 9. Fortschritt

Die Seite `Fortschritt` zeigt Auswertungen fuer geplante und tatsaechlich gelernte Stunden.

Angezeigt werden:

- Monatsvergleich
- letzte 6 Monate
- Fortschritt pro Lernziel

Wichtige Berechnungsregeln:

- Monatsstunden sind die Hauptquelle fuer geplante Stunden.
- Tagesplanungen werden nur als Fallback genutzt, wenn es fuer ein Ziel in einem Monat keinen Monatsplan gibt.
- Tagesplanungen duerfen nicht doppelt zu Monatsstunden addiert werden, wenn ein Monatsplan existiert.
- Fortschritt pro Ziel wird aus gelernten Stunden im Verhaeltnis zu geplanten Stunden berechnet.

Wichtige Tests:

- Monatsplan erstellen und Fortschritt pruefen.
- Lernsession erfassen und Fortschritt pruefen.
- Pruefen, dass Monatsplan vor Tagesplanung gewinnt.
- Pruefen, dass Tagesplanung als Fallback funktioniert.
- Pruefen, dass erledigte und aktive Ziele angezeigt werden.
- Pruefen, dass Beschreibung in der Fortschrittsansicht erscheint.

## 10. Profil

Im Profil werden aktueller Benutzer und Rolle angezeigt.

Aktionen:

- Logout
- Daten loeschen

Wichtige Tests:

- Benutzername und Rolle pruefen.
- Logout fuehrt zur Login-Seite.
- Daten loeschen entfernt lokale Daten und fuehrt zur Login-Seite.
- Nach Datenloeschung sind Ziele, Planungen und Lernzeiten leer.

## 11. Responsive Tests

Responsive Tests werden manuell in Chrome DevTools gemacht, weil kein Playwright- oder Puppeteer-Setup vorhanden ist.

Zu pruefende Seiten:

- Dashboard
- Ziele
- Lernplan
- Lernzeiten
- Fortschritt
- Profil

Zu pruefende Breiten:

- 320 px
- 375 px
- 430 px
- 768 px
- 820 px
- 1024 px
- 1280 px

Erwartung:

- kein horizontaler Overflow
- keine kaputten Karten
- Buttons und Karten stapeln sauber auf Mobile
- Tablet-Layout wirkt nicht gequetscht
- Desktop-Layout bleibt normal
- Texte ueberlappen nicht

## 12. Empfohlene Test-Reihenfolge

1. App starten mit `npm run dev`.
2. Mit `student / 1234` einloggen.
3. Profil pruefen.
4. Neues Ziel erstellen.
5. Ziel-Datum heute, Zukunft und Vergangenheit testen.
6. Doppelten Zielnamen testen.
7. Monatsplan fuer das Ziel erstellen.
8. Tagesplanung fuer das Ziel erstellen.
9. `Stunden noch zu verplanen` pruefen.
10. Stoppuhr testen.
11. Manuelle Lernsession nachtragen.
12. Lernzeiten-Liste pruefen.
13. Fortschrittsseite pruefen.
14. Ziel als erledigt markieren.
15. Dashboard-Zaehler pruefen.
16. Responsive Tests durchgehen.
17. CSV/XLSX-Testprotokoll aktualisieren.

## 13. Testkonzept und automatische Pruefungen

Es gibt ein strukturiertes Testsetup fuer den finalen Sprint.

Automatisierte Kategorien:

- Automatisierte Quellcode-Pruefungen: statische Pruefungen von Quelltexten, keine Component-Tests
- Unit-/Logiktests: direkte Tests von Helper- und Utility-Funktionen
- Component-Tests: echte React-Komponenten-Tests mit Vitest, React Testing Library und jsdom
- Integrationstests: Zusammenspiel mehrerer Logikbereiche
- Regressionstests: Absicherung wichtiger finaler Sprint-Aenderungen und bestehender Kernfunktionen

Manuelle Kategorien:

- Manuelle UI-/E2E-Tests: Nutzerfluesse wurden manuell in der Anwendung geprueft
- Manuelle Responsive-Tests: Layouts wurden manuell ueber Chrome DevTools geprueft

Eine automatisierte Browser-Testumgebung wie Playwright oder Puppeteer ist aktuell nicht Bestandteil des Projekts.

Alle automatisierten Tests laufen ueber:

```bash
npm test
```

Einzelne Testteile:

```bash
npm run test:checks
npm run test:components
```

Weitere wichtige Befehle:

```bash
npm run lint
npm run build
```

## 14. Testprotokolle

Die finalen Testresultate liegen in:

```text
test-results-final-sprint.csv
test-results-final-sprint.xlsx
```

Die CSV ist fuer Excel mit Semikolon getrennt. Die XLSX-Datei kann direkt in Microsoft Excel geoeffnet werden.
