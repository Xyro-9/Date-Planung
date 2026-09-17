# Date-Planung

Eine kleine "Will You Go On A Date With Me?"-Seite für **date.eneselena.de**.

## Was die Seite macht

- Frage mit "Yes" / "No" Button
- Der "No" Button weicht bei Hover/Tap aus und springt an eine zufällige Stelle,
  dabei wird der "Yes" Button mit jedem Versuch etwas größer
- Nach "Yes" gibt es eine Konfetti-Animation und eine kleine Bestätigungsseite
- Schwebende Herz-Animation im Hintergrund

Reine statische Seite (HTML/CSS/JS), keine Abhängigkeiten, kein Backend.

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
