'use strict';
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const posters=[
 {title:'Make room',theme:'coral',graphic:'spiral',label:'SPACE FOR A NEW IDEA'},
 {title:'Quietly different',theme:'moss',graphic:'orbit',label:'A STUDY IN PERSPECTIVE'},
 {title:'Off the grid',theme:'cobalt',graphic:'stripes',label:'COLOUR OUTSIDE THE LINES'},
 {title:'A soft shift',theme:'cream',graphic:'petal',label:'SMALL CHANGES / BIG FEELINGS'},
 {title:'Good things take shape',theme:'lavender',graphic:'orbit',label:'LET THE IDEA UNFOLD'},
 {title:'Less is a start',theme:'ink',graphic:'spiral',label:'LEAVE A LITTLE ROOM'},
 {title:'Stay curious',theme:'rust',graphic:'stripes',label:'THERE IS ALWAYS ANOTHER WAY'},
 {title:'Find your rhythm',theme:'mint',graphic:'petal',label:'NOT EVERYTHING NEEDS A PLAN'},
];
function posterCard(p,index,duplicate=false){
 const button=document.createElement('button');button.className=`poster ${p.theme}`;button.dataset.poster=index;
 button.innerHTML=`<span class="poster-top"><span>FORME / STUDY ${String(index+1).padStart(2,'0')}</span><span>↗</span></span><span class="poster-graphic ${p.graphic}" aria-hidden="true"></span><strong></strong><span class="poster-bottom"><span></span><span>2026</span></span>`;
 button.querySelector('strong').textContent=p.title;button.querySelector('.poster-bottom>span').textContent=p.label;
 button.setAttribute('aria-label',`Customise ${p.title}`);
 if(duplicate){button.tabIndex=-1;button.setAttribute('aria-hidden','true')}
 return button;
}
['row-one','row-two'].forEach((id,row)=>{const list=row?[4,5,6,7]:[0,1,2,3];const track=document.getElementById(id);for(let repeat=0;repeat<2;repeat++)for(const index of list)track.append(posterCard(posters[index],index,repeat>0))});
// Each repeated half includes its trailing gap so the loop has no visible seam.
document.querySelectorAll('.marquee-track').forEach(track=>{track.style.paddingRight='22px'});

const header=document.querySelector('.header');
let scheduled=false;
window.addEventListener('scroll',()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{header.classList.toggle('scrolled',window.scrollY>24);scheduled=false})},{passive:true});
const navToggle=document.querySelector('.nav-toggle'),dropdown=document.querySelector('.dropdown');
function closeMenu(){navToggle.setAttribute('aria-expanded','false');dropdown.hidden=true}
navToggle.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')==='true';navToggle.setAttribute('aria-expanded',String(!open));dropdown.hidden=open});
dropdown.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('click',e=>{if(!e.target.closest('.nav-item'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dropdown.hidden){closeMenu();navToggle.focus()}});

const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;entry.target.classList.add('visible');const counter=entry.target.querySelector('[data-count]');if(counter)animateCount(counter);observer.unobserve(entry.target)}},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
function animateCount(el){const goal=Number(el.dataset.count);if(reducedMotion){el.textContent=String(goal).padStart(2,'0');return}const start=performance.now();function frame(now){const progress=Math.min((now-start)/1300,1);el.textContent=String(Math.round(goal*(1-Math.pow(1-progress,3)))).padStart(2,'0');if(progress<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)}
const art=document.querySelector('.process-art');
const stepObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){art.dataset.active=entry.target.dataset.step;document.getElementById('figure-number').textContent=String(Number(entry.target.dataset.step)+1).padStart(2,'0')}}},{rootMargin:'-20% 0px -30% 0px',threshold:0});
document.querySelectorAll('.process-step').forEach(el=>stepObserver.observe(el));

document.querySelectorAll('.faq details').forEach(el=>el.addEventListener('toggle',()=>{if(el.open)document.querySelectorAll('.faq details').forEach(other=>{if(other!==el)other.open=false})}));

const studio=document.querySelector('.studio'),preview=document.getElementById('studio-preview'),posterTitle=document.getElementById('poster-title'),previewTitle=document.getElementById('preview-title'),status=document.getElementById('save-status');
let currentTheme='coral',currentGraphic='spiral';
const palettes={
 coral:{background:'#e5846d',foreground:'#452b23'},
 moss:{background:'#4d5945',foreground:'#d8ddc6'},
 cobalt:{background:'#3449c0',foreground:'#e6e7fb'},
 cream:{background:'#dcd4b7',foreground:'#625536'},
 lavender:{background:'#beb3d3',foreground:'#44364f'},
 ink:{background:'#2e3029',foreground:'#d5d8b8'},
 rust:{background:'#a14d34',foreground:'#f4d9bb'},
 mint:{background:'#b8cabb',foreground:'#2b514a'}
};
const graphics={spiral:'Spiral',orbit:'Orbit',stripes:'Stripes',petal:'Petal'};
const graphicPreview=document.getElementById('preview-graphic');
// The same vector artwork drives shape choices, the live preview and SVG export.
function graphicMarkup(shape){
 if(shape==='spiral')return `<g fill="none" stroke="currentColor" stroke-width="4" opacity=".65" transform="rotate(-25 200 200)">${Array.from({length:15},(_,i)=>`<ellipse cx="200" cy="200" rx="${9+i*12}" ry="${11+i*12}"/>`).join('')}</g>`;
 if(shape==='orbit')return '<g transform="rotate(-35 200 200)"><circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="200" cy="200" r="137" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="200" cy="200" r="91" fill="currentColor" opacity=".5"/></g>';
 if(shape==='stripes')return `<svg x="0" y="0" width="400" height="400" viewBox="0 0 400 400" overflow="hidden"><defs><clipPath id="stripe-clip"><polygon points="200,10 390,105 335,390 10,335"/></clipPath></defs><g clip-path="url(#stripe-clip)" stroke="currentColor" stroke-width="3" opacity=".55">${Array.from({length:45},(_,i)=>`<path d="M ${i*15-250} 420 l 160 -440"/>`).join('')}</g></svg>`;
 return '<g fill="currentColor" opacity=".5" transform="rotate(-35 200 200)"><path d="M 60 200 Q 60 35 225 35 H 355 V 200 Q 355 365 190 365 H 60 Z"/><path d="M 20 215 Q 20 65 170 65 H 295 V 215 Q 295 365 145 365 H 20 Z" opacity=".65"/></g>';
}
function graphicSvg(shape){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">${graphicMarkup(shape)}</svg>`}
function clearStatus(){status.textContent=''}
function setTheme(theme){
 currentTheme=Object.hasOwn(palettes,theme)?theme:'coral';
 preview.classList.remove(...Object.keys(palettes));preview.classList.add(currentTheme);
 document.querySelectorAll('[data-swatch]').forEach(button=>{const active=button.dataset.swatch===currentTheme;button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active))});clearStatus();
}
function setGraphic(shape){
 currentGraphic=Object.hasOwn(graphics,shape)?shape:'spiral';
 graphicPreview.innerHTML=graphicSvg(currentGraphic);
 document.querySelectorAll('[data-graphic]').forEach(button=>{const active=button.dataset.graphic===currentGraphic;button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active))});clearStatus();
}
for(const [theme,palette] of Object.entries(palettes)){
 const button=document.createElement('button');button.type='button';button.className='swatch';button.dataset.swatch=theme;button.style.setProperty('--swatch-colour',palette.background);button.setAttribute('aria-label',theme);button.title=theme[0].toUpperCase()+theme.slice(1);button.setAttribute('aria-pressed','false');
 const chip=document.createElement('span');chip.className='swatch-chip';chip.setAttribute('aria-hidden','true');button.append(chip);button.addEventListener('click',()=>setTheme(theme));document.getElementById('studio-swatches').append(button);
}
for(const [shape,label] of Object.entries(graphics)){
 const button=document.createElement('button');button.type='button';button.className='shape-choice';button.dataset.graphic=shape;button.setAttribute('aria-label',label);button.title=label;button.setAttribute('aria-pressed','false');button.innerHTML=graphicSvg(shape);button.addEventListener('click',()=>setGraphic(shape));document.getElementById('studio-shapes').append(button);
}
let studioTrigger=null;
function openStudio(theme='coral',title='Make room',shape='spiral'){
 studioTrigger=document.activeElement;setTheme(theme);setGraphic(shape);posterTitle.value=title;previewTitle.textContent=title;
 studio.showModal();document.body.style.overflow='hidden';closeMenu();
}
document.querySelectorAll('[data-open-studio]').forEach(button=>button.addEventListener('click',()=>openStudio()));
document.querySelectorAll('[data-poster]').forEach(button=>button.addEventListener('click',()=>{const p=posters[Number(button.dataset.poster)];openStudio(p.theme,p.title,p.graphic)}));
posterTitle.addEventListener('input',()=>{previewTitle.textContent=posterTitle.value.trim()||'Make room';clearStatus()});

document.querySelector('.close-studio').addEventListener('click',()=>studio.close());
studio.addEventListener('close',()=>{document.body.style.overflow='';studioTrigger?.focus({preventScroll:true})});
studio.addEventListener('click',e=>{if(e.target!==studio)return;const r=studio.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)studio.close()});
function escapeXml(value){return value.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]))}
function makePosterSvg(){
 const p=palettes[currentTheme],rawTitle=posterTitle.value.trim()||'Make room',title=escapeXml(rawTitle),fontSize=Math.min(126,1000/Math.max(Array.from(rawTitle).length,8));
 return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="870" viewBox="0 0 1200 870"><rect width="1200" height="870" fill="${p.background}"/><svg x="480" y="113" width="660" height="670" viewBox="0 0 400 400" color="${p.foreground}">${graphicMarkup(currentGraphic)}</svg><g fill="${p.foreground}" font-family="Arial,sans-serif"><text x="65" y="85" font-size="18" letter-spacing="3">YOUR LITTLE EXPERIMENT</text><text x="65" y="470" font-size="${fontSize}" letter-spacing="-5">${title}</text><text x="65" y="805" font-size="18" letter-spacing="2">FORME / MADE BY YOU</text><text x="1135" y="805" text-anchor="end" font-size="18" letter-spacing="2">2026</text></g></svg>`;
}
document.getElementById('download-poster').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([makePosterSvg()],{type:'image/svg+xml'}));const a=document.createElement('a');a.href=url;a.download=`forme-${currentTheme}-${currentGraphic}.svg`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Your SVG poster is ready'});
setTheme(currentTheme);setGraphic(currentGraphic);
