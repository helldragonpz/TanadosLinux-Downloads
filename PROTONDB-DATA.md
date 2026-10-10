# ProtonDB community data

Contains information from [ProtonDB](https://www.protondb.com/), made available
under the [Open Database License 1.0](https://opendatacommons.org/licenses/odbl/1-0/).
Individual database contents use the [Database Contents License](https://opendatacommons.org/licenses/dbcl/1-0/).
The derived database is the `community` section of `gaming-catalog.json` / `catalog.json`.
Tanados gameplay records are a separate collection and retain their own provenance.

- **Original:** [official ProtonDB export repository](https://github.com/bdefore/protondb-data).
- **Snapshot:** 2026-10-01, `reports_oct1_2026.tar.gz`.
- **Derived titles:** 31,276, from 395,467 source reports.
- **Method:** retain Steam titles with at least one successful non-native Proton
  report (`verdict: yes`). Count successful/total non-native reports, record the
  last report outcome, last success date and successful runtime family. This is
  **not ProtonDB's official medal calculation**.
- **Native reports:** excluded from these Proton counts; curated native games
  keep their independent entries.
- **Removed:** all report text, launch commands, usernames and system details.
- **Limits:** success can require tweaks; dates can be old, latest reports can
  fail, and hardware or anti-cheat updates can change compatibility. Linux and
  Steam Deck reports are not a Tanados desktop certification.

The complete derived database is freely downloadable in the public site's
[gaming-catalog.json](gaming-catalog.json). Its metadata includes the original
source URL, SHA-256, import date, snapshot date and license. Tanados never applies
launch flags or executes commands from community reports.

Reproduce the import from a checked-out Tanados source tree:

```sh
python3 tools/import-protondb.py reports_oct1_2026.tar.gz \
  --snapshot 2026-10-01 \
  --source-url https://raw.githubusercontent.com/bdefore/protondb-data/master/reports/reports_oct1_2026.tar.gz
node tools/sync-gaming-catalog.mjs
```

This is a bundled snapshot, not a live synchronization service. New source/site
and app packages need publication to distribute a refreshed snapshot. The ISO
remains a separately versioned artifact.
