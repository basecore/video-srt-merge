# Subtitle Studio

Installierbare, kostenlose Browser-App zum dauerhaften Einbrennen von SRT-Untertiteln in MP4-Videos. Video und Untertitel bleiben auf dem Gerät; FFmpeg und Schriftart werden beim Start von einem CDN geladen.

**Version:** 1.2.0 · **Datum:** 28.09.2026 · **Kontakt:** [basecore@gmx.de](mailto:basecore@gmx.de)

[Web-App](https://basecore.github.io/video-srt-merge/) · [Quellcode](https://github.com/basecore/video-srt-merge) · [Probleme melden](https://github.com/basecore/video-srt-merge/issues)

## Funktionsumfang

- MP4 und SRT auswählen: Der Export startet automatisch, anschließend steht ein MP4-Download mit fest eingebranntem Untertitel bereit.
- Auflösung Original, maximal 1080p/720p/480p ohne Upscaling; ursprüngliches Seitenverhältnis bleibt erhalten. Ausgabequalität CRF 19/23/27.
- Schriftgröße, Textfarbe (weiß/gelb), Kontur, oberer oder unterer Randabstand und Position.
- Zwei Vorschauen: zeitgesteuerte CSS-Live-Anzeige und exaktes FFmpeg-Beispielbild eines Frames mit derselben Auflösung und denselben Filterparametern wie beim Videoexport. Die nachfolgende H.264-Kompression kann die Darstellung geringfügig beeinflussen.
- Ausgabevideo abspielen und herunterladen, Fortschrittsanzeige und technisches Protokoll.
- PWA mit Manifest, Service Worker und professionellem SVG-Logo plus PNG-Icons in 192×192, 512×512 und maskierbarem 512×512-Format.

## Bedienung

1. [Web-App](https://basecore.github.io/video-srt-merge/) öffnen; optional unter **App installieren** als PWA installieren, falls der Browser den Installationsdialog anbietet.
2. Auflösung, Qualität und Schriftstil wählen, dann MP4 und SRT auswählen. Der Export startet automatisch.
3. In der Live-Vorschau zum passenden SRT-Zeitpunkt springen und bei Bedarf **Genaues Beispielbild berechnen** wählen. Für geänderte Einstellungen **Erneut exportieren** klicken.
4. Ausgabevorschau prüfen und die MP4 herunterladen.

## Veröffentlichung und Icons

GitHub Pages: **Settings → Pages → Deploy from a branch → main → /(root) → Save**. Alle PWA-Pfade sind relativ zu `/video-srt-merge/`; das Manifest startet die App mit `./`, nicht mit dem GitHub-Domain-Root.

Die SVG-Quelldatei `assets/logo.svg` ist direkt im Repository. Der Workflow `.github/workflows/build-icons.yml` erstellt aus dem Design per Pillow drei echte PNG-Dateien und committet sie auf `main`. Unter **Actions → Build PWA icons** prüfen, ob der Lauf erfolgreich war und die drei Dateien im Ordner `icons/` liegen. Ist Actions deaktiviert oder der Push durch Branch-Schutz blockiert, den Workflow nach Freigabe erneut ausführen oder `python -m pip install Pillow==11.3.0 && python scripts/generate_icons.py` lokal starten und die erzeugten PNGs committen. Ohne PNG-Icons kann die Installation in Chromium scheitern. Die Installieren-Schaltfläche erscheint nur, wenn der Browser `beforeinstallprompt` auslöst; sonst über das Browsermenü installieren.

## Technisches Konzept

GitHub Pages liefert statische HTML/CSS/JS-Dateien. `@ffmpeg/ffmpeg` 0.12.15 und der Single-Thread-Core `@ffmpeg/core` 0.12.10 werden über jsDelivr geladen; DejaVu Sans 2.37.3 liefert die Schrift. FFmpeg rendert SRT per libass in das Videobild und codiert mit H.264 neu. Die Vorschau eines Standbilds verwendet exakt dieselbe FFmpeg-Filterkette wie der Export (Skalierung vor Untertiteln). Die CSS-Live-Vorschau dient nur dem schnellen Sichten der Zeitstempel. Die Audiospur wird kopiert, sofern MP4-kompatibel.

Die PWA speichert die lokale Oberfläche zwischen, aber nicht den rund 30 MB großen FFmpeg-Core oder private Videos. Für Verarbeitung und erneutes Laden der CDN-Module ist weiterhin Internet erforderlich. Video und SRT werden nicht an einen Konvertierungsserver hochgeladen.

## Grenzen und Fehlerbehebung

- Mobilgeräte können bei langen oder hochauflösenden Videos an RAM-Grenzen stoßen. Ein exaktes Beispielbild eines späten Zeitpunkts kann wegen der Frame-Suche länger dauern.
- Nicht jede Eingabe-MP4 besitzt Browser-abspielbare Codecs oder eine MP4-kompatible Audiospur. Im letzteren Fall kann `-c:a copy` scheitern.
- FFmpeg-Filter können durch einzelne Browser oder CDN-Ladefehler ausfallen. Dann das technische Protokoll und die Browserkonsole prüfen, CDN-Freigabe testen und mit einem kurzen Clip erneut versuchen.
- Vor produktiver Nutzung sind PWA-Installation und der vollständige Export im Zielbrowser zu prüfen; ein automatisierter Browser-End-to-End-Test ist noch nicht vorhanden.

## Versionsverlauf

| Version | Datum | Änderung |
| --- | --- | --- |
| 1.2.0 | 28.09.2026 | PWA, Logo/Icon-Erzeugung, Auflösungs-/Stiloptionen und FFmpeg-Frame-Vorschau. |
| 1.1.1 | 28.09.2026 | ESM-Loader und Live-Vorschau. |
| 1.1.0 | 28.09.2026 | Fest eingebrannte Untertitel und neue Oberfläche. |
| 1.0.0 | 28.09.2026 | MP4 mit zuschaltbarer Untertitelspur. |

## Lizenz und Kontakt

Eigener Projektcode: [MIT](LICENSE). FFmpeg/ffmpeg.wasm und DejaVu Sans besitzen eigene Lizenzen. Kontakt: [basecore@gmx.de](mailto:basecore@gmx.de).