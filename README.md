# Subtitle Studio

A free, installable web app that permanently burns SRT subtitles into MP4 video in the browser. No account or video upload to a conversion server.

**Version:** 1.3.0 · **Date:** 29 September 2026 · **Contact:** [basecore@gmx.de](mailto:basecore@gmx.de)

[Open the app](https://basecore.github.io/video-srt-merge/) · [Source code](https://github.com/basecore/video-srt-merge) · [Report a problem](https://github.com/basecore/video-srt-merge/issues)

## Workflow

1. Select an MP4 video and SRT subtitle file. Selection does **not** begin video processing.
2. Choose resolution (original, up to 1080p/720p/480p), CRF quality, font size, color, position, margin and black outline.
3. Scrub the fast live preview; optionally click **Render accurate sample frame**. That action renders one image with the same FFmpeg filter chain as the export and may take longer for a late frame.
4. Click **Burn subtitles & download MP4** below the sample-frame button when ready. After processing, inspect the output and download it. Changing settings hides an outdated sample frame; render it again to see new settings.

The language selector defaults to **English**. Choosing **Deutsch** translates the complete interface and status messages and persists the choice locally in the browser. A new browser without a stored choice starts in English. FFmpeg's raw technical log is not translated.

## Installation

The app is a GitHub Pages PWA. In the repository, enable **Settings → Pages → Deploy from a branch → main → /(root)**. Its manifest and service-worker URLs are relative to `/video-srt-merge/` rather than the GitHub domain root. The 192×192, 512×512 and maskable PNG app icons are stored under `icons/`. The **Install app** button appears only when the browser raises `beforeinstallprompt`; use the browser menu on other platforms. The local UI is cached, but loading FFmpeg modules and encoding still require an internet connection.

The vector logo is at `assets/logo.svg`. GitHub Actions workflow `.github/workflows/build-icons.yml` and `scripts/generate_icons.py` regenerate the PNG icons if the design changes. Verify the `icons/` directory remains present; without valid images, installation can fail in Chromium.

## Technology and privacy

The single-threaded FFmpeg.wasm core (`@ffmpeg/ffmpeg` 0.12.15 / `@ffmpeg/core` 0.12.10) loads from jsDelivr. DejaVu Sans is loaded from the same CDN. The SRT is rendered with libass and the output video is encoded as H.264; compatible audio is stream-copied. MP4 and SRT remain on the device. The CSS live preview is approximate; the optional sample frame uses FFmpeg, the selected scale and exact subtitle filter. H.264 compression may introduce minor differences from its PNG preview.

## Limits and troubleshooting

- Long/high-resolution videos can exceed browser memory, particularly on Android. Test with a short video first.
- Non-MP4-compatible audio can make `-c:a copy` fail. There is no automatic audio re-encode yet.
- If the installed app shows an old version, reload it and check the service worker. The external FFmpeg files are not precached.
- The browser has not been automatically end-to-end tested against all video codecs or platforms; validate the result with the output player and technical log.

## Releases

| Version | Date | Changes |
| --- | --- | --- |
| 1.3.0 | 2026-09-29 | Manual export below sample preview; default English plus persistent German switch. |
| 1.2.0 | 2026-09-28 | PWA, icon pipeline, scaling and accurate FFmpeg sample frame. |
| 1.1.1 | 2026-09-28 | ESM loader and timed SRT live preview. |
| 1.1.0 | 2026-09-28 | Burned-in subtitles and revised interface. |
| 1.0.0 | 2026-09-28 | Selectable subtitle track. |

## License

The app's own code is [MIT licensed](LICENSE). FFmpeg, FFmpeg.wasm and DejaVu Sans retain their own licenses.
