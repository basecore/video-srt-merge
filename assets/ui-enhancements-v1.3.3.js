(()=>{
'use strict';
window.addEventListener('load',()=>{
const $=id=>document.getElementById(id),video=$('sourceVideo'),subs=$('subs'),frame=$('frameButton'),stop=$('stopButton'),status=$('status'),card=document.querySelector('.card');
if(!video||!subs||!frame||!stop||!status||!card||window.__subtitleStudioExtras)return;
window.__subtitleStudioExtras=true;
const dict={en:{reset:'Set to default',resetDone:'Default settings restored.',sample:'Sample {n} of {total} · {time}',noCues:'No subtitle cues found.'},de:{reset:'Auf Standard zurücksetzen',resetDone:'Standardeinstellungen wiederhergestellt.',sample:'Beispiel {n} von {total} · {time}',noCues:'Keine Untertitel gefunden.'}};
const language=()=>document.documentElement.lang==='de'?'de':'en';
const text=(key,vars={})=>dict[language()][key].replace(/\{(\w+)\}/g,(_,name)=>vars[name]??'');
const reset=document.createElement('button');reset.id='resetDefaults';reset.type='button';reset.className='btn';reset.style.background='#d8e8f5';reset.textContent=text('reset');
const note=[...card.querySelectorAll('p.muted')].pop();if(note)note.before(reset);else card.append(reset);
const sampleInfo=document.createElement('p');sampleInfo.id='sampleCueInfo';sampleInfo.className='muted';frame.after(sampleInfo);
const defaults={resolution:'original',quality:'23',aacFallback:true,offset:'0',size:'28',margin:'32',position:'2',color:'white',outline:'2'};
let index=-1,seeking=false;
function clearOutput(){const preview=$('framePreview');if(preview){if(preview.src.startsWith('blob:'))URL.revokeObjectURL(preview.src);preview.removeAttribute('src');preview.hidden=true}const output=$('outputVideo'),download=$('download');if(download){if(download.href.startsWith('blob:'))URL.revokeObjectURL(download.href);download.removeAttribute('href');download.hidden=true}if(output){output.removeAttribute('src');output.load();output.hidden=true}}
reset.addEventListener('click',()=>{if(!stop.hidden)return;for(const [id,value] of Object.entries(defaults)){const element=$(id);if(!element)continue;if(element.type==='checkbox')element.checked=value;else element.value=value}for(const id of Object.keys(defaults)){const element=$(id);if(element)element.dispatchEvent(new Event('input',{bubbles:true}))}clearOutput();index=-1;sampleInfo.textContent='';status.textContent=text('resetDone')});
new MutationObserver(()=>{reset.disabled=!stop.hidden;reset.textContent=text('reset')}).observe(stop,{attributes:true,attributeFilter:['hidden']});
$('language')?.addEventListener('change',()=>{reset.textContent=text('reset')});
function seconds(value){const m=value.match(/(\d+):(\d+):(\d+)[,.](\d+)/);return m?+m[1]*3600+ +m[2]*60+ +m[3]+ +m[4]/1000:NaN}
async function cueTimes(){const data=await subs.files[0].arrayBuffer();let content;try{content=new TextDecoder('utf-8',{fatal:true}).decode(data)}catch{content=new TextDecoder('windows-1252').decode(data)}const offset=Math.max(-10,Math.min(10,(Number($('offset')?.value)||0)/1000));return content.replace(/\r\n?/g,'\n').split(/\n\s*\n/).flatMap(block=>{const m=block.match(/(\d+:\d+:\d+[,.]\d+)\s*-->\s*(\d+:\d+:\d+[,.]\d+)/);if(!m)return[];const start=Math.max(0,seconds(m[1])+offset),end=seconds(m[2])+offset;return end>start?[{start,end}]:[]}).sort((a,b)=>a.start-b.start)}
const original=frame.onclick;
frame.addEventListener('click',event=>{if(frame.disabled||!subs.files[0]||seeking)return;event.preventDefault();event.stopImmediatePropagation();seeking=true;(async()=>{try{const cues=await cueTimes();if(!cues.length){status.textContent=text('noCues');return}const now=video.currentTime||0;if(index<0){index=cues.findIndex(c=>c.start<=now&&now<c.end);if(index<0)index=cues.findIndex(c=>c.start>=now);if(index<0)index=0}else index=(index+1)%cues.length;const cue=cues[index],at=cue.start+Math.min(.15,Math.max(.01,(cue.end-cue.start)/2));if(Math.abs(video.currentTime-at)>.03){await new Promise(resolve=>{let settled=false;const done=()=>{if(settled)return;settled=true;video.removeEventListener('seeked',done);resolve()};video.addEventListener('seeked',done,{once:true});video.currentTime=at;setTimeout(done,1500)})}sampleInfo.textContent=text('sample',{n:index+1,total:cues.length,time:new Date(at*1000).toISOString().slice(11,19)});if(typeof original==='function')original.call(frame)}catch(error){status.textContent=String(error)}finally{seeking=false}})()},true);
const resetIndex=()=>{index=-1;sampleInfo.textContent=''};subs.addEventListener('change',resetIndex);video.addEventListener('loadedmetadata',resetIndex);$('offset')?.addEventListener('input',resetIndex);
},{once:true});
})();
