# Subtitle Studio

A free, installable browser app that permanently burns SRT subtitles into MP4 video. No account and no upload of video or subtitles to a conversion server.

**Version:** 1.3.1 · **Date:** 29 September 2026 · **Contact:** [basecore@gmx.de](mailto:basecore@gmx.de)

[Open the app](https://basecore.github.io/video-srt-merge/) · [Source code](https://github.com/basecore/video-srt-merge) · [Report a problem](https://github.com/basecore/video-srt-merge/issues)

## Why this project exists

I use the free and open-source Android app [NewPipe](https://newpipe.net/) to save a video and its SRT subtitles as separate files. I wanted to send a friend a single video with subtitles already visible, without asking them to load an extra subtitle file or switch captions on. Subtitle Studio lets me preview the SRT, burn it into the MP4 and share the resulting file. Use this workflow only for videos you have permission to save, modify and share.

## Workflow

1. Select an MP4 video and SRT subtitle file (for example, files obtained separately with NewPipe). Selection does **not** start processing.
2. Set maximum resolution (original / 1080p / 720p / 480p), CRF quality, font size, color, position, margin and outline. Inspect the approximate timed live overlay.
3. Optionally choose **Render accurate sample frame** to inspect one frame with the actual FFmpeg subtitle filter and export resolution. A late frame can take longer to render.
4. When ready, press **Burn subtitles & create MP4** below the sample frame, check the output and download it. Only this button starts the complete export.
5. During frame rendering or export, **Stop processing** aborts the active job and discards its partial output. You may change settings and start another job; the FFmpeg engine reloads after cancellation.

The app defaults to English. Use the language menu to switch to German; this preference is stored locally. Raw FFmpeg logs are not translated.

## PWA installation

Enable GitHub Pages under **Settings → Pages → Deploy from a branch → main → /(root)**. The manifest uses relative start and scope URLs for `/video-srt-merge/`. The repository includes an SVG logo plus 192×192, 512×512 and maskable PNG icons; `.github/workflows/build-icons.yml` can regenerate the icons. The install button appears when the browser offers `beforeinstallprompt`; otherwise use its menu.

The versioned service worker caches only the app shell, not user videos or the FFmpeg engine. Processing requires an internet connection for FFmpeg and DejaVu Sans. MP4 and SRT stay on your device.

## Technical notes and limitations

The app uses single-threaded FFmpeg.wasm (`@ffmpeg/ffmpeg` 0.12.15 and `@ffmpeg/core` 0.12.10). FFmpeg/libass renders the subtitle into each frame and H.264 re-encodes the video; compatible audio is stream-copied. The CSS live overlay is an approximation, while the optional FFmpeg sample frame uses the same scale and subtitle filter as export. A cancelled worker is terminated and recreated for the next job; partial results are not offered for download.

Long or high-resolution video can exceed browser RAM, particularly on Android. If the input audio is not MP4-compatible, stream copying may fail; automatic AAC fallback is not yet implemented. There is no automated end-to-end browser test; check a short clip and the resulting MP4.

## Ideas for future versions

- Direct Android sharing of the finished MP4 via the system share sheet, with download fallback for large files.
- Subtitle timing offset (positive or negative milliseconds) for SRT that starts too early or too late.
- Optional AAC audio fallback for inputs whose audio cannot be copied into MP4.
- Multi-file selection and matching MP4/SRT by base filename for repeated NewPipe downloads; add batch jobs only after memory handling is improved.

## Releases

| Version | Date | Changes |
| --- | --- | --- |
| 1.3.1 | 2026-09-29 | Cancel preview/export jobs; document NewPipe motivation and future features. |
| 1.3.0 | 2026-09-29 | Manual export below sample preview; English default and German switch. |
| 1.2.0 | 2026-09-28 | PWA, icons, resolution and style settings, FFmpeg sample frame. |
| 1.1.1 | 2026-09-28 | ESM loader and timed SRT live preview. |
| 1.1.0 | 2026-09-28 | Burned subtitles and redesigned interface. |
| 1.0.0 | 2026-09-28 | Selectable subtitle track. |

## AI assistance and license

This project was developed with AI assistance from Perplexity. A specific underlying model identity or reasoning mode is not independently verified, so no model-specific authorship claim is made. The project's own code is [MIT licensed](LICENSE); FFmpeg, FFmpeg.wasm and DejaVu Sans retain their own licenses.

## Deutsch

**Motivation:** Mit der freien Android-App NewPipe lade ich Video und SRT-Untertitel getrennt herunter. Um einem Freund eine einzige Datei mit sichtbaren Untertiteln schicken zu können, brennt Subtitle Studio den Text dauerhaft in die MP4 ein.

**Bedienung:** MP4 und SRT auswählen, Vorschau und Stil prüfen, optional ein genaues FFmpeg-Beispielbild berechnen und erst danach den Videoexport starten. **„Verarbeitung abbrechen“** beendet eine laufende Vorschau oder Konvertierung. Die Auswahl von Dateien startet keinen Export.

**KI-Hinweis:** Mit Unterstützung von Perplexity entwickelt; die genaue Modellbezeichnung ist nicht verifiziert. **Kontakt:** [basecore@gmx.de](mailto:basecore@gmx.de).