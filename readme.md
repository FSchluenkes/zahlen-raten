
# Zahlen Raten

## Projektübersicht

"Zahlen Raten" ist ein webbasiertes Zahlenratespiel, das im Rahmen eines 4-wöchigen Teamprojekts entwickelt wurde. Das Spiel ist als barrierefreie Flask-Webanwendung mit einem React-Frontend implementiert.

### Spielregeln

- Der Computer denkt sich eine ganze Zahl zwischen 0 und 100 aus.
- Der Spieler muss diese Zahl erraten.
- Der Computer antwortet, ob die geratene Zahl zu groß oder zu klein ist.
- Spielername und Anzahl der Rateversuche werden in einer Datenbank gespeichert.
- Die Datenbank wird zu Beginn und Ende des Spiels ausgelesen und angezeigt.

## Projektdetails

- **Dauer**: 4 Wochen (4 Stunden pro Woche)
- **Startdatum**: 5. September
- **Abgabetermin**: XX.09
- **Präsentationsdatum**: XX.09
- **Teamgröße**: 3-4 Personen

## Technischer Stack

- **Backend**: Flask (Python)
- **Frontend**: React mit Next.js und NextUI
- **Datenbank**: SQLite3

## Einrichtungsanleitung

1. Repository klonen:
   ```
   git clone [repository-url]
   cd zahlen-raten
   ```

2. Backend einrichten:
   ```
   cd backend
   python -m venv venv
   source venv/bin/activate  # Unter Windows: `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

3. Frontend einrichten:
   ```
   cd frontend
   npm install
   ```


## Anwendung starten

1. Backend-Server starten:
   ```
   cd backend
   flask run
   ```

2. In einem neuen Terminal den Frontend-Entwicklungsserver starten:
   ```
   cd frontend
   npm run dev
   ```

3. Öffnen Sie einen Webbrowser und navigieren Sie zu `http://localhost:3000`

## Testen

Führen Sie Unit-Tests mit folgendem Befehl aus:
```
[Befehl zum Ausführen der Tests einfügen]
```

## Barrierefreiheit

Dieses Projekt wurde barrierefrei gestaltet. Wir haben folgende Funktionen implementiert:

- Semantisches HTML
- ARIA-Attribute
- Unterstützung der Tastaturnavigation
- Kompatibilität mit Screenreadern

So testen Sie die Barrierefreiheit:
1. Verwenden Sie die Barrierefreiheit-Tools des Edge-Browsers
2. Testen Sie mit Screenreadern (z.B. NVDA, JAWS, VoiceOver)
3. Stellen Sie sicher, dass die Navigation mit der Tastatur funktioniert

## Projektartefakte

- UML-Klassendiagramm: [Link oder Speicherort einfügen]
- ER-Modell: [Link oder Speicherort einfügen]
- Kostenkalkulation / Amortisationsrechnung: [Link oder Speicherort einfügen]

## Versionskontrolle

Dieses Projekt verwendet Git zur Versionskontrolle. Das Repository ist so strukturiert, dass es agile Entwicklungspraktiken unterstützt.

## Sicherheitsaspekte

- Implementierte Maßnahmen gegen SQL-Injection
- Sichere Speicherung von Passwörtern

## Präsentation

Die Abschlusspräsentation (5-10 Minuten) wird folgende Punkte abdecken:
- Projektartefakte
- Wichtige Entscheidungen
- Besondere Funktionen
- Kostenkalkulation
- Qualitätssicherungsmaßnahmen
- Live-Demo

## Mitwirkende

Frederik, Tobias, Lucas, Leon, Robin
