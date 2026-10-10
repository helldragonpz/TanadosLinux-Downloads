# Gaming Journey 0.3.0 preview — 10 October 2026

This release ships all eight connected gaming workflows as a signed desktop
update, plus Media Creator 0.3.0 and the shared website game checker. The accepted
public OS image remains **0.2.0**. Install that image, close games, then apply the
signed desktop update. The existing 0.2.0 ISO boot/install acceptance does not
constitute acceptance of a new ISO.

See [Gaming Journey](GAMING-JOURNEY.md) for behavior and limitations and
[Friends install](INSTALL.md) for the reviewed installation path.

## Validation

- 20 native workflow tests exercise real temporary-home VDF/profile/file-copy
  transactions, stale review rejection, no-overwrite publication, activity guards,
  saved state, bounded session evidence, redaction and local support export.
- Assistant action catalog, Game Library adapter, full assistant unit suite and
  assistant self-test passed. New game actions use the closed native catalog;
  managed context migration accommodates that catalog without changing external
  loopback choices.
- Welcome, Game Library and Game Studio self-tests passed. Privileged system
  policy tests, game update guard, public HTTPS update transport restrictions,
  native source audit and native scene contracts passed.
- Resonance protocol/visual tests and the Plasma widget QML suites passed.
- All five first-login stages loaded in an isolated home/bus through Qt's capture
  API. Settled previews used the shipped Tide palette. No live input injection.
- The website passed 390/768/1440-pixel browser checks in Bulgarian and English,
  including unsupported-game selection after filtering and reload.
- Media Creator passed the existing 23 USB/download tests and renderer checks at
  860/1060/1280 pixels. The packaged application checked the bundled 21 entries
  and refused an invalid USB and a source URL outside the catalog without writing
  any device. Chromium sandboxing stayed enabled.
- The local user overlay was applied with backups. Welcome opened visibly;
  Lumi, Resonance and the gaming watcher remained active. Existing monitor
  geometry, wallpapers and scene widget configuration survived the Plasma reload.

## Acceptance still needed

No catalog game is marked Tanados gameplay-verified. Publisher-native availability
and proposed Proton routes are separate from our own acceptance. Multiplayer,
controllers, battery behavior and performance need tests on each target computer.
Couch navigation in Game Library uses keyboard controls; Steam Big Picture is
the controller surface. Activity detection covers Tanados sessions and Steam/Proton
markers, not every independently launched game.

The privileged helper is included in the signed package. The local user overlay
updates the UI and user services without writing `/usr`; privileged enforcement
on that workstation takes effect after installing the signed package.
