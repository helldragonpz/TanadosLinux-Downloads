# Tanados game test records

Evidence reviewed: **2026-10-10**. Public records deliberately omit account data,
character names, credentials, complete logs and personal installation paths.
Installed launchers and desktop shortcuts are not gameplay tests. Multiple
clients of one game count as one catalog title.

| Game | Status | Evidence / scope |
| --- | --- | --- |
| Mu Origins | **Verified working; online** | Three live clients in the game world using GE-Proton11-5. |
| Black Myth: Wukong | Needs setup / retest | A Linux Steam/Proton session lasted about 48 minutes on September 12; later September 19 attempts ended within seconds. Current gameplay is unconfirmed. |
| Tanados WoW / WarcraftXL | Gameplay unverified | Client files, native launcher, Proton process confirmation and successful authentication/character-list records. |
| World of Warcraft (Battle.net) | Gameplay unverified | Battle.net / Proton Experimental profile; the retail client drive is currently unavailable. |
| Warcraft III: Reforged | Gameplay unverified | Standalone Proton profile; game executable currently unavailable. |
| Clair Obscur: Expedition 33 | Gameplay unverified | Linux Steam/Proton attempt on September 1 ended after about five seconds. |
| Hell is Us | Gameplay unverified | Steam library metadata and desktop shortcut; no confirmed Linux gameplay session in the inspected logs. |
| GTA V Enhanced — Story Mode | Gameplay unverified | Rockstar / Proton profile; launcher availability does not prove Story Mode. GTA Online remains a separate unsupported entry. |

The Steam library drive was not mounted during this inspection. No disk mounts,
filesystem repairs, driver changes, game restarts or changes to working Proton
profiles were performed. The initial 21 catalog games retain their previous
untested or unsupported status. Existing ISO and downloadable app releases are
separate artifacts; this catalog update does not rebuild them.

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

## How a title earns verified status

Record gameplay inside the game world or an actual playable level, its date,
runtime and hardware, then describe precisely what worked and what remains
untested. Owner-confirmed gameplay is labelled separately from directly observed
gameplay. Online success requires its own evidence. A native Linux release, an
installed executable, a Steam launch record, a long-running service or a saved
launcher profile alone leaves gameplay unverified. Regressions should add a
dated retest note instead of silently preserving a working claim.

## Български

Проверка на 10.10.2026: **Mu Origins е проверена и работеща онлайн**, с три
едновременно работещи клиента в игровия свят през GE-Proton11-5. По-ранен запис
показва пет отворени клиента; тук gameplay е потвърден само за първите три.

Другите намерени игри имат запис за наличните доказателства и остават за
gameplay проверка. При Wukong са открити и по-късни неуспешни стартирания.
Налична инсталация, launcher или shortcut не означава „проверена и работеща“.
Дискът със Steam библиотеката в момента е недостъпен. Не са извършвани
монтирания или промени по игрите и работещите Proton профили.
