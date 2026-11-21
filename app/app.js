// Persistent journal: saved trophies, counters, notes, spoiler seals and portable backups.
import { sources, cited, sourceIds } from './sources.js';
const trophies = (await (await fetch('./data/trophies.json')).json()).trophies;
const KEY = 'leonida-ledger-v5';
const blank = () => ({earned:[], counts:{}, notes:{}, spoilers:true});
let journal;
try { journal = validate(JSON.parse(localStorage.getItem(KEY))) } catch { journal = blank() }
let selected = Number(new URLSearchParams(location.search).get('trophy')) || 17;
let view = new URLSearchParams(location.search).get('view') || 'ledger';
let search = '', kind = 'all', grade = 'all', status = 'all', sort = 'id';
const $ = id => document.getElementById(id);
export const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const rich = s => cited(escape(s));
const sealed = t => journal.spoilers && t.kind === 'story' && !journal.earned.includes(t.id);
const label = t => sealed(t) ? `Sealed story trophy · #${t.id}` : t.name;
const save = () => { localStorage.setItem(KEY, JSON.stringify(journal)); summary() };
function validate(value) {
  if (!value || !Array.isArray(value.earned) || typeof value.counts !== 'object' || !value.counts || typeof value.notes !== 'object' || !value.notes) throw Error('Invalid journal');
  return {earned:[...new Set(value.earned.filter(id=>Number.isInteger(id)&&id>=1&&id<=55))],counts:Object.fromEntries(trophies.filter(t=>t.target).map(t=>[t.id,Math.min(t.target,Math.max(0,Number(value.counts[t.id])||0))])),notes:Object.fromEntries(trophies.map(t=>[t.id,String(value.notes[t.id]||'').slice(0,2000)])),spoilers:value.spoilers!==false};
}
function summary() {
  const total = journal.earned.length;
  const collectibles = trophies.filter(t=>t.kind==='collectibles').reduce((n,t)=>n+(Number(journal.counts[t.id])||0),0);
  const next = trophies.find(t=>t.id===28&&!journal.earned.includes(t.id)) || trophies.find(t=>!journal.earned.includes(t.id));
  $('summary').innerHTML=`<div><span class="big">${total}<span style="font-size:18px"> / 55</span></span><div class="mini">TROPHIES EARNED</div></div><div class="progress"><p class="mini">${Math.round(total/55*100)}% COMPLETE · ${collectibles} COLLECTIBLES LOGGED</p><div class="bar"><i style="width:${total/55*100}%"></i></div><p class="mini" style="margin:6px 0 0">${['platinum','gold','silver','bronze'].map(g=>`${g[0].toUpperCase()} ${trophies.filter(t=>t.grade===g&&journal.earned.includes(t.id)).length}/${trophies.filter(t=>t.grade===g).length}`).join(' &nbsp; ')} · 0 ONLINE</p></div><div class="next mini">NEXT UP / PROTECT YOUR RUN<br><b>${escape(next ? label(next) : 'Leonida Legend')}</b><br>Chapter saves before points of no return.</div>`;
}
function audit() {
  const steps=trophies.flatMap(t=>t.steps), multi=steps.filter(s=>sourceIds(s).length>=2).length;
  const sites=new Set(sources.filter(s=>s.id!==1).map(s=>s.url.split('/')[2].replace(/^www\./,''))).size;
  const records=trophies.filter(t=>t.name&&t.description&&t.grade).length;
  const grades=['platinum','gold','silver','bronze'].map(g=>`${trophies.filter(t=>t.grade===g).length}${g[0].toUpperCase()}`).join(' · ');
  const facts=[[`${records}/${trophies.length}`,'official records'],[grades,`${trophies.filter(t=>t.hidden).length} hidden`],[`${steps.filter(s=>sourceIds(s).length).length}/${steps.length}`,'steps cited'],[`${trophies.filter(t=>sourceIds(t.guide).length).length}/${trophies.length}`,'cited answers'],[multi,'steps with 2+ cites'],[sources.length,`sources · ${sites} sites`],[`${trophies.filter(t=>t.stage&&t.confidence).length}/${trophies.length}`,'stage + confidence'],[trophies.filter(t=>t.missable.level==='possibly').length,'possibly missable'],[`${trophies.filter(t=>t.missable.level==='watch').length} risk · ${trophies.filter(t=>t.confidence==='unconfirmed').length}`,'unknown triggers'],[trophies.reduce((n,t)=>n+(t.disputes?.length||0),0),'two-sided disputes']];
  $('audit').innerHTML=facts.map(([n,s])=>`<span><b>${n}</b> ${s}</span>`).join('');
}
function toolbar() {
  return `<div class="toolbar"><input id="search" type="search" placeholder="Search 55 trophies…" value="${escape(search)}" aria-label="Search trophies"><select id="kind" aria-label="Kind">${['all','story','missable','collectibles','activities','crime','combat','side missions','exploration','completion','online'].map(x=>`<option ${kind===x?'selected':''}>${x}</option>`).join('')}</select><select id="grade" aria-label="Grade">${['all','platinum','gold','silver','bronze'].map(x=>`<option ${grade===x?'selected':''}>${x}</option>`).join('')}</select><select id="status" aria-label="Status">${['all','earned','remaining','uncertain'].map(x=>`<option ${status===x?'selected':''}>${x}</option>`).join('')}</select><select id="sort" aria-label="Sort">${['id','name','stage'].map(x=>`<option ${sort===x?'selected':''}>${x}</option>`).join('')}</select><label><input id="spoilers" type="checkbox" ${journal.spoilers?'checked':''}> Hide story spoilers</label><button id="export">Export</button><label class="file">Import<input id="import" type="file" accept="application/json"></label><button id="reset">Reset</button></div>`;
}
function ledger() {
  const filtered=trophies.filter(t=>(!search||`${label(t)} ${sealed(t)?'':t.description}`.toLowerCase().includes(search.toLowerCase()))&&(grade==='all'||t.grade===grade)&&(kind==='all'||(kind==='missable'?t.missable.level!=='no':t.kind===kind))&&(status==='all'||(status==='earned'?journal.earned.includes(t.id):status==='remaining'?!journal.earned.includes(t.id):t.confidence!=='confirmed'))).sort((a,b)=>sort==='name'?label(a).localeCompare(label(b)):a[sort]-b[sort]);
  $('view').innerHTML=toolbar()+`<div class="workspace"><section class="panel"><div class="panelhead"><b>THE TROPHY LEDGER</b><span>${filtered.length} / 55</span></div><div class="list">${filtered.map(t=>`<div class="trophy ${selected===t.id?'selected':''}" data-id="${t.id}" tabindex="0" role="button" aria-label="Open ${escape(label(t))}"><input type="checkbox" aria-label="Earned ${escape(label(t))}" data-earned="${t.id}" ${journal.earned.includes(t.id)?'checked':''}><div><strong>${escape(label(t))}</strong><div class="chips"><span class="chip">${t.grade} · S${t.stage}</span><span class="chip ${t.confidence==='confirmed'?'':'warn'}">${t.confidence}</span>${t.missable.level!=='no'?`<span class="chip warn">${t.missable.level}</span>`:''}</div><small>${sealed(t)?'Earn to reveal name, description & route':escape(t.chapter+' · '+(t.mission||t.kind))}</small></div></div>`).join('')||'<p class="empty">No trophies match. Try another filter.</p>'}</div></section><article class="panel" id="guide"></article><aside class="rail"><h3>SOURCE INDEX / COVERAGE</h3>${sources.map(s=>`<a class="source" target="_blank" rel="noreferrer" href="${s.url}">[${s.id}] ${s.short}<b>${trophies.filter(t=>sourceIds(JSON.stringify(t)).includes(s.id)).length}</b><br><small>${s.topic}</small></a>`).join('')}</aside></div>`;
  const kindRows=[...new Set(trophies.map(t=>t.kind))].map(k=>{const group=trophies.filter(t=>t.kind===k),done=group.filter(t=>journal.earned.includes(t.id)).length;return `<p>${escape(k)} / ${done} of ${group.length}<span class="bar"><i style="width:${done/group.length*100}%"></i></span></p>`}).join('');
  $('view').insertAdjacentHTML('beforeend',`<details class="panel chapterdetails"><summary>Progress by kind</summary>${kindRows}</details>`);
  guide();
  for(const id of ['search','kind','grade','status','sort']) $(id).addEventListener(id==='search'?'input':'change',e=>{const v=e.target.value;if(id==='search')search=v;if(id==='kind')kind=v;if(id==='grade')grade=v;if(id==='status')status=v;if(id==='sort')sort=v;const pos=e.target.selectionStart;ledger();if(id==='search'){$('search').focus();$('search').setSelectionRange(pos,pos)}});
  $('spoilers').onchange=e=>{journal.spoilers=e.target.checked;save();ledger()};
  document.querySelectorAll('[data-id]').forEach(el=>{const open=()=>{selected=Number(el.dataset.id);ledger()};el.onclick=e=>{if(e.target.type!=='checkbox')open()};el.onkeydown=e=>{if(e.key==='Enter')open()}});
  document.querySelectorAll('[data-earned]').forEach(el=>el.onchange=()=>{const id=Number(el.dataset.earned);journal.earned=el.checked?[...new Set([...journal.earned,id])]:journal.earned.filter(x=>x!==id);save();ledger()});
  $('export').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(journal,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='leonida-journal.json';a.click();URL.revokeObjectURL(url)};
  $('import').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;journal=validate(JSON.parse(await file.text()));save();ledger();$('message').textContent='Journal imported successfully.'}catch{$('message').textContent='Import rejected: choose a valid Leonida journal.'}};
  $('reset').onclick=()=>{if(confirm('Erase this device’s journal? Export a backup first.')){journal=blank();save();ledger()}};
}
function guide() {
  const t=trophies.find(t=>t.id===selected)||trophies[27];
  if(sealed(t)){$('guide').innerHTML='<div class="guide"><span class="eyebrow">SPOILER PROTECTION ACTIVE</span><h1>Story route sealed</h1><p>Earn this trophy or turn off Hide story spoilers to reveal its official name, description and mission guide.</p></div>';return}
  const stepsHtml=t.steps.map(s=>`<li>${rich(s)}</li>`).join('');
  const disputesHtml=t.disputes?.map(d=>`<section><b>${escape(d.topic)}</b><p>${rich(d.a)}</p><p>${rich(d.b)}</p><b>${escape(d.verdict)}</b></section>`).join('')||'';
  const counterHtml=t.target?`<label>Personal counter <input id="count" type="number" min="0" max="${t.target}" value="${journal.counts[t.id]||0}"> / ${t.target}</label>`:'Personal field notes';
  $('guide').innerHTML=`<div class="guide"><div class="eyebrow">FIELD NOTE ${String(t.id).padStart(2,'0')} / STAGE ${t.stage} / ${escape(t.chapter)}</div><h1>${escape(t.name)}</h1><p class="official">${escape(t.description)} <span class="chip">${t.grade}${t.hidden?' · PSN hidden':''}</span></p><p class="answer">${rich(t.guide)}</p><div class="mini">${escape(t.mission||t.difficulty)} · ${escape(t.time)}</div><ol>${stepsHtml}</ol><div class="note ${t.missable.level!=='no'?'warning':''}">${rich(t.missable.reason)}</div><details class="evidence"><summary>${t.confidence.toUpperCase()} / evidence & personal journal</summary><p class="mini">${rich(t.note)}</p>${disputesHtml}<div class="counter">${counterHtml}</div><textarea id="notes" aria-label="Field notes" placeholder="Your observations, save slot, next stop…">${escape(journal.notes[t.id]||'')}</textarea></details></div>`;
  if($('count'))$('count').onchange=e=>{journal.counts[t.id]=Math.min(t.target,Math.max(0,Number(e.target.value)||0));e.target.value=journal.counts[t.id];save()};
  $('notes').onchange=e=>{journal.notes[t.id]=e.target.value.slice(0,2000);save()};
}
async function render() {
  document.body.dataset.view=view;
  document.querySelectorAll('[data-view]').forEach(el=>el.classList.toggle('active',el.dataset.view===view));
  if(view==='ledger')ledger();
  else {
    let module;
    if(view==='matrix')module=await import('./matrix.js');
    else if(view==='stages')module=await import('./stages.js');
    else module=await import('./risks.js');
    $('view').innerHTML=module.render(trophies,{rich,escape,label});
    $('view').querySelectorAll('[data-trophy]').forEach(el=>el.onclick=()=>{selected=Number(el.dataset.trophy);view='ledger';render()});
  }
}
document.querySelectorAll('[data-view]').forEach(el=>el.onclick=()=>{view=el.dataset.view;render()});
summary();audit();render();
