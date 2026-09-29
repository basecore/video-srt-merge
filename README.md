# Subtitle Studio

A free, installable browser app that burns SRT subtitles into MP4 videos. Files remain on your device; no account or conversion server is needed.

**Version:** 1.3.2 · **Date:** 29 September 2026 · **Contact:** [basecore@gmx.de](mailto:basecore@gmx.de)

[Open the app](https://basecore.github.io/video-srt-merge/) · [Source code](https://github.com/basecore/video-srt-merge) · [Issues](https://github.com/basecore/video-srt-merge/issues)

## Why this project exists

I use the free and open-source Android app [NewPipe](https://newpipe.net/) to save videos and SRT subtitles separately. I wanted to send a friend a single MP4 with subtitles already visible, without an extra SRT file or caption setting. Subtitle Studio turns those two files into one shareable video. Only save, modify and share videos when you have the relevant permissions.

## Workflow

1. Choose an MP4 and SRT. Selecting files never starts a conversion.
2. Choose original or a maximum of 1080p, 720p or 480p and CRF 19/23/27. By default, audio is stream-copied.
3. Expand **Subtitle appearance & timing** to choose font size, color, outline, position, margin and a signed subtitle offset from -10,000 to +10,000 milliseconds. Positive shifts the captions later; negative makes them earlier. Cues completely before time zero are omitted; the beginning of a partially overlapping cue is clamped to zero. The original SRT on disk is never changed. The offset applies equally to the live overlay, exact FFmpeg sample frame and video export.
4. Scrub the live video and optionally render one accurate FFmpeg sample frame. Then press **Burn subtitles & create MP4**. Press **Stop processing** while a frame or video is being rendered to abort it; a new job reloads FFmpeg.
5. If audio-copy export fails with an MP4 container/audio-tag error and **Retry with AAC audio if the copy-mode export fails** is enabled (default), the app removes the partial output and retries once using the native AAC encoder at 160 kb/s. It does not blindly retry video, subtitle or memory errors. The second attempt takes longer and may also fail if the required encoder is unavailable.
6. Review and download the result. Video is H.264; compatible audio is copied, otherwise the optional fallback attempts AAC.

English is the default language. Use the menu to switch to German; the choice persists locally. Raw FFmpeg log messages are not translated.

## PWA and privacy

Set GitHub Pages to **main / (root)** under Settings → Pages. The installed app uses relative URLs, an SVG logo, three PNG icons and a versioned service worker. The UI is cached, but FFmpeg and the DejaVu Sans font must be downloaded over the internet for processing. Video/SRT are processed locally, not uploaded to a conversion server.

## Technical limits

Single-threaded FFmpeg.wasm (`@ffmpeg/ffmpeg` 0.12.15 and `@ffmpeg/core` 0.12.10) with libass renders subtitles into each frame. Re-encoding can be slow or run out of browser RAM on long/high-resolution clips, particularly on Android. The live overlay is an approximation; a sample frame uses the same filter chain as export. A fixed offset corrects a constant sync error, not gradually drifting subtitles. Audio fallback is limited to recognizable container/audio-copy errors; test with a short clip. There is no automated browser end-to-end test.

## Future ideas

- Share the finished MP4 directly through the Android system share sheet, keeping download as a fallback for large files.
- Pair NewPipe MP4/SRT automatically by base filename when importing multiple files.
- Add an optional lightweight export preset for sending videos over messaging apps.

## Releases

| Version | Date | Changes |
| --- | --- | --- |
| 1.3.2 | 2026-09-29 | Signed SRT timing offset, automatic AAC fallback on audio-copy errors, collapsible subtitle settings. |
| 1.3.1 | 2026-09-29 | Cancel active FFmpeg jobs; NewPipe motivation. |
| 1.3.0 | 2026-09-29 | Manual export after sample preview and EN/DE interface. |
| 1.2.0 | 2026-09-28 | PWA, logo/icons and FFmpeg sample frame. |
| 1.1.1 | 2026-09-28 | ESM loader and timed preview. |
| 1.1.0 | 2026-09-28 | Burned subtitles. |
| 1.0.0 | 2026-09-28 | Selectable subtitle track. |

## AI assistance and license

Developed with AI assistance from Perplexity. The specific underlying model and reasoning mode cannot be independently verified, so no model-specific authorship is claimed. The project's own code is [MIT licensed](LICENSE); FFmpeg, FFmpeg.wasm and DejaVu Sans retain their licenses.

## Deutsch

**Motivation:** Mit NewPipe lade ich Video und SRT getrennt herunter. Subtitle Studio brennt die Untertitel in eine einzige MP4 ein, die ich einem Freund schicken kann.

**Neu in v1.3.2:** Unter „Untertitel: Aussehen und Zeitversatz“ die SRT um -10 bis +10 Sekunden verschieben. Positive Werte zeigen den Text später, negative früher. Bei einem passenden Audio-Kopierfehler wird optional einmal mit AAC-Ton neu exportiert. Das Originalvideo und die SRT bleiben unverändert. Der Abbrechen-Button stoppt laufende Verarbeitung.

**Kontakt:** [basecore@gmx.de](mailto:basecore@gmx.de).