# Tanados Gaming Journey

Gaming Journey connects the compatibility checker, first boot, Game Library,
Game Studio, system updates and Lumi. The UI uses the selected KDE palette and
supports Bulgarian and English. The system helper is native Qt/C++; it does not
invoke a shell or require Python.

## The eight connected features

1. **Check before installing.** The website and Media Creator share a dated,
   bundled game catalog. Linux builds, proposed Proton routes, multiplayer
   limitations and actual Tanados tests are separate facts. Verified entries
   require a dated gameplay report, runtime, hardware, bilingual evidence and
   limitations. The 2026-10-10 inventory adds Mu Origins as observed working
   online, alongside seven other locally discovered titles with their actual
   evidence status. A shortcut, installation, launcher or process lifetime
   cannot confer gameplay verification. Filters expose verified, untested and
   unsupported titles. See [the test record](GAME-TESTS.md). Games outside the
   list are unverified, and selecting an unsupported title keeps an explicit
   warning visible even when filters hide its card.
2. **Resume first boot.** Gaming Setup has five stages: connection, devices,
   stores, games and play. Choices and progress persist after closing or
   restarting. Completing setup is an explicit action; unfinished hardware checks
   remain visible and can be reopened from the application menu.
3. **One play surface.** Game Library keeps its existing Steam, Heroic, Lutris,
   standalone, native and Proton routes. Setup opens the shared journey; each
   game's Check & profile opens its contextual diagnostic screen. Launches remain
   scoped to the selected installed route.
4. **Preserve reported working Proton settings.** The user saves a profile after
   personally testing the game. Steam mappings and Tanados-managed external
   Proton profiles can be restored, with an undo receipt for the current setting.
   Restore requires idle games, closed Steam, the same route and an installed
   runtime. It changes only the selected game. Other launchers keep managing their
   own settings. Game Studio Undo also preserves later changes to other games.
5. **Respect active games during updates.** System Hub checks tracked game units
   and Steam/Proton processes before applying system, desktop, Flatpak, Snap or
   firmware updates. The privileged helper independently checks the authorized
   desktop account using fixed system executables. An unavailable activity check
   blocks installation. Browsing releases and refreshing metadata remain usable.
   Signed channel packages download from the public distribution repository without
   a GitHub account. HTTPS redirects stay on GitHub asset hosts and every package
   must match the pinned Ed25519 key, channel, size and SHA-256.
   Existing Btrfs Recovery requirements remain in force; firmware is not covered
   by system snapshots.
6. **Reuse Windows Steam downloads.** Choose an already mounted Steam library,
   a detected game and a registered Linux library. Preview shows size, free space
   and filesystem. Copy requires Steam closed and enough free space; it rejects
   links, special files, overlapping folders and existing destinations. Source
   and preview are rechecked after copying. Publication cannot overwrite a racing
   destination. Windows prefixes and save files are preserved at their original
   location. Open Steam and verify the copied files. Publisher updates may still
   require downloading Linux-specific or changed files.
7. **Controller, sound and laptop setup.** Choose actual audio outputs and
   microphones, open KDE's device tests, inspect controllers, use Game Library
   couch mode or Steam Big Picture, and select an available power profile. The
   optional GPU economy setting pauses Resonance and Lumi's 3D rendering during
   tracked/Steam/Proton game activity; voice and conversation state remain intact.
   It restores rendering afterward and expires a stale watcher heartbeat.
8. **Lumi diagnoses observed evidence.** Say `diagnose game [title]` or
   `провери играта [име]`. Lumi uniquely matches the installed title and reads
   route readiness, file accessibility, Vulkan and the last tracked session's
   bounded error evidence. `fix game [title]` / `поправи играта [име]` opens that
   game's reviewed repair screen after confirmation. It does not run model-written
   commands or automatically change drivers, profiles or anti-cheat settings.

## The complete community catalog

The bundled checker contains 31,276 Steam titles with successful ProtonDB
reports (2026-10-01 snapshot), alongside dated personal Tanados gameplay records.
Search and 24-card pages keep the website, first boot and Media Creator usable.
The Proton community filter shows successes, total reports, dates and a latest
failure warning. A community report does not upgrade a title to personally
verified. See [data provenance and license](PROTONDB-DATA.md).

Game Library also finds conventional Steam libraries on already mounted media,
including Windows libraries. It labels unregistered libraries and read-only
storage, and does not treat Steam shortcuts as native Linux gameplay evidence.
No drives are automatically repaired and no Steam settings are changed by scans.

## Local state and support

`~/.local/state/tanados/gaming` contains setup progress, user-reported working
profiles, per-game restore receipts, bounded last-session evidence, import
receipts and locally exported support reports. Configuration files are written
atomically with owner-only access. The catalog is under
`/usr/share/tanados/gaming/catalog.json` or the corresponding user install path.

Support export includes structured diagnostics, not command arrays, account
configuration, environment variables or complete logs. Review the local report
before sharing. No report is uploaded automatically.

The session watcher is `tanados-gaming-session.service`, started by KDE autostart.
Activity detection covers Tanados tracked sessions and Steam/Proton environment
markers. Games launched through an unrelated application without either marker
may not be detected; close those before updating. Controller tests require the
actual device. Native/proposed Proton catalog routes require individual gameplay
and multiplayer acceptance on the target hardware.

## Build and validation

Build `tanados-gaming`, Welcome, Game Library, Game Studio, System Hub, Resonance,
Lumi renderer and assistant service from the normal CMake tree. No separate
runtime language is introduced. `gaming-workflows` exercises the real native
transactions in temporary homes; `native-gaming-update-guard` checks blocked and
unknown activity. Existing assistant, Game Library, Game Studio, Resonance,
Plasma QML and source-audit checks remain required.

Run `node tools/sync-gaming-catalog.mjs --check` to verify that the public website
and Media Creator contain exactly the same catalog and compatibility UI as the
source. Media Creator's USB write confirmation, device revalidation, image hash
and read-back verification remain unchanged.

A source push, a locally applied desktop build, a signed desktop package and an
ISO release are different artifacts. Release notes must identify which artifact
includes Gaming Journey; an older ISO does not acquire these changes merely
because the website or Media Creator is updated.


## Install the current catalog update

The public installer ISO remains **0.2.0**. **Media Creator 0.3.1** bundles the
community checker and automatically downloads that ISO. First boot and Game
Library receive the catalog through the signed **0.3.1 preview desktop update**.

1. Install Tanados from the [official download page](https://helldragonpz.github.io/TanadosLinux-Downloads/).
2. Close games and Steam before applying the desktop update.
3. Download [Tanados-Gaming-Journey-0.3.1-Linux-amd64.tar.gz](https://github.com/helldragonpz/TanadosLinux-Downloads/releases/download/v0.3.1-desktop-preview/Tanados-Gaming-Journey-0.3.1-Linux-amd64.tar.gz).
4. Extract it, open a terminal in `Tanados-Gaming-Journey-0.3.1`, then run:

```sh
bash Install-Tanados-Desktop.sh --verify preview
bash Install-Tanados-Desktop.sh --apply preview
```

The installer checks the pinned public key, Ed25519 manifest signature and
package SHA-256. Installation uses the standard administrator dialog and checks
for active games. The preview targets Tanados/Ubuntu 26.04 AMD64 with Qt 6.10.
Open **Gaming Setup** after updating. Setup supports Bulgarian and English.
The full ISO has not been rebuilt by this catalog update.

### Български

ISO остава **0.2.0**. Media Creator **0.3.1** включва новия каталог и сваля ISO
автоматично. След инсталация добави подписаното desktop обновяване **0.3.1
preview** от горния линк. Затвори игрите и Steam, разархивирай пакета и изпълни
двете команди за проверка и инсталация. После отвори **Gaming Setup**.
