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

const track=document.getElementById('mood-track'),previous=document.getElementById('previous'),next=document.getElementById('next');
function moveTrack(direction){const first=track.querySelector('.mood-card');track.scrollBy({left:direction*(first.getBoundingClientRect().width+23),behavior:reducedMotion?'instant':'smooth'})}
previous.addEventListener('click',()=>moveTrack(-1));next.addEventListener('click',()=>moveTrack(1));
function updateTrack(){previous.disabled=track.scrollLeft<2;next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-2}
track.addEventListener('scroll',updateTrack,{passive:true});new ResizeObserver(updateTrack).observe(track);updateTrack();
document.querySelectorAll('.faq details').forEach(el=>el.addEventListener('toggle',()=>{if(el.open)document.querySelectorAll('.faq details').forEach(other=>{if(other!==el)other.open=false})}));

const studio=document.querySelector('.studio'),preview=document.getElementById('studio-preview'),posterTitle=document.getElementById('poster-title'),previewTitle=document.getElementById('preview-title'),motion=document.getElementById('motion-toggle'),status=document.getElementById('save-status');
let currentTheme='coral';
const palettes={coral:{background:'#e5846d',foreground:'#452b23'},moss:{background:'#4d5945',foreground:'#d8ddc6'},cobalt:{background:'#3449c0',foreground:'#e6e7fb'}};
function setTheme(theme){currentTheme=palettes[theme]?theme:'coral';preview.classList.remove('coral','moss','cobalt');preview.classList.add(currentTheme);document.querySelectorAll('[data-swatch]').forEach(button=>{const active=button.dataset.swatch===currentTheme;button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active))});status.textContent=''}
function openStudio(theme='coral',title='Make room'){setTheme(theme);posterTitle.value=title;previewTitle.textContent=title;studio.showModal();document.body.style.overflow='hidden';closeMenu()}
document.querySelectorAll('[data-open-studio]').forEach(button=>button.addEventListener('click',()=>openStudio()));
document.querySelectorAll('[data-poster]').forEach(button=>button.addEventListener('click',()=>{const p=posters[Number(button.dataset.poster)];openStudio(p.theme,p.title)}));
document.querySelectorAll('[data-theme]').forEach(button=>button.addEventListener('click',()=>openStudio(button.dataset.theme,button.querySelector('strong').textContent)));
document.querySelectorAll('[data-swatch]').forEach(button=>button.addEventListener('click',()=>setTheme(button.dataset.swatch)));
posterTitle.addEventListener('input',()=>{previewTitle.textContent=posterTitle.value.trim()||'Make room';status.textContent=''});
motion.addEventListener('change',()=>preview.classList.toggle('motion-off',!motion.checked));
document.querySelector('.close-studio').addEventListener('click',()=>studio.close());
studio.addEventListener('close',()=>{document.body.style.overflow=''});
studio.addEventListener('click',e=>{if(e.target!==studio)return;const r=studio.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)studio.close()});
// Export the user's chosen colours and words as a standalone vector poster.
function escapeXml(value){return value.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]))}
document.getElementById('download-poster').addEventListener('click',()=>{const p=palettes[currentTheme];const title=escapeXml(posterTitle.value.trim()||'Make room');const fontSize=Math.min(120,1450/Math.max(title.length,8));const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200"><rect width="900" height="1200" fill="${p.background}"/><g fill="none" stroke="${p.foreground}" opacity=".75"><ellipse cx="450" cy="530" rx="270" ry="130" transform="rotate(-35 450 530)" stroke-width="2"/><ellipse cx="450" cy="530" rx="270" ry="130" transform="rotate(35 450 530)" stroke-width="2"/><circle cx="450" cy="530" r="130" stroke-width="55" opacity=".45"/></g><g fill="${p.foreground}" font-family="Arial,sans-serif"><text x="65" y="85" font-size="15" letter-spacing="4">YOUR LITTLE EXPERIMENT</text><text x="65" y="945" font-size="${fontSize}" letter-spacing="-4">${title}</text><text x="65" y="1130" font-size="15" letter-spacing="3">FORME / MADE BY YOU</text></g></svg>`;const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));const a=document.createElement('a');a.href=url;a.download=`forme-${currentTheme}.svg`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Your SVG poster is ready'});
