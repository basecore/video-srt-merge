(()=>{
'use strict';
window.addEventListener('load',()=>{
const $=id=>document.getElementById(id),video=$('sourceVideo'),subs=$('subs'),frame=$('frameButton'),stop=$('stopButton'),status=$('status'),card=document.querySelector('.card');
if(!video||!subs||!frame||!stop||!status||!card||window.__subtitleStudioExtras)return;
window.__subtitleStudioExtras=true;
const dict={en:{reset:'Set to default',resetDone:'Default settings restored.',sample:'Sample {n} of {total} · {time}',noCues:'No subtitle cues found.',preset:'Export profile',original:'Original · source resolution',low:'Low · 480p · smaller file',mid:'Medium · 720p · balanced',high:'High · 1080p · larger file',custom:'Custom · advanced settings',advanced:'Advanced video settings',advancedHint:'CRF is compression quality, not resolution. Lower CRF means higher quality and a larger file.'},de:{reset:'Auf Standard zurücksetzen',resetDone:'Standardeinstellungen wiederhergestellt.',sample:'Beispiel {n} von {total} · {time}',noCues:'Keine Untertitel gefunden.',preset:'Exportprofil',original:'Original · Quellauflösung',low:'Niedrig · 480p · kleinere Datei',mid:'Mittel · 720p · ausgewogen',high:'Hoch · 1080p · größere Datei',custom:'Benutzerdefiniert · erweiterte Optionen',advanced:'Erweiterte Videoeinstellungen',advancedHint:'CRF steuert die Kompression, nicht die Auflösung. Kleinerer CRF-Wert bedeutet höhere Qualität und größere Dateien.'}};
const lang=()=>document.documentElement.lang==='de'?'de':'en',text=(key,vars={})=>dict[lang()][key].replace(/\{(\w+)\}/g,(_,name)=>vars[name]??'');
const resolution=$('resolution'),quality=$('quality'),row=resolution.closest('.row');
const presetWrap=document.createElement('div');presetWrap.className='field';
const presetLabel=document.createElement('label');presetLabel.htmlFor='exportPreset';
const preset=document.createElement('select');preset.id='exportPreset';
for(const name of ['original','low','mid','high','custom']){const option=document.createElement('option');option.value=name;preset.append(option)}
presetWrap.append(presetLabel,preset);
const advanced=document.createElement('details');advanced.className='settings';
const summary=document.createElement('summary');const hint=document.createElement('p');hint.className='muted';
row.before(presetWrap,advanced);advanced.append(summary,row,hint);
const profiles={original:{resolution:'original',quality:'23'},low:{resolution:'480',quality:'27'},mid:{resolution:'720',quality:'23'},high:{resolution:'1080',quality:'19'}};
let syncing=false;
function render(){presetLabel.textContent=text('preset');summary.textContent=text('advanced');hint.textContent=text('advancedHint');for(const option of preset.options)option.textContent=text(option.value)}
render();preset.value=Object.keys(profiles).find(key=>profiles[key].resolution===resolution.value&&profiles[key].quality===quality.value)||'custom';
preset.addEventListener('change',()=>{const profile=profiles[preset.value];if(!profile)return;syncing=true;for(const [id,value] of Object.entries(profile)){const element=$(id);element.value=value;element.dispatchEvent(new Event('input',{bubbles:true}))}syncing=false});
for(const element of [resolution,quality])element.addEventListener('input',()=>{if(!syncing)preset.value='custom'});
const defaults={resolution:'original',quality:'23',aacFallback:true,offset:'0',size:'28',margin:'32',position:'2',color:'white',outline:'2'};
const reset=document.createElement('button');reset.type='button';reset.id='resetDefaults';reset.className='btn';reset.style.background='#d8e8f5';reset.style.minWidth='190px';reset.textContent=text('reset');
const note=[...card.querySelectorAll('p.muted')].pop();if(note)note.before(reset);else card.append(reset);
const sampleInfo=document.createElement('p');sampleInfo.id='sampleCueInfo';sampleInfo.className='muted';frame.after(sampleInfo);
function clearOutput(){const preview=$('framePreview');if(preview){if(preview.src.startsWith('blob:'))URL.revokeObjectURL(preview.src);preview.removeAttribute('src');preview.hidden=true}const output=$('outputVideo'),download=$('download');if(download){if(download.href.startsWith('blob:'))URL.revokeObjectURL(download.href);download.removeAttribute('href');download.hidden=true}if(output){output.removeAttribute('src');output.load();output.hidden=true}}
let index=-1,seeking=false;
reset.addEventListener('click',()=>{if(!stop.hidden)return;syncing=true;for(const [id,value] of Object.entries(defaults)){const element=$(id);if(!element)continue;if(element.type==='checkbox')element.checked=value;else element.value=value;element.dispatchEvent(new Event('input',{bubbles:true}))}syncing=false;preset.value='original';clearOutput();index=-1;sampleInfo.textContent='';status.textContent=text('resetDone')});
new MutationObserver(()=>{reset.disabled=!stop.hidden}).observe(stop,{attributes:true,attributeFilter:['hidden']});
new MutationObserver(()=>{render();reset.textContent=text('reset')}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
$('language')?.addEventListener('change',()=>{reset.textContent=text('reset')});
function seconds(value){const m=value.match(/(\d+):(\d+):(\d+)[,.](\d+)/);return m?+m[1]*3600+ +m[2]*60+ +m[3]+ +m[4]/1000:NaN}
async function cueTimes(){const data=await subs.files[0].arrayBuffer();let content;try{content=new TextDecoder('utf-8',{fatal:true}).decode(data)}catch{content=new TextDecoder('windows-1252').decode(data)}const offset=Math.max(-10,Math.min(10,(Number($('offset')?.value)||0)/1000));return content.replace(/\r\n?/g,'\n').split(/\n\s*\n/).flatMap(block=>{const m=block.match(/(\d+:\d+:\d+[,.]\d+)\s*-->\s*(\d+:\d+:\d+[,.]\d+)/);if(!m)return[];const start=Math.max(0,seconds(m[1])+offset),end=seconds(m[2])+offset;return end>start?[{start,end}]:[]}).sort((a,b)=>a.start-b.start)}
const originalClick=frame.onclick;
frame.addEventListener('click',event=>{if(frame.disabled||!subs.files[0]||seeking)return;event.preventDefault();event.stopImmediatePropagation();seeking=true;(async()=>{try{const cues=await cueTimes();if(!cues.length){status.textContent=text('noCues');return}const now=video.currentTime||0;if(index<0){index=cues.findIndex(c=>c.start<=now&&now<c.end);if(index<0)index=cues.findIndex(c=>c.start>=now);if(index<0)index=0}else index=(index+1)%cues.length;const cue=cues[index],at=cue.start+Math.min(.15,Math.max(.01,(cue.end-cue.start)/2));if(Math.abs(video.currentTime-at)>.03)await new Promise(resolve=>{let settled=false;const done=()=>{if(settled)return;settled=true;video.removeEventListener('seeked',done);resolve()};video.addEventListener('seeked',done,{once:true});video.currentTime=at;setTimeout(done,1500)});sampleInfo.textContent=text('sample',{n:index+1,total:cues.length,time:new Date(at*1000).toISOString().slice(11,19)});if(typeof originalClick==='function')originalClick.call(frame)}catch(error){status.textContent=String(error)}finally{seeking=false}})()},true);
const resetIndex=()=>{index=-1;sampleInfo.textContent=''};subs.addEventListener('change',resetIndex);video.addEventListener('loadedmetadata',resetIndex);$('offset')?.addEventListener('input',resetIndex);
for(const element of document.querySelectorAll('header .badge,footer span'))element.textContent=element.textContent.replace('v1.3.2','v1.3.4');
},{once:true});
})();
