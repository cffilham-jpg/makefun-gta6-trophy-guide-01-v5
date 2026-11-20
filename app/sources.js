// V5 citation registry; dossier-derived reads are distinguished from fresh reads.
export const sources = [
 {id:1,short:'Official PS5 list',topic:'Local kit reference',url:'./data/trophies.json'},
 {id:2,short:'PowerPyx',topic:'Trophy routes',url:'https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/'},
 {id:3,short:'GTABase',topic:'Independent routes',url:'https://www.gtabase.com/articles/gta-6/gta-6-achievements-trophies-list-ps5-xbox-series'},
 {id:4,short:'KeenGamer',topic:'Roadmap / thresholds',url:'https://www.keengamer.com/articles/guides/gta-6-trophy-guide-platinum-roadmap-all-55-trophies/'},
 {id:5,short:'eGamers',topic:'Hard trophies / gaps',url:'https://egamers.io/gta-6-trophy-list-all-55-trophies-and-achievements-plus-the-hardest-ones/'},
 {id:6,short:'PP missions',topic:'Walkthrough',url:'https://www.powerpyx.com/gta-6-full-walkthrough-all-missions/'},
 {id:7,short:'GAMES.GG',topic:'Chapter sequence',url:'https://games.gg/grand-theft-auto-vi/guides/gta-6-missions-list/'},
 {id:8,short:'OutputLag story',topic:'Mission context',url:'https://outputlag.com/guides/gta-6-walkthrough-missions/'},
 {id:9,short:'Game-Checklists',topic:'Risk windows',url:'https://game-checklists.com/gta6/guides/missables/'},
 {id:10,short:'OutputLag saves',topic:'Chapter 1 losses',url:'https://outputlag.com/guides/gta-6-missables/'},
 {id:11,short:'PP meditation',topic:'10 spots / 18 sessions',url:'https://www.powerpyx.com/gta-6-all-meditation-spot-locations/'},
 {id:12,short:'PP range golds',topic:'2 venues / 42 golds',url:'https://www.powerpyx.com/gta-6-all-shooting-range-gold-medal-challenges/'},
 {id:13,short:'PP drone trials',topic:'14 locations',url:'https://www.powerpyx.com/gta-6-all-top-fun-drone-race-time-trial-locations/'},
 {id:14,short:'PP races',topic:'40 unique races',url:'https://www.powerpyx.com/gta-6-all-unique-race-locations-racing-activities/'},
 {id:15,short:'PP challenges',topic:'80 challenges',url:'https://www.powerpyx.com/gta-6-all-challenges-guide/'},
 {id:16,short:'OutputLag play',topic:'Activity mechanics',url:'https://outputlag.com/guides/gta-6-activities-minigames/'},
 {id:17,short:'OutputLag crime',topic:'Robberies / fences',url:'https://outputlag.com/guides/gta-6-how-to-rob-stores-heists/'},
 {id:18,short:'Beebom UFO',topic:'19 Nov encounter',url:'https://beebom.com/gta-6-ufo-location-trophy-guide/'},
 {id:19,short:'eGamers gangs',topic:'39 illegal operations',url:'https://egamers.io/gta-6-gang-operations-guide-39-robbery-spots-and-the-pest-control-trophy/'},
 {id:20,short:'PP 100%',topic:'Completion checklist',url:'https://www.powerpyx.com/gta-6-100-completion-checklist-guide/'}
];
export const sourceIds = text => [...new Set([...text.matchAll(/\[(\d+)\]/g)].map(m=>Number(m[1])))];
export function cited(text) { return text.replace(/\[(\d+)\]/g,(_,n)=>`<a class="cite" href="${sources.find(s=>s.id===Number(n))?.url||'#'}" title="${sources.find(s=>s.id===Number(n))?.short||'Source'}" target="_blank" rel="noreferrer">[${n}]</a>`) }
