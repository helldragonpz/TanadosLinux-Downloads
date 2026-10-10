# Install Tanados Obsidian Tide 0.2.0

Download **[Tanados Media Creator 0.3.0](https://helldragonpz.github.io/TanadosLinux-Downloads/#download)** for the Windows or Linux computer creating the USB.
**You do not need to download Linux first.** Media Creator downloads the official image, checks it, writes your USB and verifies the complete copy automatically.
Downloads are public and require no GitHub account. The OS image remains 0.2.0; Media Creator is 0.3.0.

See the **[illustrated installation guide](https://helldragonpz.github.io/TanadosLinux-Downloads/install.html?lang=en)**.
Use an x86-64 PC/laptop, a **16 GB+ USB**, an internet connection and **10 GB free** on the computer preparing it. Use NTFS/exFAT or a Linux filesystem for the cached 6.45 GB image; FAT32 cannot hold it.
Physical PC/laptop installation, Secure Boot and native Windows USB writing still need hardware testing.

## Open Media Creator

On **Windows 10/11**, extract the whole `Tanados-Media-Creator-0.3.0-Windows-x64.zip` and open `TanadosMediaCreator.exe`. Keep the other files beside the EXE.

On **Ubuntu/Debian**, install the DEB and open **Tanados Media Creator** from the application menu:

```bash
sudo apt install ./Tanados-Media-Creator-0.3.0-Linux-amd64.deb
```

A Linux portable archive is also available for systems with working Chromium sandbox support.

## Create the USB automatically

1. Plug in your USB and open Media Creator.
2. Select the flash drive by model, serial number and capacity.
3. Choose **Create USB** and confirm the displayed device. **All files on this USB will be erased.**
4. The app downloads Tanados and verifies its published SHA-256 automatically. **Pause download** preserves progress and leaves the USB unchanged. If interrupted, choose **Create USB** again to resume.
5. Approve the operating system's administrator prompt. On Linux the selected USB volumes are unmounted automatically, without force. Wait for writing and full read-back verification to finish.
6. When the app says **Your installation USB is ready**, safely eject it and continue below.

Internal/system disks, unidentified devices, undersized USBs and devices replaced during the operation are refused. Downloaded images are cached and checked again before reuse, so another USB does not need another download. Administrator approval is requested only for the USB writer.

## Optional: local ISO or offline preparation

If you already have an image, open **Already have an ISO? Use a local file** in Media Creator. Keep its `.sha256` beside it. For a friend's offline installation, send the ISO, sidecar and the Media Creator package together.

Manual download: **[complete ISO](https://wow.tanados.com/downloads/tanados-linux/0.2.0/Tanados-Obsidian-Tide-0.2.0-amd64.iso)** · **[SHA-256](https://wow.tanados.com/downloads/tanados-linux/0.2.0/Tanados-Obsidian-Tide-0.2.0-amd64.iso.sha256)**.
The one image is 6,446,008,320 bytes, with SHA-256:

```text
3602f03448608cad93cbcbde550769b542aa751ab6c78a8ec8b704ea980777eb
```

The optional **[GitHub backup](https://github.com/helldragonpz/TanadosLinux-Downloads/releases/tag/v0.2.0-tide-preview)** contains four parts of this same ISO because each GitHub asset must be below 2 GiB. If needed, download all parts and the joining helper into one folder with 16 GB free, then run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\Join-Tanados-ISO.ps1
```

Or on Linux:

```bash
bash ./Join-Tanados-ISO.sh
```

The helper joins and verifies the ISO; it never writes a disk. Open the resulting complete ISO through Media Creator's local-file option. The source-code ZIP is not a bootable image. If using Rufus instead, select **DD Image mode** when prompted.

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


## Gaming Journey 0.3.0 preview

Media Creator 0.3.0 includes the new game checker. The accepted ISO remains
**0.2.0**. All eight gaming workflows are available in the separate signed
**0.3.0 preview desktop update**. After installation, close games and follow
[the Gaming Journey guide](GAMING-JOURNEY.md).

Media Creator 0.3.0 включва новия каталог за игри. Провереният ISO остава
**0.2.0**. Осемте gaming функции идват с отделното подписано desktop обновяване
**0.3.0 preview**. След инсталацията затвори игрите и следвай
[ръководството Gaming Journey](GAMING-JOURNEY.md).
