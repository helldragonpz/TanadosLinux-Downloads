'use strict';
const english = {
  skip:'Skip to content',navDesktop:'Desktop',navInstall:'Installation',navDownload:'Download ↗',
  heroTitle:'Your desktop.<br><em>A different tide.</em>',heroDescription:'A place for your games, ideas and everyday life. Tanados brings KDE Plasma, our own applications and the Obsidian Tide theme together in one Linux desktop.',heroDownload:'Download Tanados ↓',heroExplore:'Explore the desktop →',heroNote:'For x86-64 PCs and laptops · Free preview',artCaption:'A new palette. A fresh perspective.',foundation:'Built on familiar foundations.',
  desktopEyebrow:'MAKE ROOM FOR YOURSELF',desktopTitle:'Beautiful. Considered.<br>In your hands.',desktopDescription:'Sea-glass teal, warm copper and dark graphite. Inter in your apps, JetBrains Mono in your terminal. A consistent look, from the first boot to the last open window.',appearanceTab:'Theme & fonts',healthTab:'Control Center',mediaTab:'Media Creator',realCapture:'ACTUAL APP INTERFACE',appearanceCaption:'Change the palette, fonts and terminal. Coordinate different wallpapers across landscape and portrait displays.',healthCaption:'See storage, memory and system health together. Recovery, signed updates and laptop controls have their own pages.',mediaCaption:'Create installation media on Windows or Linux. Choose a local ISO, confirm the exact USB and verify the written copy.',
  featureHealthTitle:'Your system, in one place.',featureHealthText:'Keep an eye on storage, memory and system errors. Manage updates, restore points and power profiles from Control Center.',featureCreateTitle:'Work, play and a little Lumi.',featureCreateText:'Tanados Store, Game Library, peripheral controls and Lumi. The GPU Resonance visualizer brings your music into motion.',
  downloadEyebrow:'YOUR NEXT STEP',downloadTitle:'Welcome<br>to Tanados.',downloadDescription:'Start with the live desktop on USB. Explore it before deciding whether to install.',previewNote:'This is a preview release. Turn Secure Boot off for this preview. Back up important files before installation.',releaseNotes:'All files & release notes ↗',platformHint:'Choose the system you will use to create your USB.',releasePreparing:'The new ISO is being prepared. Downloads appear after validation.',releaseError:'Release information could not load. Open GitHub releases to check the available files.',isoDownloadTitle:'Download all four ISO parts',isoDownloadText:'Keep them together in one folder. GitHub limits the size of individual downloads.',joinTitle:'Join & verify',joinText:'The helper joins the parts and checks the complete SHA-256. It does not write to a USB.',joinCommand:'Command to run the helper',creatorTitle:'Download Media Creator',creatorText:'Open the finished ISO, select your USB and create verified installation media.',portable:'Linux portable archive ↗',checksum:'Verify the ISO / SHA-256',checksumsFile:'Download all checksums',
  installEyebrow:'FROM USB TO DESKTOP',installTitle:'Your first boot,<br>one step at a time.',installOneTitle:'Prepare your USB',installOneText:'Use a USB drive of at least 16 GB. Media Creator erases all files on the selected USB and verifies the written image.',installTwoTitle:'Boot from the USB',installTwoText:'Open your computer’s boot menu and select UEFI USB. Secure Boot must be off. Explore the live desktop.',installThreeTitle:'Install when you’re ready',installThreeText:'Open Install Tanados and follow Calamares. Check the target disk and partitioning choice carefully.',requirementsTitle:'Before you begin',requirementsText:'x86-64 processor · at least 4 GB RAM · at least 40 GB storage · 16 GB USB · at least 16 GB free for downloaded parts and the ISO.',testedTitle:'What has been checked',validationPending:'The new image is being checked before publication. This remains a preview; VM checks do not replace physical hardware testing.',fullGuide:'Full installation guide ↗',faqTitle:'Can I keep Windows?',faqText:'The live USB lets you explore Tanados before installing. Dual boot and encrypted installation have not passed acceptance tests for this release. For a first test, use a virtual machine or a separate empty disk.',footerText:'Made for our computers. Shared with friends.',feedback:'Report an issue ↗'
};
const bulgarian = Object.fromEntries([...document.querySelectorAll('[data-i18n]')].map(el => [el.dataset.i18n, ['heroTitle','desktopTitle','downloadTitle','installTitle'].includes(el.dataset.i18n) ? el.innerHTML : el.textContent]));
Object.assign(bulgarian,{healthCaption:'Следи диска, паметта и системното здраве на едно място. Възстановяването, подписаните обновления и настройките за лаптоп имат собствени страници.',mediaCaption:'Създай инсталационна флашка от Windows или Linux. Избери локално ISO, потвърди точната USB флашка и провери записаното копие.',releaseError:'Информацията за версията не се зареди. Отвори GitHub releases, за да провериш наличните файлове.'});
const htmlKeys = new Set(['heroTitle','desktopTitle','downloadTitle','installTitle']);
let language='bg',platform='windows',preview='appearance',release=null,releaseFailed=false;
try { const saved=localStorage.getItem('tanados-language'); if(saved==='en') language=saved; } catch {}
const requested=new URLSearchParams(location.search).get('lang'); if(['en','bg'].includes(requested)) language=requested;
const translate=key => (language==='en'?english:bulgarian)[key] || english[key] || key;
function setText(el,key){if(htmlKeys.has(key))el.innerHTML=translate(key);else el.textContent=translate(key);}
function applyLanguage(){
  document.documentElement.lang=language;
  for(const el of document.querySelectorAll('[data-i18n]')) setText(el,el.dataset.i18n);
  const button=document.getElementById('language'); button.textContent=language==='bg'?'EN':'BG'; button.setAttribute('aria-label',language==='bg'?'Switch to English':'Премини на български');
  setPreview(preview); renderRelease();
}
document.getElementById('language').addEventListener('click',()=>{language=language==='bg'?'en':'bg';try{localStorage.setItem('tanados-language',language);}catch{}applyLanguage();});
const previews={appearance:{file:'appearance.webp',alt:'Tanados Appearance: Tide, Copper and Glacier palettes'},health:{file:'health.webp',alt:'Tanados Control Center: storage, memory and browser document access'},media:{file:'media-creator.webp',alt:'Tanados Media Creator: installation image and USB selection'}};
function setPreview(key){
  preview=key;
  for(const tab of document.querySelectorAll('[data-preview]')){const selected=tab.dataset.preview===key;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;}
  const img=document.getElementById('preview-image'); img.src='assets/'+previews[key].file;img.alt=previews[key].alt;
  document.getElementById('app-preview').setAttribute('aria-labelledby','tab-'+key);
  const caption=document.getElementById('preview-caption');caption.dataset.i18n=key+'Caption';setText(caption,key+'Caption');
}
for(const tab of document.querySelectorAll('[data-preview]')){
  tab.addEventListener('click',()=>setPreview(tab.dataset.preview));
  tab.addEventListener('keydown',event=>{
    const tabs=[...document.querySelectorAll('[data-preview]')],index=tabs.indexOf(tab);
    const next=event.key==='ArrowRight'?(index+1)%tabs.length:event.key==='ArrowLeft'?(index+tabs.length-1)%tabs.length:event.key==='Home'?0:event.key==='End'?tabs.length-1:null;
    if(next!==null){event.preventDefault();setPreview(tabs[next].dataset.preview);tabs[next].focus();}
  });
}
for(const button of document.querySelectorAll('[data-platform]'))button.addEventListener('click',()=>{platform=button.dataset.platform;renderRelease();});
const repository='helldragonpz/TanadosLinux-Downloads';
function assetUrl(name){if(!/^[A-Za-z0-9_.-]+$/.test(name))throw Error('Invalid asset name');return `https://github.com/${repository}/releases/download/${encodeURIComponent(release.tag)}/${encodeURIComponent(name)}`;}
function setDownload(id,name,label){const a=document.getElementById(id);a.href=assetUrl(name);a.textContent=label;a.removeAttribute('hidden');}
function renderRelease(){
  for(const button of document.querySelectorAll('[data-platform]')){const active=button.dataset.platform===platform;button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active));}
  const status=document.getElementById('release-status'),downloads=document.getElementById('release-downloads'),link=document.getElementById('release-link');
  link.href=`https://github.com/${repository}/releases`;link.hidden=!releaseFailed && !release?.ready;
  status.hidden=Boolean(release?.ready);downloads.hidden=!release?.ready;status.textContent=translate(releaseFailed?'releaseError':'releasePreparing');
  if(!release?.ready)return;
  link.href=`https://github.com/${repository}/releases/tag/${encodeURIComponent(release.tag)}`;
  const parts=document.getElementById('iso-parts');parts.replaceChildren();
  release.iso.parts.forEach((part,index)=>{const a=document.createElement('a');a.href=assetUrl(part.name);a.textContent=(language==='bg'?'Част ':'Part ')+(index+1)+' ↓';a.title=part.name+' · '+(part.size/1e9).toFixed(2)+' GB';parts.append(a);});
  document.getElementById('iso-size').textContent=`${(release.iso.size/1e9).toFixed(2)} GB · x86-64 · ${language==='bg'?'Нужни са всички четири части':'All four parts required'}`;
  setDownload('join-download',platform==='windows'?'Join-Tanados-ISO.ps1':'Join-Tanados-ISO.sh',language==='bg'?'Свали помощник за '+(platform==='windows'?'Windows':'Linux')+' ↓':'Download '+(platform==='windows'?'Windows':'Linux')+' join helper ↓');
  document.getElementById('join-command').textContent=platform==='windows'?'powershell -NoProfile -ExecutionPolicy Bypass -File .\\Join-Tanados-ISO.ps1':'bash ./Join-Tanados-ISO.sh';
  const creator=release.mediaCreator[platform];setDownload('creator-download',creator.name,'Media Creator '+(platform==='windows'?'Windows · ZIP':'Linux · DEB')+' ↓');
  document.getElementById('creator-size').textContent=`${(creator.size/1e6).toFixed(0)} MB · ${platform==='windows'?'Windows 10/11 · x64':'Ubuntu / Debian · amd64'}`;
  const portable=document.getElementById('portable-download');portable.hidden=platform!=='linux';if(platform==='linux')portable.href=assetUrl(release.mediaCreator.portable.name);
  document.getElementById('iso-hash').textContent=release.iso.sha256;
  document.getElementById('checksum-download').href=assetUrl('SHA256SUMS');
  const guide=document.getElementById('install-guide');guide.href=`https://github.com/${repository}/blob/main/${language==='bg'?'INSTALL.bg.md':'INSTALL.md'}`;guide.hidden=false;
  const validation=document.getElementById('validation-text');
  const gates=[];if(release.validation.nativeTests)gates.push(language==='bg'?`${release.validation.nativeTests} native теста`:`${release.validation.nativeTests} native tests`);if(release.validation.squashfsAudit)gates.push('SquashFS audit');if(release.validation.uefiBoot)gates.push(language==='bg'?'UEFI стартиране в VM':'UEFI boot in VM');if(release.validation.installedBoot)gates.push(language==='bg'?'инсталация и първо стартиране в VM':'installation and first boot in VM');
  validation.textContent=(language==='bg'?'Проверено: ':'Checked: ')+gates.join(', ')+(language==='bg'?'. Физически PC/лаптоп, Windows USB запис и Secure Boot още не са валидирани за този образ.':'. Physical PC/laptop installation, Windows USB writing and Secure Boot remain unvalidated for this image.');
}
function validateRelease(data){
  if(data.version!=='0.2.0'||data.repository!==repository||data.tag!=='v0.2.0-tide-preview')throw Error('Unexpected release');
  if(!data.ready)return data;
  if(!/^[a-f0-9]{64}$/.test(data.iso?.sha256)||!Number.isSafeInteger(data.iso.size)||data.iso.size<=0||data.iso.parts?.length!==4)throw Error('Incomplete ISO information');
  let total=0;data.iso.parts.forEach((part,index)=>{if(part.name!==`Tanados-Obsidian-Tide-0.2.0-amd64.iso.part0${index+1}`||!Number.isSafeInteger(part.size)||part.size<=0||part.size>=2147483648)throw Error('Invalid part');total+=part.size;});if(total!==data.iso.size)throw Error('Invalid image size');
  for(const key of ['windows','linux','portable']){const asset=data.mediaCreator?.[key];if(!asset||!/^[A-Za-z0-9_.-]+$/.test(asset.name)||!Number.isSafeInteger(asset.size)||asset.size<=0)throw Error('Invalid Media Creator asset');}
  if(!data.validation||!Number.isSafeInteger(data.validation.nativeTests))throw Error('Missing validation');return data;
}
applyLanguage();
fetch('release.json',{cache:'no-cache'}).then(response=>{if(!response.ok)throw Error('Release unavailable');return response.json();}).then(data=>{release=validateRelease(data);renderRelease();}).catch(()=>{releaseFailed=true;renderRelease();});
