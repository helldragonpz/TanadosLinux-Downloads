# Obsidian Tide 0.2.0 preview evidence

The [public download page](https://helldragonpz.github.io/TanadosLinux-Downloads/)
provides Bulgarian/English installation guidance and release downloads without
GitHub authentication. Source remains in the private TanadosLinux repository.

## Artifact identity

- Payload source revision: `531b52a25f2f2fb79dc63e45f3fe0e9423890d09`.
- OS version: `0.2.0`; media label: `TANADOS_020`.
- ISO: `Tanados-Obsidian-Tide-0.2.0-amd64.iso`.
- Size: `6446008320` bytes.
- SHA-256: `3602f03448608cad93cbcbde550769b542aa751ab6c78a8ec8b704ea980777eb`.
- UEFI loader SHA-256: `2eaa6fe29e1a546d9c203b1c7f6834a33998d5c41c51a3c7673196fe8a7c8888`.
- Media Creator: `0.2.0`, Windows ZIP / Linux DEB / Linux portable archive.
- Desktop suite: `0.2.0~preview4`, Ed25519 signature and native verifier checked,
  installed on the owner workstation. Package SHA-256:
  `aac4992b57d40b5ca0bbb2e6d34f7665067e45c29c27bf1169c88a3adc125209`.

The cached Ubuntu build root was refreshed with every Tanados file mapping,
full native voice workers/assets/notices, current hooks, a rebuilt initramfs
and the reviewed GRUB EFI loader. The root filesystem was repacked and the
BIOS/UEFI hybrid image finalized. Media checksums are generated after copying
final boot/kernel/initramfs files. Earlier published 0.1.0 files are retained.

## Included changes

Health, bounded Recovery, signed Updates and Laptop & Firmware; shared UI across
13 native Tanados applications; current Lumi components; recent browser portal,
ALSA UCM and MOTD fixes; sandboxed Media Creator; and the Aperture halo scene.
Recovery remains optional and requires a supported Btrfs layout. It is not a
backup. Lumi is initially disabled.

Aperture uses separate original portrait/landscape images with a transparent
GPU widget placed over their portal. The owner workstation's left portrait
monitor was checked through Plasma geometry, live audio service data, GPU shader
status and a desktop capture. Existing hardware/assistant widgets retained their
positions. Appearance can apply it to the leftmost or all connected monitors.

## Checks

- Native CTest: **109/109 passed**, 96.40 seconds, including full production voice backends.
- Full SquashFS payload audit: passed, including current UI, source mappings, voice assets/notices, browsers, UCM, themes, Aperture and sandbox permissions.
- Hybrid image: BIOS/UEFI El Torito entries, primary ISO9660 GPT partition, dedicated EFI partition and pinned loader readback passed.
- Final ISO UEFI live boot: passed in an isolated 2-CPU / 4 GiB RAM VM.
- Linux joining helper: reconstructed all four final parts and matched the complete ISO SHA-256.
- GitHub release: `draft=false`, prerelease, 16 uploaded assets. Every size and API SHA-256 digest matched local files; the authenticated installation-guide download matched.
- Download UI: 1440 px and 390 px browser checks passed with four active part links, BG/EN switching, Windows/Linux packages and no horizontal overflow or JavaScript errors.
- Clean install and first disk-only UEFI boot: passed with a fresh user, Btrfs root/home, swap, no live account/autologin, correct sandbox permissions, a working Appearance window/catalog and a visible Brave browser.
- Public downloads: all four ISO parts were downloaded in full without authentication; individual hashes, total size and complete ISO SHA-256 matched. Windows/Linux Media Creator links returned matching package prefixes; the Bulgarian guide matched in full.
- Public GitHub Pages: exact deployed artwork, metadata, fonts license and installation guides matched. Desktop/mobile browser checks passed with active downloads, BG/EN and Windows/Linux selection, no horizontal overflow and no JavaScript errors.

Preview limits: physical PC/laptop installation, native Windows USB writing and
Windows ISO joining remain unvalidated. Secure Boot must be off. Dual boot,
encrypted installation and a complete recovery boot are separate acceptance
steps. The signed desktop preview channel still requires private repository
access; public installation downloads and APT system updates do not.

The source revision identifies the payload. Later documentation/website commits
record release hashes and download links without changing that image.
