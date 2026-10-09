'use strict';
const $ = s=>document.querySelector(s), $$ = s=>[...document.querySelectorAll(s)];
const repo='helldragonpz/TanadosLinux-Downloads',tag='v0.2.0-tide-preview';
const assetBase='https://github.com/'+repo+'/releases/download/'+tag+'/';
const isoUrl='https://wow.tanados.com/downloads/tanados-linux/0.2.0/Tanados-Obsidian-Tide-0.2.0-amd64.iso';
const isoHash='3602f03448608cad93cbcbde550769b542aa751ab6c78a8ec8b704ea980777eb';
let copy={bg:Object.fromEntries($$('[data-i18n]').map(e=>[e.dataset.i18n,e.textContent])),en:{}},language='bg',release=null,palette='tide';
try{if(localStorage.getItem('tanados-language')==='en')language='en';}catch{}
const requested=new URLSearchParams(location.search).get('lang');if(['bg','en'].includes(requested))language=requested;
Object.assign(copy.bg,{
 'download.linux':'Инсталирай DEB на Ubuntu / Debian. Portable архивът е алтернатива за системи с работещ Chromium sandbox.',
 'download.copied':'Копирано',
 'download.copyFailed':'Избери и копирай хеша ръчно.',
 'appearance.copper':'Топъл въглен, пясък и медни акценти.',
 'appearance.glacier':'Мастилено синьо, лед и блед циан.'
});
let platform=/Linux/i.test(navigator.userAgent)&&!/Android/i.test(navigator.userAgent)?'linux':'windows';
const translate=k=>copy[language][k]||copy.bg[k]||k;
function applyLanguage(){
 document.documentElement.lang=language;
 document.title=document.body.dataset.page==='install'?(language==='bg'?'Инсталиране на Tanados Linux 0.2.0':'Install Tanados Linux 0.2.0'):'Tanados Linux — Obsidian Tide 0.2.0';
 $$('[data-i18n]').forEach(e=>e.textContent=translate(e.dataset.i18n));
 $$('[data-alt]').forEach(e=>e.alt=translate(e.dataset.alt));
 $$('[data-aria]').forEach(e=>e.setAttribute('aria-label',translate(e.dataset.aria)));
 $$('[data-shot]').forEach(e=>e.setAttribute('aria-label',translate(e.dataset.caption)));
 $('#language').textContent=language==='bg'?'EN':'BG';$('#language').setAttribute('aria-label',language==='bg'?'Switch to English':'Премини на български');
 $$('[data-guide-link]').forEach(e=>e.href='install.html?lang='+language);
 if($('#offline-guide'))$('#offline-guide').href='https://github.com/'+repo+'/blob/main/INSTALL'+(language==='bg'?'.bg':'')+'.md';
 renderPlatform();renderPalette();if($('#image-dialog').open)renderImage();
}
$('#language').addEventListener('click',()=>{
 language=language==='bg'?'en':'bg';try{localStorage.setItem('tanados-language',language);}catch{}
 const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(null,'',url);applyLanguage();
});
function renderPlatform(){
 $$('[data-platform]').forEach(b=>{const s=b.dataset.platform===platform;b.classList.toggle('selected',s);b.setAttribute('aria-pressed',String(s));});
 const creatorBase='https://github.com/'+repo+'/releases/download/'+(release?.mediaCreator?.tag||'v0.2.1-media-creator')+'/';
 const file=release?.mediaCreator?.[platform]?.name||(platform==='windows'?'Tanados-Media-Creator-0.2.1-Windows-x64.zip':'Tanados-Media-Creator-0.2.1-Linux-amd64.deb');
 if($('#creator-download')){$('#creator-download').href=creatorBase+file;$('#creator-download').textContent='Media Creator · '+(platform==='windows'?'Windows ZIP':'Linux DEB')+' ↓';}
 if($('#creator-size'))$('#creator-size').textContent=Math.round((release?.mediaCreator?.[platform]?.size||(platform==='windows'?159e6:96e6))/1e6)+' MB · Media Creator 0.2.1 · '+(platform==='windows'?'Windows 10 / 11 · x64':'Ubuntu / Debian · amd64');
 if($('#creator-instructions'))$('#creator-instructions').textContent=translate('download.'+platform);
 if($('#creator-command'))$('#creator-command').hidden=platform!=='linux';
 if($('#portable-download')){$('#portable-download').hidden=platform!=='linux';$('#portable-download').href=creatorBase+(release?.mediaCreator?.portable?.name||'Tanados-Media-Creator-0.2.1-Linux-x64.tar.gz');}
 if($('#join-download')){$('#join-download').href=assetBase+'Join-Tanados-ISO.'+(platform==='windows'?'ps1':'sh');$('#join-download').textContent=translate('download.join')+' · '+(platform==='windows'?'Windows':'Linux')+' ↓';}
 if($('#join-command'))$('#join-command').textContent=platform==='windows'?'powershell -NoProfile -ExecutionPolicy Bypass -File .\\Join-Tanados-ISO.ps1':'bash ./Join-Tanados-ISO.sh';
}
$$('[data-platform]').forEach(b=>b.addEventListener('click',()=>{platform=b.dataset.platform;renderPlatform();}));
function renderPalette(){
 $$('button[data-palette]').forEach(b=>{const s=b.dataset.palette===palette;b.classList.toggle('selected',s);b.setAttribute('aria-pressed',String(s));});
 if($('.terminal-demo'))$('.terminal-demo').dataset.palette=palette;
 if($('#palette-description'))$('#palette-description').textContent=translate('appearance.'+palette);
 if($('#terminal-theme'))$('#terminal-theme').textContent={tide:'Tide',copper:'Copper',glacier:'Glacier'}[palette];
}
$$('button[data-palette]').forEach(b=>b.addEventListener('click',()=>{palette=b.dataset.palette;renderPalette();}));
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{
 $$('[data-filter]').forEach(o=>{o.classList.toggle('selected',o===b);o.setAttribute('aria-pressed',String(o===b));});
 $$('.app-card').forEach(c=>c.hidden=b.dataset.filter!=='all'&&c.dataset.category!==b.dataset.filter);
}));
$$('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>$('.mobile-nav').open=false));
const gallery=[...new Map($$('[data-shot]').map(e=>[e.dataset.shot,{file:e.dataset.shot,caption:e.dataset.caption}])).values()];
let imageIndex=0,returnFocus=null;const dialog=$('#image-dialog');
function renderImage(){const item=gallery[imageIndex];$('#image-full').src='assets/'+item.file;$('#image-full').alt=translate(item.caption);$('#image-caption').textContent=translate(item.caption);$('#image-count').textContent=(imageIndex+1)+' / '+gallery.length;}
function openImage(file,trigger){imageIndex=gallery.findIndex(i=>i.file===file);if(imageIndex<0)return;returnFocus=trigger;renderImage();dialog.showModal();document.body.classList.add('modal-open');}
$$('[data-shot]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();openImage(b.dataset.shot,b);}));
$$('[data-open-shot]').forEach(b=>b.addEventListener('click',()=>openImage(b.dataset.openShot,b)));
$('#image-close').addEventListener('click',()=>dialog.close());
function moveImage(d){imageIndex=(imageIndex+d+gallery.length)%gallery.length;renderImage();}
$('#image-previous').addEventListener('click',()=>moveImage(-1));$('#image-next').addEventListener('click',()=>moveImage(1));
dialog.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();moveImage(e.key==='ArrowLeft'?-1:1);}});
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');returnFocus?.focus({preventScroll:true});});
$('#copy-hash')?.addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText(isoHash);$('#copy-status').textContent=translate('download.copied');}
 catch{$('#copy-status').textContent=translate('download.copyFailed');const s=getSelection(),r=document.createRange();r.selectNodeContents($('#iso-hash'));s.removeAllRanges();s.addRange(r);}
});
function validateRelease(d){
 if(d.version!=='0.2.0'||d.repository!==repo||d.tag!==tag||d.ready!==true)throw Error('Unexpected release');
 if(d.iso?.url!==isoUrl||d.iso?.checksumUrl!==isoUrl+'.sha256'||d.iso?.sha256!==isoHash||d.iso?.size!==6446008320)throw Error('Unexpected ISO');
 if(d.iso.parts?.length!==4)throw Error('Missing fallback parts');let size=0;
 d.iso.parts.forEach((p,i)=>{if(p.name!=='Tanados-Obsidian-Tide-0.2.0-amd64.iso.part0'+(i+1)||!Number.isSafeInteger(p.size)||p.size<=0||p.size>=2147483648)throw Error('Invalid part');size+=p.size;});
 if(size!==d.iso.size)throw Error('Invalid image size');
 if(d.mediaCreator?.tag!=='v0.2.1-media-creator'||d.mediaCreator?.version!=='0.2.1')throw Error('Unexpected Media Creator');
 for(const k of ['windows','linux','portable']){const a=d.mediaCreator?.[k];if(!a||!/^[A-Za-z0-9_.-]+$/.test(a.name)||!Number.isSafeInteger(a.size)||a.size<=0)throw Error('Invalid package');}return d;
}
fetch('content.json').then(r=>{if(!r.ok)throw Error('Translation file');return r.json();}).then(d=>{if(!d.bg||!d.en||Object.keys(d.bg).length!==Object.keys(d.en).length)throw Error('Incomplete translation');copy=d;applyLanguage();}).catch(()=>{language='bg';applyLanguage();$('#language').disabled=true;});
fetch('release.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Release file');return r.json();}).then(d=>{release=validateRelease(d);renderPlatform();}).catch(()=>{if($('#release-error'))$('#release-error').hidden=false;});
if(language==='bg')applyLanguage();
