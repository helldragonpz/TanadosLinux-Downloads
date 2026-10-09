# Install Tanados Obsidian Tide 0.2.0

This is the **0.2.0 preview for x86-64 PCs and laptops**. It includes Health,
Recovery, signed Updates, Laptop & Firmware, the shared Tanados app interface,
Lumi components, Tide/Copper/Glacier terminal themes and the GPU Resonance
visualizer. Aperture adds new portrait/landscape artwork with a transparent
audio-reactive halo. Physical PC/laptop installation, Secure Boot and native
Windows USB writing still need hardware testing.

## Download one complete ISO

Open **[the download page](https://helldragonpz.github.io/TanadosLinux-Downloads/)**
or the **[illustrated installation guide](https://helldragonpz.github.io/TanadosLinux-Downloads/install.html?lang=en)**.

Download **[the complete ISO](https://wow.tanados.com/downloads/tanados-linux/0.2.0/Tanados-Obsidian-Tide-0.2.0-amd64.iso)** and **[its SHA-256 file](https://wow.tanados.com/downloads/tanados-linux/0.2.0/Tanados-Obsidian-Tide-0.2.0-amd64.iso.sha256)** into one folder.
There is one operating-system image, not four editions. The primary download is
a single 6.45 GB file and needs no joining helper. Allow 10 GB free for the ISO
and Media Creator. Use NTFS, exFAT or a normal Linux filesystem; FAT32 cannot
hold this ISO. Choose Windows or Linux only to select the Media Creator package
for the system creating the USB. Downloads are public; no GitHub account is needed.

The source repository remains private. The GitHub Source code ZIP is not a
bootable operating system.

## Optional fallback: split GitHub download

If the primary download is unavailable, open **[the public GitHub release](https://github.com/helldragonpz/TanadosLinux-Downloads/releases/tag/v0.2.0-tide-preview)**
and download all four .iso.part01–04 files and the joining helper. These are
parts of the same single ISO. GitHub requires each release asset to be under
2 GiB, so this backup copy is split. Keep every part in one folder and allow
16 GB free for the parts and joined ISO.

On **Windows**, also download `Join-Tanados-ISO.ps1`. Open PowerShell in that
folder and run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\Join-Tanados-ISO.ps1
```

On **Linux**, also download `Join-Tanados-ISO.sh`. Open a terminal in that
folder and run:

```bash
bash ./Join-Tanados-ISO.sh
```

The helper joins and verifies the full published SHA-256 before saving
`Tanados-Obsidian-Tide-0.2.0-amd64.iso` and its `.sha256` sidecar. It never
writes to a USB or target disk. Choose the resulting **ISO**, not a part file,
in Media Creator. After successful verification you can delete the four parts. The checksum sidecar must stay beside the ISO.

## Files to send directly

Send these three files together:

- `Tanados-Obsidian-Tide-0.2.0-amd64.iso`
- `Tanados-Obsidian-Tide-0.2.0-amd64.iso.sha256`
- The Media Creator package for your friend's existing operating system:
  `Tanados-Media-Creator-0.2.0-Windows-x64.zip` or
  `Tanados-Media-Creator-0.2.0-Linux-amd64.deb`.

Send this guide too. The ISO is 6,446,008,320 bytes; use a
**16 GB or larger USB**. Keep the ISO and its `.sha256` in the same folder.
Media Creator currently opens a local ISO; it does not download one for you.

The expected ISO SHA-256 is:

```text
3602f03448608cad93cbcbde550769b542aa751ab6c78a8ec8b704ea980777eb
```

## Create the USB

On **Windows 10/11**, extract the whole ZIP, open its extracted folder and run
`TanadosMediaCreator.exe`. Keep all files beside the EXE. On **Ubuntu/Debian
Linux**, install the DEB through your package manager, then open **Tanados
Media Creator** from the application menu. A Linux portable tar archive is
also supplied for systems with working Chromium sandbox support.

On Ubuntu/Debian, installing from the download folder can also be done with:

```bash
sudo apt install ./Tanados-Media-Creator-0.2.0-Linux-amd64.deb
```

1. Plug in the USB and open Media Creator.
2. Choose the Tanados ISO. Wait for **Checksum matched**.
3. Select the USB. On Linux, unmount any mounted USB volumes first.
4. Choose **Create USB**, check the displayed model, serial and capacity,
   then confirm erasing that USB. **All files on that USB will be lost.**
5. Approve the operating system's administrator prompt. Keep the USB connected
   until the app finishes writing and verifying the full image.

The writer uses a raw image write and complete read-back verification.
If using Rufus instead, select **DD Image mode** when prompted. See
[the alternative writer instructions](INSTALLATION-MEDIA.md).

## Boot and install

1. Back up the destination computer's files. Connect laptops to power.
2. Turn **Secure Boot off** in firmware for this preview. Open the computer's
   boot menu and select the USB's **UEFI** entry.
3. Start the Tanados live desktop. Check the display, keyboard, networking and
   audio before installing.
4. Open **Install Tanados** and follow the guided installer. Review the
   destination disk carefully. **Erase disk deletes that disk's existing
   partitions and data.** Use the manual/preserve path when keeping another OS;
   that path is not covered by this release's clean-install test.
5. Finish installation, remove the USB when asked, and boot from the installed
   disk. If the Tanados boot menu appears, select its first entry. Sign in with
   the account you created in the installer.

Open **Tanados Appearance** to switch Tide, Copper or Glacier and choose your
interface and terminal fonts. **Auto Fit Monitors** in Control Center assigns
coordinated landscape and portrait wallpapers. For an integrated audio halo, open **Appearance → Aperture → Fit to leftmost
monitor** or **Fit to all monitors**. This selects matching portrait/landscape
artwork and places the transparent GPU widget over its portal. Right-click the
halo to configure intensity, colors, pause or reduced motion. Other desktop
widgets retain their positions. The previous scene is saved under
`~/.local/state/tanados/wallpaper-layout/backups/`. The regular **Tanados
Resonance** widget is also available from Plasma's widget menu. Lumi remains optional and off
until enabled by the user. The signed desktop preview update channel currently
requires access to the private source repository; APT system updates and the
public installation downloads do not require it.

If booting, graphics or installation fails, keep the installer log and report
the PC/laptop model, GPU, firmware mode and the failing step to the person who
sent you this preview. In the live session, the installer log is
`/root/.cache/calamares/session.log`; use administrator access to copy it before
shutting down the live session. Release-specific checks are recorded in
[the release evidence](releases/OBSIDIAN-TIDE-0.2.0.md).
