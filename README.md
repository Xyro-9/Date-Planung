# Date-Planung

Eine kleine "Will You Go On A Date With Me?"-Seite für **date.eneselena.de**.

## Was die Seite macht

Mehrseitiger Flow, genau wie im Original-Beispiel:

1. **`/`** – "Will you go on a date with me?" mit YES/no-Button. Der "no"-Button
   weicht bei Hover/Tap aus und springt an eine zufällige Stelle.
2. **`/letter`** – "glad you didn't say no. be ready by 6, I'm coming to get
   you 🚗" + "ok I accept"-Button
3. **`/food`** – Auswahl-Grid für die Verabredung ("What are we feeling?")
4. **`/date`** – Tag/Uhrzeit auswählen ("So... when are you free?")
5. **`/yay`** – Bestätigungsseite mit Konfetti und Zusammenfassung
   (Essen/Tag/Uhrzeit aus den vorherigen Schritten)

Die Auswahl aus `/food` und `/date` wird per `localStorage` zwischengespeichert
und auf `/yay` als Zusammenfassung angezeigt.

Reine statische Seite (HTML/CSS/JS), keine Abhängigkeiten, kein Backend.
Jede Route ist ein eigener Ordner mit `index.html` (z. B. `/food/index.html`),
damit sie als saubere URL ohne `.html`-Endung funktioniert.

### Eigenes Foto einfügen

Auf der Startseite (`/`) wird `/photo.jpg` als Avatar angezeigt. Lege dafür
eine Datei `photo.jpg` im Projekt-Hauptordner ab. Ist keine Datei vorhanden,
wird automatisch ein 🐾-Platzhalter angezeigt.

## Lokal ansehen

Einfach `index.html` im Browser öffnen, oder z. B. mit:

```bash
python3 -m http.server 8000
```

und dann `http://localhost:8000` aufrufen.

## Deployment auf date.eneselena.de

Die Datei `CNAME` ist für **GitHub Pages** mit eigener Subdomain vorbereitet:

1. Repository-Settings → Pages → Branch für Pages auswählen (z. B. `main`, Ordner `/`)
2. Bei deinem Domain-Registrar (dort wo `eneselena.de` verwaltet wird) einen
   `CNAME`-Eintrag für die Subdomain `date` anlegen, der auf
   `<username>.github.io` zeigt (Subdomains brauchen keine `A`-Records, nur
   Apex-Domains)
3. In den Pages-Settings die Custom Domain `date.eneselena.de` eintragen und
   "Enforce HTTPS" aktivieren

Alternativ kann die Seite genauso einfach über Netlify oder Vercel deployt und
dort die Subdomain `date.eneselena.de` verbunden werden — es sind nur die drei
statischen Dateien (`index.html`, `style.css`, `script.js`) nötig.
