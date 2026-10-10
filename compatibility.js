'use strict';
// Shared renderer for the public site and the sandboxed Media Creator.
// All publisher text is rendered as text, never interpreted as markup.
window.TanadosCompatibility = function(container, catalog, options = {}) {
  if (!catalog || catalog.schemaVersion !== 1 || !Array.isArray(catalog.games) || catalog.games.length > 2000 || !catalog.policy?.bg || !catalog.policy?.en) throw Error('Invalid game catalog');
  const date = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  const https = value => typeof value === 'string' && new URL(value).protocol === 'https:';
  const ids = new Set();
  for (const game of catalog.games) {
    if (typeof game.title !== 'string' || typeof game.id !== 'string' || ids.has(game.id) || !https(game.sourceUrl) || !date(game.checkedAt) || !game.reason?.bg || !game.reason?.en
      || !['native', 'proton', 'unknown', 'unsupported'].includes(game.launchPlatform)
      || !['verified', 'unverified', 'needs-setup', 'unsupported'].includes(game.playStatus)
      || !['verified', 'native', 'unverified', 'unsupported', 'not-applicable'].includes(game.multiplayerStatus)) throw Error('Invalid game evidence');
    ids.add(game.id);
    if (game.multiplayerStatus === 'verified' && game.playStatus !== 'verified') throw Error('Online verification requires gameplay evidence');
    if (game.playStatus === 'verified') {
      const v = game.verification;
      if (!v || !['native', 'proton'].includes(game.launchPlatform) || !['observed-gameplay', 'owner-confirmed-gameplay'].includes(v.kind) || !date(v.testedAt) || v.testedAt > game.checkedAt
        || !v.runtime || !v.hardware || !https(v.reportUrl) || !v.summary?.bg || !v.summary?.en || !v.limitations?.bg || !v.limitations?.en) throw Error('Verified games require a dated gameplay report');
    }
  }
  const games = catalog.games.slice();
  if (catalog.community) {
    const community = catalog.community;
    if (community.schemaVersion !== 1 || community.provider !== 'ProtonDB' || community.license !== 'ODbL-1.0' || !date(community.snapshotAt) || !https(community.sourceUrl) || !Array.isArray(community.games) || community.games.length > 60000) throw Error('Invalid community catalog');
    const appIds = new Set();
    const localApps = new Map(games.filter(g => g.steamAppId).map(g => [g.steamAppId, g]));
    for (const item of community.games) {
      if (!Number.isInteger(item.appId) || item.appId <= 0 || appIds.has(item.appId) || typeof item.title !== 'string' || !item.title || item.title.length > 300 || !Number.isInteger(item.successfulReports) || !Number.isInteger(item.totalReports) || item.successfulReports < 1 || item.totalReports < item.successfulReports || !date(item.lastReportAt) || !date(item.lastSuccessAt) || item.lastSuccessAt > item.lastReportAt || item.lastReportAt > community.snapshotAt || typeof item.latestWorking !== 'boolean' || !['legacy','official','experimental','ge','older','notListed'].includes(item.variant)) throw Error('Invalid ProtonDB report summary');
      appIds.add(item.appId);
      if (localApps.has(item.appId)) { localApps.get(item.appId).communityInfo = item; continue; }
      games.push({id:'protondb-' + item.appId, title:item.title, steamAppId:item.appId, launchPlatform:'proton', playStatus:'community', multiplayerStatus:'unverified', checkedAt:community.snapshotAt, sourceUrl:'https://www.protondb.com/app/' + item.appId, communityInfo:item,
        reason:{bg:'Има успешни Proton отчети от Linux/Steam Deck потребители. Прочети настройките и актуалните отчети; не е личен тест на Tanados.', en:'Successful Proton reports from Linux/Steam Deck players. Read the settings and current reports; this is not a Tanados gameplay test.'}});
    }
  }
  games.sort((a,b) => Number(b.playStatus === 'verified') - Number(a.playStatus === 'verified') || Number(a.playStatus === 'community') - Number(b.playStatus === 'community') || a.title.localeCompare(b.title));
  let language = options.language === 'bg' ? 'bg' : 'en';
  const chosen = new Set(options.selected || []);
  const text = (bg, en) => language === 'bg' ? bg : en;
  const node = (tag, content, className) => {const e = document.createElement(tag); if (content) e.textContent = content; if (className) e.className = className; return e;};
  const searchLabel = node('label', '', 'compat-search-label');
  const search = node('input'); search.type = 'search'; search.autocomplete = 'off'; searchLabel.append(search);
  const filters = node('div', '', 'compat-filters'); filters.setAttribute('role', 'group');
  let filter = 'all', page = 0;
  const pageSize = 24;
  const filterNames = {all: ['Всички', 'All games'], verified: ['Проверени', 'Verified'], community: ['Proton общност', 'Proton community'], unverified: ['За проверка', 'Needs testing'], unsupported: ['Неподдържани', 'Unsupported']};
  const matches = (game, value) => value === 'all' || (value === 'community' ? Boolean(game.communityInfo) : value === 'unverified' ? ['unverified', 'needs-setup'].includes(game.playStatus) : game.playStatus === value);
  const counts = Object.fromEntries(Object.keys(filterNames).map(key => [key, games.filter(g => matches(g,key)).length]));
  const buttons = Object.entries(filterNames).map(([value]) => {const button = node('button'); button.type = 'button'; button.addEventListener('click', () => {filter = value; page = 0; render();}); filters.append(button); return {button, value};});
  const summary = node('p', '', 'compat-summary'); summary.setAttribute('aria-live', 'polite');
  const policy = node('p', '', 'compat-policy');
  const list = node('div', '', 'compat-list');
  const empty = node('p', '', 'compat-empty');
  const pagination = node('div', '', 'compat-pagination');
  const previous = node('button'), next = node('button'), pageLabel = node('span');
  previous.type = next.type = 'button';
  previous.addEventListener('click', () => {page--; render(); list.scrollTop = 0;});
  next.addEventListener('click', () => {page++; render(); list.scrollTop = 0;});
  pagination.append(previous, pageLabel, next);
  const attribution = node('p', '', 'compat-attribution');
  container.removeAttribute("data-i18n");
  container.replaceChildren(searchLabel, filters, summary, policy, attribution, list, empty, pagination);
  function render() {
    search.placeholder = text('Търси любимите си игри', 'Search your favorite games');
    search.setAttribute('aria-label', search.placeholder);
    filters.setAttribute('aria-label', text('Статус на проверката', 'Verification status'));
    for (const {button, value} of buttons) {button.textContent = text(...filterNames[value]) + ' (' + counts[value] + ')'; button.setAttribute('aria-pressed', String(filter === value));}
    policy.textContent = catalog.policy[language];
    if (catalog.community) {
      attribution.replaceChildren(document.createTextNode(text('ProtonDB · снимка на данните: ', 'ProtonDB · data snapshot: ') + catalog.community.snapshotAt + ' · '));
      const source = node('a', text('Източник и лиценз ODbL ↗', 'Source and ODbL license ↗'));
      source.href = 'https://github.com/bdefore/protondb-data'; source.target = '_blank'; source.rel = 'noopener noreferrer';
      if (options.openSource) source.addEventListener('click', e => {e.preventDefault(); options.openSource(source.href);});
      attribution.append(source);
    }
    const unsupported = games.filter(g => chosen.has(g.id) && g.playStatus === 'unsupported');
    summary.textContent = text('Избрани игри: ', 'Selected games: ') + chosen.size + (unsupported.length
      ? text(' · Неподдържани: ', ' · Unsupported: ') + unsupported.map(g=>g.title).join(', ') : text(' · Провери gameplay преди да замениш Windows.', ' · Check gameplay before replacing Windows.'));
    summary.classList.toggle('compat-warning', unsupported.length > 0);
    list.replaceChildren();
    const query = search.value.toLocaleLowerCase().trim();
    const searched = games.filter(g => g.title.toLocaleLowerCase().includes(query));
    const filtered = searched.filter(g => matches(g, filter));
    const pages = Math.max(1, Math.ceil(filtered.length / pageSize)); page = Math.min(Math.max(0,page), pages-1);
    previous.textContent = text('← Назад', '← Previous'); next.textContent = text('Следваща →', 'Next →');
    previous.disabled = page === 0; next.disabled = page === pages - 1;
    pageLabel.textContent = text('Страница ', 'Page ') + (page + 1) + ' / ' + pages + ' · ' + filtered.length + text(' игри', ' games');
    pagination.hidden = filtered.length <= pageSize;
    empty.hidden = filtered.length > 0;
    empty.textContent = searched.length ? text('Няма игри с този статус. Избери „Всички“.', 'No games match this status. Choose All games.') : text('Играта не е в каталога. Съвместимостта ѝ е непроверена.', 'This game is outside the catalog. Its compatibility is unverified.');
    for (const game of filtered.slice(page * pageSize, (page + 1) * pageSize)) {
      const card = node('article', '', 'compat-game');
      const label = node('label', '', 'compat-game-title');
      const checkbox = node('input'); checkbox.type = 'checkbox'; checkbox.dataset.gameId = game.id; checkbox.checked = chosen.has(game.id);
      checkbox.addEventListener('change', () => {if (checkbox.checked) chosen.add(game.id); else chosen.delete(game.id); options.onSelection?.([...chosen]); render(); [...list.querySelectorAll('input')].find(i=>i.dataset.gameId === game.id)?.focus({preventScroll:true});});
      label.append(checkbox, node('span', game.title));
      const badges = node('p', '', 'compat-badges');
      badges.append(node('span', game.launchPlatform === 'native' ? 'Linux' : game.launchPlatform === 'proton' ? (game.playStatus === 'verified' ? 'Proton' : text('Предложен Proton маршрут', 'Proposed Proton route')) : text('Неподдържана локално', 'Unsupported locally')));
      const status = {verified: text('✓ Проверена и работеща', '✓ Verified working'), community: text('ProtonDB: успешни отчети', 'ProtonDB: successful reports'), unsupported: text('Неподдържана', 'Unsupported'), 'needs-setup': text('Нуждае се от настройка / нов тест', 'Needs setup / retest'), unverified: text('Непроверена в Tanados', 'Untested on Tanados')}[game.playStatus];
      badges.append(node('span', status, 'compat-' + game.playStatus));
      card.dataset.gameId = game.id; card.dataset.playStatus = game.playStatus;
      const multiplayer = node('p', text('Онлайн: ', 'Online: ') + ({verified: text('проверена игра на посочения сървър', 'gameplay verified on the recorded server'), native: text('Linux версия с multiplayer; непроверена в Tanados', 'Linux multiplayer build; untested on Tanados'), unverified: text('изисква отделна проверка', 'requires a separate check'), unsupported: text('неподдържан', 'unsupported'), 'not-applicable': text('single-player игра', 'single-player game')}[game.multiplayerStatus] || text('непроверен', 'unverified')), 'compat-online');
      const reason = node('p', game.reason[language], 'compat-reason');
      const link = node('a', text('Сайт на играта', 'Game website')); link.href = game.sourceUrl; link.target = '_blank'; link.rel = 'noopener noreferrer';
      if (options.openSource) link.addEventListener('click', e=>{e.preventDefault(); options.openSource(game.sourceUrl);});
      const source = node('p', '', 'compat-source'); source.append(link, document.createTextNode(' · ' + game.checkedAt));
      card.append(label, badges, reason, multiplayer);
      if (game.communityInfo) {
        const c = game.communityInfo;
        const info = node('p', 'ProtonDB: ' + c.successfulReports + '/' + c.totalReports + text(' успешни отчета · Последен успех: ', ' successful reports · Last success: ') + c.lastSuccessAt + ' · ' + c.variant + (c.latestWorking ? '' : text(' · Последният отчет съобщава проблем (' + c.lastReportAt + ').', ' · Latest report describes a problem (' + c.lastReportAt + ').')), 'compat-community-report');
        card.append(info);
        const report = node('a', text('Актуални ProtonDB отчети ↗', 'Current ProtonDB reports ↗'));
        report.href = 'https://www.protondb.com/app/' + game.steamAppId; report.target = '_blank'; report.rel = 'noopener noreferrer';
        if (options.openSource) report.addEventListener('click', e => {e.preventDefault(); options.openSource(report.href);});
        card.append(report);
      }
      if (game.playStatus === 'verified') {
        const v = game.verification;
        const evidence = node('details', '', 'compat-evidence');
        evidence.append(node('summary', text('Проверка: ', 'Tested: ') + v.testedAt + ' · ' + v.runtime));
        evidence.append(node('p', v.summary[language]), node('p', v.hardware), node('p', v.limitations[language]));
        const report = node('a', text('Запис на проверката ↗', 'Test record ↗')); report.href = v.reportUrl; report.target = '_blank'; report.rel = 'noopener noreferrer';
        if (options.openSource) report.addEventListener('click', e => {e.preventDefault(); options.openSource(v.reportUrl);});
        evidence.append(report); card.append(evidence);
      }
      card.append(source); list.append(card);
    }
  }
  search.addEventListener('input', () => {page = 0; render();}); render();
  return {language(value) {language = value === 'bg' ? 'bg' : 'en'; render();}, selected() {return [...chosen];}};
};
