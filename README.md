# Date-Planung

Eine kleine "Will You Go On A Date With Me?"-Seite für **eneselena.de**.

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

## Deployment auf eneselena.de

Die Datei `CNAME` ist für **GitHub Pages** mit eigener Domain vorbereitet:

1. Repository-Settings → Pages → Branch für Pages auswählen (z. B. `main`, Ordner `/`)
2. Bei deinem Domain-Registrar einen `CNAME`-Eintrag von `eneselena.de` auf
   `<username>.github.io` setzen (bzw. laut GitHub-Pages-Doku für Apex-Domains
   die passenden `A`-Records eintragen)
3. In den Pages-Settings die Custom Domain `eneselena.de` eintragen und
   "Enforce HTTPS" aktivieren

Alternativ kann die Seite genauso einfach über Netlify oder Vercel deployt und
dort die Domain `eneselena.de` verbunden werden — es sind nur die drei
statischen Dateien (`index.html`, `style.css`, `script.js`) nötig.
