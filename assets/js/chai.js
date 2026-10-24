(function(){
var D=document,H=D.documentElement,$=function(s,r){return[].slice.call((r||D).querySelectorAll(s))};
function ld(k,d){try{return localStorage.getItem(k)||d}catch(e){return d}}function sv(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var T={title:["CHAI Consultoría | Implementación de Odoo ERP y facturación electrónica e-CF","CHAI Consulting | Odoo ERP implementation and e-CF electronic invoicing"],desc:["CHAI Consulting and Software: implementación de Odoo ERP, facturación electrónica e-CF, desarrollos personalizados y consultoría tecnológica en República Dominicana.","CHAI Consulting and Software: Odoo ERP implementation, e-CF electronic invoicing, custom development and tech consulting in the Dominican Republic."]};
$('[data-en]').forEach(function(e){e.setAttribute('data-es',e.innerHTML)});
function mark(a,v,b){$('['+a+']').forEach(function(x){x.classList.toggle('on',x.getAttribute(a)===v)})}
function lang(l){H.lang=l;$('[data-en]').forEach(function(e){e.innerHTML=e.getAttribute(l==='en'?'data-en':'data-es')});var i=l==='en'?1:0;D.title=T.title[i];D.querySelector('meta[name=description]').content=T.desc[i];D.querySelector('meta[property="og:locale"]').content=l==='en'?'en_US':'es_DO';mark('data-lang',l);sv('chai-lang',l)}
function theme(t){H.dataset.theme=t;mark('data-theme-set',t);sv('chai-theme',t)}
function acc(a){H.dataset.accent=a;mark('data-accent-set',a);sv('chai-accent',a)}
$('[data-lang]').forEach(function(b){b.onclick=function(){lang(b.dataset.lang)}});
$('[data-theme-set]').forEach(function(b){b.onclick=function(){theme(b.dataset.themeSet)}});
$('[data-accent-set]').forEach(function(b){b.onclick=function(){acc(b.dataset.accentSet)}});
theme(ld('chai-theme','dark'));acc(ld('chai-accent','a'));if(ld('chai-lang','es')==='en')lang('en');
/* reveal: se activa y desactiva en ambos sentidos del scroll */
var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('in',e.isIntersecting)})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
$('.rv').forEach(function(e){io.observe(e)});
/* scroll suave por inercia (amortiguación exponencial, independiente de los FPS) */
var up=D.getElementById('up'),pn=D.getElementById('panel'),bg=D.getElementById('burger');
var fx=D.getElementById('chai-top'),ly=0,site=D.getElementById('chai-site');var smooth=!matchMedia('(pointer:coarse)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches;
var tgt=scrollY,cur=scrollY,raf=0,last=0,K=5.5;
function lim(y){return Math.max(0,Math.min(y,H.scrollHeight-innerHeight))}
function tick(now){var dt=Math.min((now-last)/1000,.05);last=now;cur+=(tgt-cur)*(1-Math.exp(-K*dt));if(Math.abs(tgt-cur)<.3){cur=tgt;raf=0}else raf=requestAnimationFrame(tick);scrollTo(0,cur)}
function go(y){tgt=lim(y);if(!raf){last=performance.now();raf=requestAnimationFrame(tick)}}
if(smooth){H.style.scrollBehavior='auto';
addEventListener('wheel',function(e){if(e.ctrlKey||e.target.closest('textarea,select,video'))return;e.preventDefault();var d=e.deltaMode===1?e.deltaY*16:e.deltaMode===2?e.deltaY*innerHeight:e.deltaY;go((raf?tgt:scrollY)+d)},{passive:false});
addEventListener('keydown',function(e){if(/INPUT|TEXTAREA|SELECT/.test(D.activeElement.tagName))return;if(['PageDown','PageUp','Home','End',' ','ArrowDown','ArrowUp'].indexOf(e.key)>-1){cancelAnimationFrame(raf);raf=0}})}
addEventListener('scroll',function(){if(!raf){cur=tgt=scrollY}var y=scrollY;fx.classList.toggle('sc',y>10);fx.classList.toggle('ht',y>90&&y>ly);if(y<ly)fx.classList.remove('ht');ly=y;up.classList.toggle('on',y>600);tl();spy()},{passive:true});
function to(y){if(smooth){cur=scrollY;go(y)}else scrollTo({top:y,behavior:'smooth'})}
$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=a.getAttribute('href');e.preventDefault();pn.classList.remove('open');if(id.length<2)return;var el=D.querySelector(id);if(el)to(el.getBoundingClientRect().top+scrollY-70)})});
up.onclick=function(){to(0)};
bg.onclick=function(){bg.setAttribute('aria-expanded',pn.classList.toggle('open'))};
D.getElementById('chai-form').addEventListener('submit',function(e){e.preventDefault();D.getElementById('fok').hidden=false});
D.getElementById('yr').textContent=new Date().getFullYear();
function pad(){if(!pn.classList.contains('open')&&!fx.classList.contains('ht'))site.style.paddingTop=fx.offsetHeight+'px'}pad();addEventListener('resize',pad);addEventListener('load',pad);
/* metodología: la línea se llena con el scroll (sube y baja) */
var tr=D.querySelector('.chai-tl'),ts=$('.chai-step',tr),tk=tr.querySelector('.tk');
function tl(){var vh=innerHeight,r=tr.getBoundingClientRect(),vt=innerWidth<992,p=vt?(vh*.65-r.top)/r.height:(vh*.8-r.top)/(vh*.4);p=Math.max(0,Math.min(1,p));tk.style.setProperty('--p',p);var k=tk.getBoundingClientRect(),end=vt?k.top+p*k.height:k.left+p*k.width;ts.forEach(function(s){var q=s.getBoundingClientRect(),d=vt?q.top+16:q.left+19;s.classList.toggle('on',p>0&&(d<=end+1||p>.995))})}
addEventListener('resize',tl);tl();
/* menú: subrayado según la sección visible */
var IDS=['inicio','valor','servicios','odoo','beneficios','ecf','contable','metodologia','equipo','porque','contacto'],MAP={valor:'inicio',beneficios:'odoo',contable:'ecf',porque:'equipo'},navs=$('.chai-nav a'),lastA='';
function spy(){var c=IDS[0],lim=innerHeight*.35;IDS.forEach(function(id){var e=D.getElementById(id);if(e&&e.getBoundingClientRect().top<=lim)c=id});if(scrollY+innerHeight>=H.scrollHeight-6)c='contacto';c=MAP[c]||c;if(c===lastA)return;lastA=c;navs.forEach(function(a){a.classList.toggle('act',a.getAttribute('href')==='#'+c)})}
spy();
/* FAQ: acordeón exclusivo con transición CSS (grid 0fr → 1fr) */
$('.fq').forEach(function(f){var b=f.querySelector('.fqh');b.addEventListener('click',function(){var o=f.classList.contains('o');$('.fq.o').forEach(function(x){x.classList.remove('o');x.querySelector('.fqh').setAttribute('aria-expanded','false')});if(!o){f.classList.add('o');b.setAttribute('aria-expanded','true')}})});
/* hero: carrusel + dashboard que crece al incorporar herramientas */
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,SL=$('.chai-sl>.sl'),DT=$('.chai-dots button'),hi=0,ht=0,hr=0,t0=0;
var S=[0,14,29,44,58,73,91],dn=$('.dv .dn'),dl=$('.dv .dl'),big=D.getElementById('dv-big'),m1=D.getElementById('dv-m1'),m2=D.getElementById('dv-m2'),dln=D.getElementById('dv-line'),dar=D.getElementById('dv-area'),dhd=D.getElementById('dv-head');
function yv(v){return 276-v*1.1}function xv(i){return 32+i*50}
function draw(s){var g=Math.max(0,Math.min(6,s)),k=Math.min(5,Math.floor(g)),f=1-Math.pow(1-(g-k),3),v=S[k]+(S[k+1]-S[k])*f,ex=xv(k)+50*f,d='M32 '+yv(0),i;for(i=1;i<=k;i++)d+='L'+xv(i)+' '+yv(S[i]);d+='L'+ex+' '+yv(v);dln.setAttribute('d',d);dar.setAttribute('d',d+'L'+ex+' 276L32 276Z');dhd.setAttribute('cx',ex);dhd.setAttribute('cy',yv(v));
big.textContent='+'+Math.round(v)+'%';m1.textContent='+'+Math.round(v*.62)+'%';m2.textContent='+'+Math.round(v*.8)+'%';
dn.forEach(function(n,j){var on=s>=j;if(on!==!!n._o){n._o=on;n.classList.toggle('on',on);dl[j].classList.toggle('on',on);if(on&&!rm){big.classList.remove('bump');void big.getBoundingClientRect();big.classList.add('bump')}}})}
function dash(){cancelAnimationFrame(hr);dn.forEach(function(n,j){n._o=false;n.classList.remove('on');dl[j].classList.remove('on')});if(rm){draw(6);return}draw(-1);t0=performance.now();(function f(now){var s=((now-t0)/1000-.6)/1.2;draw(s);if(s<6)hr=requestAnimationFrame(f)})(t0)}
function show(i){hi=(i+SL.length)%SL.length;SL.forEach(function(s,k){s.classList.toggle('on',k===hi)});DT.forEach(function(b,k){b.classList.remove('on');if(k===hi){void b.offsetWidth;b.classList.add('on')}});clearTimeout(ht);if(hi===0)dash();else cancelAnimationFrame(hr);if(!rm)ht=setTimeout(function(){show(hi+1)},10000)}
DT.forEach(function(b,k){b.onclick=function(){show(k)}});show(0);
var bv=D.querySelector('.chai-band video');if(bv){if(rm)bv.removeAttribute('autoplay');new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!rm){var p=bv.play();if(p&&p.catch)p.catch(function(){})}else bv.pause()})},{threshold:.15}).observe(bv)}
/* video: autoplay con sonido; si el navegador lo bloquea, arranca en silencio y activa el audio en el primer toque/clic */
var v=D.querySelector('.chai-vid video'),sb=D.getElementById('vsound'),vis=false,man=false;
function unm(){if(v.muted&&!v.paused){v.muted=false;sb.hidden=true}}
['pointerdown','keydown','touchend'].forEach(function(n){addEventListener(n,function(){if(!v.muted)return;unm()},{passive:true})});
sb.onclick=function(){v.currentTime=0;v.muted=false;v.play();sb.hidden=true};
v.addEventListener('pause',function(){if(vis&&!v.ended)man=true});v.addEventListener('play',function(){man=false});
v.addEventListener('volumechange',function(){if(!v.muted)sb.hidden=true});
function auto(){v.muted=false;var p=v.play();if(p&&p.catch)p.catch(function(){v.muted=true;v.play().then(function(){sb.hidden=false}).catch(function(){})})}
new IntersectionObserver(function(es){es.forEach(function(e){vis=e.isIntersecting;if(vis){if(!man&&!v.ended)auto()}else v.pause()})},{threshold:.5}).observe(v);
})();
