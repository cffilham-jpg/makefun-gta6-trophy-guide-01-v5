// A complete six-stage map, with every trophy linked to its place in the route.
import { chapterMissions } from './chapters.js';
export const stageTrophies = (trophies,stage) => trophies.filter(t=>t.stage===stage);
const stages=[
 ['Protect the opening','Chapter 1 · keep a boundary save','Accept the balcony meditation before Tourist Trap. Catch Cal’s invitation during the story. [9][10][11]'],
 ['Partners & character strands','Chapters 2–5 · story + unlocks','Finish partner jobs before the finale as a precaution. Keep saves before both late chapter endings. [9][10]'],
 ['One state, many collections','Free roam · parallel exploration','Scan vehicles, finish card sets and explore. Ranges build Focus before Gunslinger. [2][4][16]'],
 ['Close the completion ledger','Post-story checklist','Use Progress > Stats > 100% Completion. Earlier work counts; trophy thresholds differ. [4][20]'],
 ['Finish the stranger routes','Begin early · sweep later','Do Yago’s timed race immediately in Ch3. This stage is a cleanup sweep, not a delay instruction. [6][9][10]'],
 ['Reconcile & back up','Final audit · unresolved triggers','Back up saves and journal. Unknown triggers stay unknown until observed. [2][3][4]']
];
export function render(trophies,{rich,escape,label}) {
 const card = i => {
  const [name,chapter,reason]=stages[i];
  const members=stageTrophies(trophies,i+1);
  return `<section class="panel routecard"><div class="routehead"><b>0${i+1}</b><h3>${name}</h3><span>${members.length}</span></div><span class="eyebrow">${chapter}</span><p>${rich(reason)}</p><ul>${members.map(t=>`<li><a href="#" data-trophy="${t.id}">${escape(label(t))}</a></li>`).join('')}</ul></section>`;
 };
 return `<div class="viewtitle"><div><span class="eyebrow">YOUR ORDER OF OPERATIONS</span><h2>One playthrough. Six deliberate passes.</h2><p>${rich('~200 hours · 4/10 · 0 online · 15 manual saves · no replay / NG+ [4][5]')}</p></div><b class="mini">${trophies.filter(t=>t.stage).length}/55 ASSIGNED</b></div>
 <div class="routecolumns"><div>${card(0)}${card(3)}</div><div>${card(1)}${card(5)}</div><div>${card(2)}${card(4)}</div></div>
 <div class="thresholds"><b>TROPHY ≠ 100%</b><span>Stunts 250 → 300</span><span>Races 20 → 30</span><span>Challenges 50 → 70</span><span>Cards 3 → 15</span><span>Vaults 5 → 8</span><span>Meditations 18 → 15 ${rich('[4][5]')}</span></div>
 <details class="panel chapterdetails"><summary>Chapter map / 91 main missions ${rich('[7]')}</summary>${chapterMissions.map(c=>`<p>Ch${c[0]} / ${escape(c[2])}</p>`).join('')}<p>Chapter-title trophies can arrive after the next chapter’s opening. ${rich('[2][3][6][7][8]')}</p></details>`;
}
