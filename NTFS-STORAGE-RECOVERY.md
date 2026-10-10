# Tanados workstation NTFS recovery — 2026-10-10

Three attached data volumes failed writable mounting because they were dirty and
`$MFTMirr` record 3 differed from `$MFT`. Their initial read-only mounts restored
inventory access. The owner then explicitly authorized repair and writable mounts.

## Completed procedure

1. Identified every device by UUID and confirmed NTFS. Hash-verified selected
   metadata backups included boot-sector regions, MFT, MFT mirror, journal and
   bitmap. These are metadata backups, not copies of every personal file.
2. Confirmed no application held the mounted volume, then unmounted it normally.
3. Ran `ntfsfix --clear-dirty` once on the verified UUID device. While the volume
   remained unmounted, `ntfsfix --no-action` and `ntfs-3g.probe --readwrite` passed.
4. Mounted normally with `ntfs3`, `rw`, `nosuid`, `nodev`, the owner's UID/GID and
   `umask=022`. No forced mount, forced unmount or automatic repair loop was used.
5. Checked create/write/fsync/atomic rename/read/delete at all three mount roots
   and every previously affected installation directory: 13 successful checks.
6. Preserved the existing game disk's fstab entry and added UUID-based entries
   for the two other repaired disks. Entries use `nofail` and a ten-second device
   timeout. The original fstab was backed up, the replacement was validated, and
   systemd's generated mount units report active/mounted. Reboot was not tested.
7. With Steam closed, backed up both Linux `libraryfolders.vdf` files, preserved
   their existing records, and registered the discovered second Steam library.
   No installed files or Proton profiles were moved or replaced.
8. Refreshed Game Library: all ten formerly READ ONLY records now report READY;
   none remain READ ONLY. The three running Mu Origins clients remained alive.

The workstation-specific scripts, full logs and metadata backups stay local.
The existing allowlisted workstation repair helper can
inspect these volumes with `--check UUID`; repair requires explicit authorization.
It does not create metadata backups or boot entries. The reviewed recovery above
included those additional steps.

## Meaning of READY and remaining limits

READY confirms available installation files, launch commands, writable storage
and registration of Steam routes. It does not certify fresh gameplay, online
modes, FPS or all graphics settings. Existing gameplay evidence remains in
[the game records](GAME-TESTS.md).

`ntfsfix` is a limited metadata repair, not a full Windows `chkdsk`. The trigger
for the repeated dirty/mirror state was not established. If inconsistency
returns, a full Windows NTFS check is the next diagnostic step; do not mask it
with `ntfs3 force` or repeated background repairs.
