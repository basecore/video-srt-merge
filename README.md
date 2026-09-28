# Subtitle Studio

Kostenlose Web-App zum **dauerhaften Einbrennen** von SRT-Untertiteln in MP4-Videos. Das Video wird im Browser verarbeitet; keine Anmeldung und kein Video-Upload auf einen Server.

**Version:** 1.1.1 · **Stand:** 28.09.2026 · **Kontakt:** [basecore@gmx.de](mailto:basecore@gmx.de)

[Web-App](https://basecore.github.io/video-srt-merge/) · [Repository](https://github.com/basecore/video-srt-merge) · [Issues](https://github.com/basecore/video-srt-merge/issues)

## Funktionen

- MP4 und SRT wählen; die Konvertierung startet automatisch, sobald beide Dateien vorhanden sind.
- Zeitgesteuerte Live-Vorschau der SRT über dem Originalvideo; Schriftgröße und Abstand live anpassbar. Die Browservorschau ist eine Annäherung an die Ausgabe, keine pixelgenaue FFmpeg-Vorschau.
- Feste Einblendung per FFmpeg-`subtitles`-Filter und libass. Ausgabe als H.264-MP4 mit nach Möglichkeit kopiertem Audio.
- Zwei Geschwindigkeitsprofile, Fortschritt, technisches Protokoll, Ausgabevorschau und Download.
- Responsive Benutzeroberfläche; Version, Datum, GitHub-Link und Kontakt im Footer.

## Benutzung

1. [Web-App](https://basecore.github.io/video-srt-merge/) öffnen und bei Bedarf Schriftgröße, Abstand und Kodiermodus auswählen.
2. MP4 und SRT laden. In der Live-Vorschau zum gewünschten Zeitpunkt springen und Darstellung überprüfen.
3. Browser-Tab während der automatischen Konvertierung offen lassen.
4. Ausgabevorschau prüfen und MP4 herunterladen. Für veränderte Einstellungen „Erneut konvertieren“ wählen.

## GitHub Pages

Im Repository **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save** wählen. Die `index.html` liegt im Repository-Root. GitHub Pages muss einmalig aktiviert werden; ein Commit allein schaltet Pages nicht ein.

## Architektur und Datenschutz

Die App verwendet die ESM-Variante von `@ffmpeg/ffmpeg` 0.12.15 und den Single-Thread-Core `@ffmpeg/core` 0.12.10. Der ESM-Worker und der ESM-Core werden als Modul geladen; dies ersetzt den fehlerhaften UMD-Worker, der auf GitHub Pages bei `blob:`-Core-URLs `Cannot find module` melden konnte. Der Single-Thread-Core erfordert kein `SharedArrayBuffer`. Die DejaVu-Sans-Schrift kommt ebenfalls über jsDelivr. JavaScript, WebAssembly und Schrift benötigen beim Laden Internetzugriff; ausgewählte MP4 und SRT werden lokal im Browser verarbeitet und nicht auf einen Konvertierungsserver hochgeladen.

FFmpeg rendert den Text per `subtitles=captions.srt:fontsdir=fonts` in jedes Videobild und kodiert das Video neu mit `libx264`. Untertitel sind anschließend nicht mehr abschaltbar. SRT wird als UTF-8 gelesen, bei ungültigem UTF-8 mit Windows-1252-Fallback.

## Grenzen und Fehlerbehebung

- Neucodierung ist rechen- und speicherintensiv. Auf Android können große Videos oder lange Filme am RAM scheitern; zuerst mit einem kurzen Clip testen.
- Wenn Module nicht laden: Browserkonsole, Netzwerkzugang und Blockierung des CDN prüfen; nach Deploy die Seite hart aktualisieren.
- `-c:a copy` funktioniert nur mit einer MP4-kompatiblen Audiospur; es gibt derzeit keine automatische AAC-Neucodierung.
- Live-Vorschau und FFmpeg-Ausgabe verwenden unterschiedliche Textrenderer. Für das endgültige Aussehen immer die exportierte MP4 überprüfen.
- DejaVu Sans deckt nicht alle Schriften und Emoji ab. Es gibt noch keinen automatisierten Browser-End-to-End-Test; der Anwender muss einen kurzen Testexport verifizieren.

## Versionen

| Version | Datum | Änderung |
| --- | --- | --- |
| 1.1.1 | 28.09.2026 | ESM-Loader statt UMD-Worker; Live-Untertitelvorschau und präzisere Fehlertexte. |
| 1.1.0 | 28.09.2026 | Fest eingebrannte Untertitel, neue GUI und Dokumentation. |
| 1.0.0 | 28.09.2026 | Erste Version mit zuschaltbarer Untertitelspur. |

## Lizenz und Kontakt

Eigener Projektcode: [MIT-Lizenz](LICENSE). FFmpeg/ffmpeg.wasm und DejaVu Sans behalten ihre eigenen Lizenzen. Fehler und Vorschläge über [Issues](https://github.com/basecore/video-srt-merge/issues) oder [basecore@gmx.de](mailto:basecore@gmx.de).
