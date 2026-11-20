# Leonida Ledger v5 — evidence record

Written for this entry on 20 November 2026. The authorized source base is the supplied
trophy-v5-sources.md dossier: 43 read sources, approximately 273 citable facts, and explicit
unknowns. All guide prose here was written afresh; no previous entry files were imported.
Official trophy names, descriptions and grades are the only intentionally verbatim text.

## Citation numbering and provenance

The app registers 19 external pages plus the local official kit list, numbered anew.
[1] is that local list, not a claim that PSNProfiles was fetched successfully.
[2] PowerPyx trophy guide; [3] GTABase; [4] KeenGamer; [5] eGamers trophy list;
[6] PowerPyx walkthrough; [7] GAMES.GG missions; [8] OutputLag walkthrough;
[9] Game-Checklists missables; [10] OutputLag missables; [11] PowerPyx meditation;
[12] PowerPyx shooting ranges; [13] PowerPyx drone trials; [14] PowerPyx races;
[15] PowerPyx challenges; [16] OutputLag activities; [17] OutputLag robberies;
[18] Beebom UFO; [19] eGamers gang operations; [20] PowerPyx 100% checklist.
URLs and per-trophy coverage are inspectable in the app's source matrix.

Fresh HTTP reads during this build returned article content for [2], [3], [5], [6],
[8], [9], [10], [11], [12], [13], [14], [15], [16], [17], [18], [19] and [20].
These reads corroborated the range venue/course distinction, drone rules, race thresholds,
post-story checklist, chapter-boundary losses, gang valuables and UFO method.
Article-body excerpts were read separately where pages had long navigation menus.

## Failed attempts and inherited research

KeenGamer [4] and GAMES.GG [7] returned blocked/terminated responses in Node fetch attempts,
including ?read=1; Python urllib retries returned HTTP 403. They are dossier-derived references:
the supplied dossier records full browser reads of both. No successful fresh read is claimed.
Game-Checklists first returned HTTP 466, then returned the missables article on retry.
The dossier records PSNProfiles blocked and Exophase unattempted. Neither is counted as a
freshly read external source or fabricated proof of official-list verification.

## Decisions and uncertainties

- Chapter-title trophies describe the next chapter; completion notifications can arrive late.
- Final mission: Chapter 5, The End of the Road. The trophy page's Chapter 4 label conflicts
  with its own walkthrough; the app shows both claims and the verdict.
- Two shooting-range venues contain 12 courses and 42 golds. Twelve is not a venue count.
- Meditation: trophy 18 sessions, checklist 15. The Chapter 1 balcony session might be needed;
  accept it before Tourist Trap and retain that save.
- Yago's hourglass in Chapter 3 is a timed risk. The stage-5 sweep is not advice to postpone
  it. Shayna's Chapter 4 call should also be answered immediately.
- Only Kirk, Kyle, Yago and Pilot Pete are securely identified counting stranger strands.
  Four other qualifying strands remain unknown. We do not invent them.
- Kirk's final-hunt character restriction conflicts across supplementary dossier pages.
  We do not prescribe a character for that final hunt.
- Randy's 16-delivery trophy counter is not equated with the supplementary 18-car wish list.
- Cocktail, showroom and bike-kick methods remain single-source leads against three
  unconfirmed listings. The UFO has two detailed reports but still conflicting listings.
- Fair Game's animal and Bad Luck's trigger are unknown. No chapter or guaranteed spawn is
  invented. A first deer hunt is not asserted to unlock Fair Game.
- WAiNK's unnamed set size, the Others gang group's necessity, the bowling safe code and
  chapter gates for ranges, airport departure and gang operations remain unstated.
- Shared-publisher citations count toward the labelled multi-citation figure, but are not
  represented as independent corroboration. Confidence is specific to each trophy.

## Performance accounting

The dossier's first-load figure measures HTML, CSS and statically imported modules. It does
not count the local JSON fetch. The full trophy database is fetched locally on startup;
roadmap, risk and matrix modules load only when their tabs open. The verification record
reports the dossier figure and the additional JSON gzip cost separately.
