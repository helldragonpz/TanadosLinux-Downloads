# Tanados Media Creator 0.2.1 — 10 October 2026

Choose a USB and press **Create USB**. The app downloads the official Tanados
image, checks its published SHA-256, writes the USB and verifies the complete
copy. Windows/Linux users no longer need to find or download an ISO first.
The operating-system ISO remains Obsidian Tide 0.2.0.

Download the app from the [public site](https://helldragonpz.github.io/TanadosLinux-Downloads/#download)
or the [0.2.1 release](https://github.com/helldragonpz/TanadosLinux-Downloads/releases/tag/v0.2.1-media-creator).
See the [English guide](INSTALL.md) or [Bulgarian guide](INSTALL.bg.md).

- Automatic release discovery with an embedded known-release fallback.
- Resumable HTTPS download, progress, transfer speed and Pause download.
- Exact size and full SHA-256 checks before any USB operation.
- Cached images checked again before reuse; no repeat download for another USB.
- Explicit erase confirmation and repeated USB identity checks.
- Automatic, scoped Linux volume unmount after verification, without force.
- Full USB read-back verification; local ISO mode remains under an optional panel.
- Updated Windows ZIP, Linux DEB and portable archive, public guide and screenshots.

Validation completed:

- 23 Node tests: disk exclusions/identity drift/capacity, download/cache/resume,
  cancellation, dropped connections, corruption, HTTP failures, untrusted URLs,
  and the actual main-process download-to-writer workflow with OS boundaries replaced.
- A real anonymous download of all 6,446,008,320 ISO bytes, interrupted and
  resumed from the public mirror, matched the published SHA-256:
  `3602f03448608cad93cbcbde550769b542aa751ab6c78a8ec8b704ea980777eb`.
- Packaged Linux app launched with Chromium sandbox enabled, loaded the public
  release and rendered the automatic workflow with its primary action visible.
- The packaged app rejected a nonexistent USB before download or write.
- Isolated renderer checks covered selection, protected/small-device rejection,
  automatic source selection, progress and the visible action at three window sizes.

No physical USB was overwritten during this change. Native Windows writing and
physical PC/laptop installation remain hardware acceptance steps. The existing
0.2.0 ISO contains the older bundled app; use the 0.2.1 download to prepare USBs.
