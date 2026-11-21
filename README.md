# Leonida Ledger v5

[![make.fun](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/cffilham-jpg/makefun-gta6-trophy-guide-01-v5/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/cffilham-jpg/makefun-gta6-trophy-guide-01-v5/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01)

An independent GTA VI trophy ledger and tracker built around the supplied official trophy list, with cited guide steps and trophy-specific confidence notes.

## Run

Run `node serve.ts` and open `http://localhost:8080`.

## The ledger

- All 55 trophy names, descriptions and grades match the supplied official list; 28 hidden trophies are protected by spoiler mode.
- The guides contain 218 cited steps, including 175 steps with at least two distinct citations.
- All 20 source registry references are used in steps: 19 external pages and the local official kit list.
- A staged roadmap links assigned trophies, and each trophy has its own confidence note.

## Evidence limitations

Seventeen of the 19 external references were freshly read. KeenGamer and GAMES.GG are dossier-derived references without a successful fresh read; the local kit list is not a claim of a live PlayStation page fetch. Citations from the same publisher are not independent corroboration. Some triggers and methods remain unknown or disputed, including Fair Game and Bad Luck.

## Package and verify

Run `MAKEFUN_OUTPUT_DIR=out node main.ts` to package the entry in `out`. The recorded verification passed the browser checks and produced byte-identical dossiers across two builds; all four JPEG captures and their previews were visually inspected.

MIT licensed.
