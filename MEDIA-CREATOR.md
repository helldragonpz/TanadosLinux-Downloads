# Tanados Media Creator 0.3.1

**Select a USB and choose Create USB.** Media Creator downloads Tanados automatically, verifies the published SHA-256, writes the image and checks the entire USB copy. Windows 10/11 and Linux packages are available on the **[public download page](https://helldragonpz.github.io/TanadosLinux-Downloads/#download)**. No GitHub account or separate ISO download is needed.

![Media Creator](media/media-creator.png)

Confirm the USB's exact model, serial number and capacity before proceeding; every file on it will be erased. The app checks its identity again after downloading and before writing. Administrator approval is requested only when the writer starts. Linux volumes on the selected USB are unmounted automatically without force; running system filesystems, fixed disks and unidentified devices remain blocked.

Downloads support HTTPS redirects, validated HTTP Range resumption, size checks and full SHA-256 verification. Pause download retains the partial image and does not change the USB. Retry Create USB after an interruption. Completed images are cached under the application's user-data images directory and checked again before reuse. Allow 10 GB free for the app and its 6.45 GB image.

The release is read from the public site's release.json over HTTPS. An embedded release descriptor lets the app offer its known release when the metadata check is unavailable. Only trusted download origins are accepted. Network and file operations run outside the sandboxed renderer; hashing runs in a worker. The renderer cannot supply download URLs or arbitrary image paths.

For an existing/offline ISO, open **Already have an ISO? Use a local file**. Keep the published .sha256 beside it. Without a sidecar the app displays Checksum calculated. Manual ISO downloads and split GitHub backups remain optional alternatives in the [installation guide](INSTALL.md).

Windows users extract the full ZIP and open TanadosMediaCreator.exe. The writer uses PowerShell 5.1 and validates USB bus, boot/system flags, serial and size. Ubuntu/Debian users install the DEB. A portable Linux archive is also supplied. Both writers use raw writes and full read-back verification to preserve the ISO's BIOS/EFI layout.

Build both packages with:

```sh
node tools/build-media-creator.mjs --output /absolute/build/media-creator
tools/package-media-creator.sh /absolute/build/media-creator /absolute/artifacts
```

The runtime is pinned to Electron 44.7.0. The window loads packaged content,
uses a sandbox and isolated preload, blocks navigation and new windows, and
checks IPC senders. The privileged writers remain separate from the GUI.
Inter's license and Electron's bundled notices are shipped with the packages.
The Linux DEB and ISO install Chromium's sandbox with its required root
ownership and mode; the production launcher does not disable sandboxing.

Download/resume/cancel/corruption handling, device guards, checksum parsing and the main-process workflow are tested with disposable fixtures.
Packaging and GUI rendering are separate from physical USB and native Windows
write validation; see the [0.2.1 Media Creator evidence](https://github.com/helldragonpz/TanadosLinux/blob/main/docs/releases/MEDIA-CREATOR-0.2.1.md)
for the checks actually completed. The window keeps its main action outside
the scrolling image/drive details. Native Wayland lets the compositor maximize
the workflow into the available desktop area. The installed VM reported a
work area larger than the usable space above its panel, so this path lets the
compositor determine the final bounds.

## Game compatibility before creating USB

Open **Will my games work?** before replacing Windows. The bundled catalog includes 31,276 Steam titles with successful ProtonDB reports
and 30 primary game records. It works offline and supports Bulgarian and English. It separates publisher
Linux availability, proposed Proton routes, multiplayer restrictions and
Tanados gameplay acceptance. Four titles have dated Tanados gameplay records: Mu
Origins was directly observed; Wukong, WoW and GTA V are owner-confirmed with their
known scope stated. Community reports have separate dates, counts and source
attribution, including warnings when a more recent report failed.
Selecting an unsupported game keeps a warning visible even after filtering.
Recorded sources and current ProtonDB reports open only through validated catalog links.
Search and 24-card pages keep the full catalog usable. See
[ProtonDB provenance and license](PROTONDB-DATA.md) and
[the 0.3.1 validation](GAMING-CATALOG-0.3.1.md).

Media Creator 0.3.1 currently downloads the accepted OS ISO **0.2.0**.
Gaming Journey is delivered as the separate signed **0.3.1 preview desktop
update**; follow the public Gaming Journey guide after installation.
The compatibility UI does not alter device selection or USB write safeguards.
