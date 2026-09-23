'use strict';

// ===== RAPID PERSONALISATION: replace verified business details here =====
const BUSINESS_CONFIG = {
  businessName: 'EBZ Cutz', shortName: 'EBZ',
  tagline: 'Fresh cuts. Fresh looks.',
  description: 'Precision haircuts, fades and beard grooming in Ikorodu.',
  location: 'Ikorodu, Lagos', fullAddress: '12 Ogunneye Street, Grammar School, Ikorodu, Lagos, Nigeria',
  phoneDisplay: '0813 890 6940',
  phoneInternational: '+2348138906940', // REPLACE WITH THE VERIFIED WHATSAPP NUMBER
  whatsappVerified: true, // set true only after confirming the number
  email: 'ebzcutz@gmail.com', instagram: 'https://www.instagram.com/ebz_touch_cutz/',
  mapsUrl: 'https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUyCQgAEEUYORigATIHCAEQIRigATIHCAIQIRiPAjIHCAMQIRiPAtIBCDM4NjZqMGo3qAIAsAIA&um=1&ie=UTF-8&fb=1&gl=ng&sa=X&geocode=KRE-aUJI7zsQMeMbiRGG-vjS&daddr=12+Ogunneye+Street,+Grammar+School,+Ikorodu,+Lagos,+Ikorodu,+Lagos',
  rating: '5', reviewCount: '5', currency: '₦', demoMode: false,
  openingHours: { mondayFriday: '9:00 AM – 9:00 PM', saturday: '9:00 AM – 9:00 PM', sunday: '9:00 AM – 9:00 PM' },
  structuredHours: { 0:[9,21],1:[9,21],2:[9,21],3:[9,21],4:[9,21],5:[9,21],6:[9,21] },
  colours: { background:'#0B0B0C',surface:'#141416',text:'#F5F1E8',muted:'#AAA59C',accent:'#C89B5B',accentLight:'#E7C991' }
};

// REPLACE DEMO PRICES with confirmed shop pricing before production.
const SERVICES = [
  {name:'Classic haircut',description:'A clean, balanced cut shaped around your natural growth.',duration:'40 min',price:5000,demo:true},
  {name:'Skin fade',description:'A smooth skin transition with a crisp, detailed finish.',duration:'50 min',price:7000,demo:true},
  {name:'Haircut + beard',description:'A complete reset with a coordinated cut and beard shape.',duration:'65 min',price:9000,demo:true},
  {name:'Beard sculpting',description:'Shape, line and refine your beard for a cleaner profile.',duration:'30 min',price:4000,demo:true},
  {name:"Children's haircut",description:'A patient, comfortable cut for younger clients.',duration:'35 min',price:4000,demo:true},
  {name:'Home / VIP service',description:'A private service request, subject to location and availability.',duration:'By request',price:null,demo:true}
];
// REPLACE with confirmed barber profile(s).
const BARBERS = [{name:'Your lead barber',role:'Precision cuts · fades · beard work',bio:'A proper appointment is more than taking length off. It is a conversation, a careful process and a finish you can confidently wear.',image:'assets/lead-barber.webp',demo:true}];
// REPLACE local image files with real shop work.
const GALLERY = [
  {src:'assets/cut-01.webp',category:'Fades',title:'Fresh fade · clean rear profile'},
  {src:'assets/cut-02.webp',category:'Beards',title:'Detailed beard grooming'},
  {src:'assets/cut-03.webp',category:'Classics',title:'Relaxed classic trim'},
  {src:'assets/cut-04.webp',category:'Fades',title:'Close fade · clipper detail'},
  {src:'assets/cut-05.webp',category:'Transformations',title:'Precision line-up in progress'},
  {src:'assets/cut-06.webp',category:'Classics',title:'Textured finish · final detailing'}
];
// Add only verified client reviews here. Empty by design.
const REVIEWS = [];
const TIMES = ['9:00 AM','10:30 AM','12:00 PM','1:30 PM','3:00 PM','4:30 PM','6:00 PM','7:30 PM'];

const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const escapeHTML=value=>String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const formatPrice=service=>service.price?`${BUSINESS_CONFIG.currency}${service.price.toLocaleString()}${service.demo?' · demo':''}`:'Price on request';

function applyConfig(){
  const c=BUSINESS_CONFIG,root=document.documentElement;
  Object.entries(c.colours).forEach(([k,v])=>root.style.setProperty(`--${k.replace(/[A-Z]/g,m=>'-'+m.toLowerCase())}`,v));
  $$('[data-business-name]').forEach(el=>el.textContent=c.businessName);
  $('#address').textContent=c.fullAddress; $('#footerPhone').textContent=c.phoneDisplay;
  const tel=`tel:${c.phoneInternational.replace(/\s/g,'')}`; ['callLink','finalCallLink','footerPhone'].forEach(id=>$('#'+id).href=tel);
  ['directionsLink','mapLink'].forEach(id=>{const el=$('#'+id);el.href=c.mapsUrl;el.target='_blank';el.rel='noopener'});
  if(c.instagram){const el=$('#instagramLink');el.href=c.instagram;el.hidden=false;el.target='_blank';el.rel='noopener'}
  $('#demoBanner').hidden=!c.demoMode; $('#demoNote').hidden=!c.demoMode;
  if(c.rating&&c.reviewCount){$('#ratingMeta').hidden=false;$('#ratingText').textContent=`${c.rating} · ${c.reviewCount} reviews`}
  $('#year').textContent=new Date().getFullYear();
}

function renderServices(){
  $('#serviceList').innerHTML=SERVICES.map((s,i)=>`<article class="service-item reveal"><span class="service-number">${String(i+1).padStart(2,'0')}</span><h3>${escapeHTML(s.name)}</h3><p class="service-description">${escapeHTML(s.description)}</p><div class="service-meta"><b>${escapeHTML(formatPrice(s))}</b><small>${escapeHTML(s.duration)}</small></div><button class="service-book" data-open-booking data-service="${escapeHTML(s.name)}" aria-label="Book ${escapeHTML(s.name)}">↗</button></article>`).join('');
  $('#bookingServices').innerHTML=SERVICES.map((s,i)=>`<div class="choice"><input type="radio" id="service${i}" name="service" value="${escapeHTML(s.name)}" required><label for="service${i}"><span>${escapeHTML(s.name)}</span><small>${escapeHTML(formatPrice(s))}</small></label></div>`).join('');
}
function renderBookingChoices(){
  $('#bookingBarbers').innerHTML=[...BARBERS.map(b=>b.name),'No preference'].map((name,i)=>`<div class="choice"><input type="radio" id="barber${i}" name="barber" value="${escapeHTML(name)}" required><label for="barber${i}">${escapeHTML(name)}</label></div>`).join('');
  $('#bookingTimes').innerHTML=TIMES.map((time,i)=>`<div class="choice"><input type="radio" id="time${i}" name="time" value="${time}" required><label for="time${i}">${time}</label></div>`).join('');
  const date=$('[name="date"]');date.min=new Date().toISOString().split('T')[0];
}
function renderGallery(){
  const categories=['All',...new Set(GALLERY.map(x=>x.category))];
  $('#galleryFilters').innerHTML=categories.map((c,i)=>`<button class="filter-button${i===0?' active':''}" data-filter="${c}" aria-pressed="${i===0}">${c}</button>`).join('');
  $('#gallery').innerHTML=GALLERY.map((g,i)=>`<button class="gallery-item image-shell" data-index="${i}" data-category="${g.category}" data-fallback="${escapeHTML(g.category.toUpperCase())}"><img src="${g.src}" loading="lazy" width="700" height="900" alt="${escapeHTML(g.title)}"><figcaption>${escapeHTML(g.title)}</figcaption></button>`).join('');
  $('#galleryFilters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;$$('.filter-button').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)});$$('.gallery-item').forEach(x=>x.classList.toggle('is-hidden',b.dataset.filter!=='All'&&x.dataset.category!==b.dataset.filter))});
}
function renderHours(){
  const h=BUSINESS_CONFIG.openingHours;$('#hoursList').innerHTML=`<div class="hours-row"><span>Monday–Friday</span><b>${h.mondayFriday}</b></div><div class="hours-row"><span>Saturday</span><b>${h.saturday}</b></div><div class="hours-row"><span>Sunday</span><b>${h.sunday}</b></div>`;
}
function updateOpenStatus(){
  const now=new Date(),range=BUSINESS_CONFIG.structuredHours[now.getDay()],hour=now.getHours()+now.getMinutes()/60,open=range&&hour>=range[0]&&hour<range[1];
  $('#openStatus').textContent=open?'Open now':'Closed now';$('#trustStatus').textContent=open?'Open now':'Open today from 9:00 AM';
}
function setupImages(){
  $$('img').forEach(img=>{const fail=()=>img.classList.add('is-missing');img.addEventListener('error',fail,{once:true});if(img.complete&&!img.naturalWidth)fail()});
}
function setupNavigation(){
  const header=$('#siteHeader'),nav=$('#siteNav'),toggle=$('#menuToggle');
  addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30),{passive:true});
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
  nav.addEventListener('click',e=>{if(e.target.matches('a')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){$$('#siteNav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`))}}),{rootMargin:'-30% 0px -60%'});
  $$('main section[id]').forEach(s=>observer.observe(s));
}
function setupReveals(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(x=>io.observe(x))}

let lastFocus=null,currentStep=1,lightboxIndex=0;
function trapFocus(container,e){if(e.key!=='Tab')return;const items=$$('button:not([disabled]),a[href],input:not([disabled]),textarea:not([disabled])',container).filter(x=>!x.closest('[hidden]')&&x.offsetParent!==null);if(!items.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
function openBooking(service='',barber=''){
  lastFocus=document.activeElement;const modal=$('#bookingModal');modal.hidden=false;document.body.classList.add('modal-open');currentStep=1;$('#bookingForm').reset();if(service){const input=$(`input[name="service"][value="${CSS.escape(service)}"]`);if(input)input.checked=true}if(barber){const input=$(`input[name="barber"][value="${CSS.escape(barber)}"]`);if(input)input.checked=true}showStep();$('.close-button',modal).focus();
}
function closeBooking(){const modal=$('#bookingModal');modal.hidden=true;document.body.classList.remove('modal-open');lastFocus?.focus()}
function showStep(){
  $$('.booking-step').forEach(s=>s.classList.toggle('is-active',Number(s.dataset.step)===currentStep));$('#stepLabel').textContent=`Step ${currentStep} of 6`;$('#progressBar').style.width=`${currentStep/6*100}%`;$('#backButton').hidden=currentStep===1;$('#nextButton').textContent=currentStep===6?(BUSINESS_CONFIG.demoMode?'Preview complete':'Continue to WhatsApp'):'Continue';$('#formError').textContent='';if(currentStep===6)renderSummary();
}
function stepValid(){const step=$(`.booking-step[data-step="${currentStep}"]`),required=$$('[required]',step),valid=required.every(x=>x.type==='radio'?$$(`[name="${x.name}"]`,step).some(y=>y.checked):x.checkValidity());if(!valid){$('#formError').textContent='Please complete this step before continuing.';const first=required.find(x=>x.type==='radio'?!$$(`[name="${x.name}"]`,step).some(y=>y.checked):!x.checkValidity());first?.focus()}return valid}
function bookingData(){return Object.fromEntries(new FormData($('#bookingForm')).entries())}
function renderSummary(){const d=bookingData(),date=d.date?new Date(`${d.date}T12:00:00`).toLocaleDateString('en-NG',{weekday:'short',day:'numeric',month:'long',year:'numeric'}):'';$('#bookingSummary').innerHTML=[['Name',d.name],['Service',d.service],['Barber',d.barber],['Date',date],['Time',d.time],d.note?['Note',d.note]:null].filter(Boolean).map(x=>`<div class="summary-row"><span>${x[0]}</span><b>${escapeHTML(x[1]||'—')}</b></div>`).join('')}
function submitBooking(){
  const d=bookingData();if(BUSINESS_CONFIG.demoMode||!BUSINESS_CONFIG.whatsappVerified){showToast('Demo complete — add and verify the WhatsApp number to enable sending.');return}
  const date=new Date(`${d.date}T12:00:00`).toLocaleDateString('en-NG',{weekday:'long',day:'numeric',month:'long',year:'numeric'});const note=d.note?` Note: ${d.note}`:'';const msg=`Hello ${BUSINESS_CONFIG.businessName}, my name is ${d.name}. I would like to request a ${d.service} appointment with ${d.barber} on ${date} at ${d.time}.${note} Please confirm availability. Source: website.`;const number=BUSINESS_CONFIG.phoneInternational.replace(/\D/g,'');open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`,'_blank','noopener');closeBooking();
}
function setupBooking(){
  document.addEventListener('click',e=>{const trigger=e.target.closest('[data-open-booking]');if(trigger)openBooking(trigger.dataset.service||'',trigger.dataset.barber||'');if(e.target.closest('[data-close-booking]'))closeBooking()});
  $('#nextButton').addEventListener('click',()=>{if(currentStep<6){if(!stepValid())return;currentStep++;showStep()}else submitBooking()});$('#backButton').addEventListener('click',()=>{if(currentStep>1){currentStep--;showStep()}});
  $('#bookingModal').addEventListener('keydown',e=>{if(e.key==='Escape')closeBooking();trapFocus($('#bookingModal'),e)});
}
function openLightbox(index){lightboxIndex=index;lastFocus=document.activeElement;const g=GALLERY[index],box=$('#lightbox');$('#lightboxImage').innerHTML=`<img src="${g.src}" alt="${escapeHTML(g.title)}">`;$('#lightboxImage').dataset.fallback=g.category.toUpperCase();$('#lightboxCaption').textContent=g.title;box.hidden=false;document.body.classList.add('modal-open');setupImages();$('[data-close-lightbox]',box).focus()}
function closeLightbox(){const box=$('#lightbox');box.hidden=true;document.body.classList.remove('modal-open');lastFocus?.focus()}
function moveLightbox(dir){lightboxIndex=(lightboxIndex+dir+GALLERY.length)%GALLERY.length;openLightbox(lightboxIndex)}
function setupLightbox(){
  $('#gallery').addEventListener('click',e=>{const item=e.target.closest('[data-index]');if(item)openLightbox(Number(item.dataset.index))});$('#lightboxPrev').addEventListener('click',()=>moveLightbox(-1));$('#lightboxNext').addEventListener('click',()=>moveLightbox(1));document.addEventListener('click',e=>{if(e.target.closest('[data-close-lightbox]'))closeLightbox()});$('#lightbox').addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')moveLightbox(-1);if(e.key==='ArrowRight')moveLightbox(1);trapFocus($('#lightbox'),e)});
}
function showToast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3200)}
function init(){applyConfig();renderServices();renderBookingChoices();renderGallery();renderHours();updateOpenStatus();setupImages();setupNavigation();setupReveals();setupBooking();setupLightbox()}
document.addEventListener('DOMContentLoaded',init);
