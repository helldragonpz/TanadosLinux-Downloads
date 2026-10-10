# Tanados Gaming Catalog 0.3.1 preview

- Corrects Black Myth: Wukong to owner-confirmed working Steam gameplay.
- Adds owner-confirmed WoW and GTA V records with unknown editions/modes stated.
  GTA Online remains unsupported. Mu Origins retains its directly observed
  three-client online gameplay record.
- Bundles 31,276 Steam titles with successful ProtonDB reports from the official
  2026-10-01 export, with attribution, dates, counts and latest-failure warnings.
- Adds search, Proton community filtering and 24-card pages to the website,
  Media Creator and first-boot checker.
- Discovers conventional Steam libraries on already mounted drives, including
  Windows libraries. Shows unregistered libraries and read-only filesystems;
  Steam shortcuts are classified as Steam routes rather than native games.
- Ships Media Creator 0.3.1 (Windows/Linux) and the signed 0.3.1 preview desktop
  update. The installer ISO remains 0.2.0.

## Installation

Download Media Creator from the [official site](https://helldragonpz.github.io/TanadosLinux-Downloads/).
For an existing Tanados installation, close games/Steam and install the
[signed desktop bundle](https://github.com/helldragonpz/TanadosLinux-Downloads/releases/download/v0.3.1-desktop-preview/Tanados-Gaming-Journey-0.3.1-Linux-amd64.tar.gz).
See [Gaming Journey](GAMING-JOURNEY.md) for signature verification and commands.

## Validation of these changes

- Native gaming workflows: 22 tests passed, including malformed community
  report rejection and separation of reports from personal gameplay verification.
- Native Game Library self-test passed, including an offline Steam shortcut.
- Media Creator: 23 download, resume, identity and USB workflow tests passed.
- Public checker: BG/EN at 390/768/1440 px; search, pagination, selected-game
  persistence, community failure notes and rejection of eight invalid gameplay
  claims. No page errors or horizontal overflow.
- Native Welcome and Game Library previews loaded; real KDE palette and actual
  library UI captured. Existing running Mu Origins clients were preserved.
- Both packaged apps contain the exact reviewed catalog, UI and ODbL notice;
  Windows executable version metadata is 0.3.1. The Linux IPC check accepts
  recorded game/report URLs and rejects unrelated URLs.
- Desktop Ed25519 signature and package checksum verified using the shipped
  installer. This is an application/catalog update, not a new ISO boot test.

Windows application launch and physical USB writing were not repeated for this
catalog update. Community reports do not certify online modes, FPS or every PC.
