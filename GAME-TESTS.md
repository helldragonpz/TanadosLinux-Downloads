# Tanados game test records

Evidence reviewed: **2026-10-10**. Records omit account details, character names,
credentials, full logs and personal paths. An installed launcher is distinct from
successful gameplay. Owner-confirmed gameplay is explicitly identified.

| Game | Status | Evidence / scope |
| --- | --- | --- |
| Mu Origins | **Verified working; online** | Directly observed: three clients in the game world through GE-Proton11-5. |
| Black Myth: Wukong | **Verified working; owner-confirmed** | The owner explicitly confirmed successful Steam gameplay; saved Linux Steam sessions include about 48 minutes on September 12. |
| World of Warcraft | **Verified working; owner-confirmed** | Owner reports working WoW. The played edition, server and exact Proton version were not specified. |
| Grand Theft Auto V | **Verified working; owner-confirmed** | Owner reports working GTA V; Enhanced files and a Proton profile are installed. The mode and exact gameplay version were not specified. **This does not certify GTA Online.** |
| Tanados WoW / WarcraftXL route | Specific route unverified | Client files, native launcher, Proton process and authentication/character-list records; the generic owner report does not identify this route. |
| Warcraft III: Reforged | Gameplay unverified | Installed executable and standalone Proton profile found. |
| Clair Obscur: Expedition 33 | Gameplay unverified | Installed Steam files; a previous launch ended after about five seconds. |
| Hell is Us | Gameplay unverified | Installed Steam files and shortcut; no gameplay was observed during this review. |
| Valheim | Gameplay unverified | Installed files and manifest found in a second, Windows Steam library. |

## Storage and catalog scope

Three physically present NTFS volumes refused normal writable mounting: all were
marked dirty and their `$MFTMirr` record 3 differed from `$MFT`. They are accessible
through read-only mounts for inventory. Hash-verified copies of selected metadata
were saved locally; repairs and writable mounting await explicit owner approval.
No active Mu Origins client or working Proton profile was restarted or modified.

The catalog also bundles **31,276 titles with successful ProtonDB reports**, from
the official **2026-10-01** export. These are community reports from Linux/Steam
Deck systems, not personal Tanados tests or a promise about every hardware setup.
Each title displays report counts, the last successful report date, the runtime
family and a warning if the latest report failed. Some reports are old or require
tweaks; check the linked current reports before purchasing or replacing Windows.

The website, first-boot checker and Media Creator show at most 24 cards per page.
Community data is available offline in the bundled catalog and attributed under
ODbL. See [ProtonDB data provenance](PROTONDB-DATA.md).

## Mu Origins

- **Test date:** 2026-10-10.
- **Evidence type:** observed gameplay on the owner's running Tanados desktop.
- **Runtime:** GE-Proton11-5 through umu and the existing Tanados MuOrigin profile.
- **System:** Tanados Obsidian, KDE Wayland, GeForce RTX 3090, NVIDIA 595.91.07,
  Linux 7.0.0-31-generic.
- **Observed:** three live `main.exe` processes; all three game windows exposed
  character level and reset state, indicating they were past the launcher and
  character selection. Their process environments identified the GE runtime.
- **Multiple clients:** an earlier saved verification on the same day recorded
  five open clients. At this review, the original three remained running and
  in the game world. Slots four and five were not observed in gameplay here.
- **Scope:** this specific Mu Origins client/server and the existing working
  profile. This is not a claim about every MU Online server, the mobile MU Origin,
  or official vendor Linux support.
- **Limits:** no fresh close/reopen or reboot test, FPS benchmark, controller
  acceptance, exhaustive game-mode test or guarantee for future client and
  anti-cheat updates. No active client was closed or modified.
- **Game website:** [Mu Origins](https://mu-origins.com/).


## Black Myth: Wukong

- **Recorded:** 2026-10-10; **owner-confirmed gameplay**.
- The owner explicitly stated they own it on Steam and it works on Tanados.
- Saved Linux Steam/Proton sessions independently confirm prior launches,
  including approximately 48 minutes on 2026-09-12. Short later launch records
  do not overrule the owner's gameplay confirmation or establish incompatibility.
- Exact gameplay Proton version, FPS, settings and a fresh gameplay observation
  were not recorded. Drive availability is tracked separately from compatibility.

## World of Warcraft

- **Recorded:** 2026-10-10; **owner-confirmed gameplay**.
- The owner listed WoW among games working on their Tanados desktop.
- Retail client files, Tanados WoW copies and existing Proton routes are present.
- The message does not identify the played client edition, server or modes. This
  general record therefore does not certify every retail/private-server route.
- No fresh login/gameplay, exact runtime version or FPS benchmark was recorded.

## Grand Theft Auto V

- **Recorded:** 2026-10-10; **owner-confirmed gameplay**.
- The owner listed GTA V among their working games. Local files identify an
  Enhanced installation and an existing Rockstar/Proton Experimental route.
- The played edition/mode and exact gameplay runtime were not recorded. A new
  Story Mode session was not observed. GTA Online remains a separate unsupported
  entry; no anti-cheat bypass or successful online claim is made.

## Evidence policy

A working claim needs a dated gameplay observation or an explicit owner report.
Record runtime and hardware when known and mark unknown details plainly.
Installed files and launch records add inventory evidence but cannot establish
FPS, every-mode compatibility or online success. Community reports are displayed
with their source and date; they never become a personal Tanados verification.

## Български

Wukong, World of Warcraft и GTA V са добавени като работещи с потвърждение от
собственика на 10.10.2026. За WoW и GTA не са посочени конкретните издание и
режим; не обявяваме GTA Online за работещ. Mu Origins е наблюдавана пряко с три
клиента в игровия свят. Допълнително има 31 276 заглавия с успешни ProtonDB
отчети, ясно обозначени като данни от общността, с дата и ограничения.
