# Subtitle Studio

Kostenlose, browserbasierte Web-App zum dauerhaften Einbrennen einer SRT-Untertiteldatei in ein MP4-Video. Keine Anmeldung und kein Upload der Videodatei auf einen Server.

**Version:** 1.1.0 · **Stand:** 28.09.2026 · **Kontakt:** [basecore@gmx.de](mailto:basecore@gmx.de)

- [Web-App](https://basecore.github.io/video-srt-merge/) (nach Aktivierung von GitHub Pages)
- [GitHub-Repository](https://github.com/basecore/video-srt-merge)

## Funktionen

- MP4 und SRT lokal auswählen; nach Auswahl beider Dateien automatischer Start.
- SRT-Untertitel werden mit FFmpeg/libass in jedes Videobild gerendert (Hardcoding, keine zuschaltbare Spur).
- MP4-Ausgabe mit H.264-Video und nach Möglichkeit unverändert kopierter Audiospur.
- Anpassbare Schriftgröße, unterer Abstand, zwei Encoder-Presets, Statusanzeige, Protokoll, Videovorschau und Download.
- Responsive Oberfläche für Desktop und mobile Browser.

## Benutzung

1. Die Web-App öffnen.
2. Optional Schriftgröße, Abstand und Kodierung einstellen.
3. Eine `.mp4`-Videodatei und eine `.srt`-Datei wählen. Sobald beide vorliegen, startet die Verarbeitung automatisch.
4. Den Browser-Tab offen lassen und anschließend „MP4 mit eingebrannten Untertiteln herunterladen“ anklicken.
5. Für geänderte Optionen „Erneut konvertieren“ wählen.

Der Untertiteltext ist danach dauerhaft sichtbar und lässt sich nicht ausblenden. UTF-8-SRT wird bevorzugt; bei ungültigem UTF-8 versucht die App Windows-1252. Die Ausgabe ist nicht verlustfrei, weil das Bild zur Einblendung neu kodiert werden muss.

## GitHub Pages veröffentlichen

`index.html` und `README.md` gehören direkt in den Repository-Root. Im Repository unter **Settings → Pages → Build and deployment** die Quelle **Deploy from a branch**, Branch **main**, Ordner **/(root)** auswählen und speichern. Danach lautet die URL `https://basecore.github.io/video-srt-merge/`. Die Pages-Veröffentlichung muss der Eigentümer des Repositorys aktivieren; der Code-Commit allein veröffentlicht keine Webseite.

## Technik und Datenschutz

Die App ist statisches HTML/CSS/JavaScript und verwendet `@ffmpeg/ffmpeg` 0.12.15 sowie den Single-Thread-Core `@ffmpeg/core` 0.12.10. Der `subtitles`-Filter nutzt libass und eine DejaVu-Sans-TTF-Schriftart. Diese Bibliotheken und die Schrift werden beim ersten Start über jsDelivr geladen. Die ausgewählten Video- und SRT-Dateien verarbeitet FFmpeg.wasm lokal im Browser; sie werden nicht an GitHub oder einen Konvertierungsserver hochgeladen. Für den Download der Bibliotheken/Schrift wird jedoch das CDN kontaktiert.

Der Core wird ohne Multi-Threading geladen und benötigt kein `SharedArrayBuffer`. Das FFmpeg-Verfahren entspricht im Kern:

```bash
ffmpeg -i input.mp4 -vf "subtitles=captions.srt:fontsdir=fonts" -c:v libx264 -crf 23 -preset ultrafast -pix_fmt yuv420p -c:a copy output.mp4
```

## Grenzen und Fehlerbehebung

- Neucodierung ist wesentlich langsamer als ein bloßes Zusammenfügen von Dateien. Insbesondere auf Android können große oder lange Videos wegen Browser-RAM und thermischer Drosselung scheitern. Mit einem kurzen MP4 testen.
- Wenn FFmpeg nicht geladen werden kann: Internetverbindung, CDN-Sperre und Browserkonsole prüfen.
- Falls eine MP4 eine nicht MP4-kompatible Audiospur enthält, kann `-c:a copy` fehlschlagen; derzeit gibt es keine automatische Audiokonvertierung.
- Nicht jede Schrift deckt jede Schrift ab; DejaVu Sans unterstützt viele europäische Zeichen, aber keine vollständige CJK-/Emoji-Abdeckung.
- Eine erfolgreiche Verarbeitung im Zielbrowser ist vor Veröffentlichung mit einem kleinen Testvideo zu prüfen; es gibt keine serverseitigen Tests.

## Entwicklung und Releases

Version und Datum werden in `index.html` im Header und Footer sowie hier in der README gepflegt. Änderungen per Commit auf `main` veröffentlichen; die GitHub-Pages-Quelle muss einmalig aktiviert sein.

| Version | Datum | Änderung |
| --- | --- | --- |
| 1.1.0 | 28.09.2026 | Festes Einbrennen der Untertitel, neue Oberfläche, Vorschau und Dokumentation. |
| 1.0.0 | 28.09.2026 | Erste Version mit zuschaltbarer Untertitelspur. |

## Lizenz und Kontakt

Der eigene Projektcode steht unter der [MIT-Lizenz](LICENSE). FFmpeg, FFmpeg.wasm und DejaVu Sans unterliegen ihren jeweils eigenen Lizenzen; die MIT-Lizenz des Projektcodes ersetzt diese nicht. Fragen und Fehlermeldungen: [basecore@gmx.de](mailto:basecore@gmx.de) oder [GitHub Issues](https://github.com/basecore/video-srt-merge/issues).
