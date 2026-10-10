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
  let language = options.language === 'bg' ? 'bg' : 'en';
  const chosen = new Set(options.selected || []);
  const text = (bg, en) => language === 'bg' ? bg : en;
  const node = (tag, content, className) => {const e = document.createElement(tag); if (content) e.textContent = content; if (className) e.className = className; return e;};
  const searchLabel = node('label', '', 'compat-search-label');
  const search = node('input'); search.type = 'search'; search.autocomplete = 'off'; searchLabel.append(search);
  const filters = node('div', '', 'compat-filters'); filters.setAttribute('role', 'group');
  let filter = 'all';
  const filterNames = {all: ['Всички', 'All games'], verified: ['Проверени', 'Verified'], unverified: ['За проверка', 'Needs testing'], unsupported: ['Неподдържани', 'Unsupported']};
  const matches = (game, value) => value === 'all' || (value === 'unverified' ? ['unverified', 'needs-setup'].includes(game.playStatus) : game.playStatus === value);
  const buttons = Object.entries(filterNames).map(([value]) => {const button = node('button'); button.type = 'button'; button.addEventListener('click', () => {filter = value; render();}); filters.append(button); return {button, value};});
  const summary = node('p', '', 'compat-summary'); summary.setAttribute('aria-live', 'polite');
  const policy = node('p', '', 'compat-policy');
  const list = node('div', '', 'compat-list');
  const empty = node('p', '', 'compat-empty');
  container.removeAttribute("data-i18n");
  container.replaceChildren(searchLabel, filters, summary, policy, list, empty);
  function render() {
    search.placeholder = text('Търси любимите си игри', 'Search your favorite games');
    search.setAttribute('aria-label', search.placeholder);
    filters.setAttribute('aria-label', text('Статус на проверката', 'Verification status'));
    for (const {button, value} of buttons) {button.textContent = text(...filterNames[value]) + ' (' + catalog.games.filter(g => matches(g, value)).length + ')'; button.setAttribute('aria-pressed', String(filter === value));}
    policy.textContent = catalog.policy[language];
    const unsupported = catalog.games.filter(g => chosen.has(g.id) && g.playStatus === 'unsupported');
    summary.textContent = text('Избрани игри: ', 'Selected games: ') + chosen.size + (unsupported.length
      ? text(' · Неподдържани: ', ' · Unsupported: ') + unsupported.map(g=>g.title).join(', ') : text(' · Провери gameplay преди да замениш Windows.', ' · Check gameplay before replacing Windows.'));
    summary.classList.toggle('compat-warning', unsupported.length > 0);
    list.replaceChildren();
    const searched = catalog.games.filter(g => g.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase().trim()));
    const filtered = searched.filter(g => matches(g, filter)).sort((a, b) => Number(b.playStatus === 'verified') - Number(a.playStatus === 'verified'));
    empty.hidden = filtered.length > 0;
    empty.textContent = searched.length ? text('Няма игри с този статус. Избери „Всички“.', 'No games match this status. Choose All games.') : text('Играта не е в каталога. Съвместимостта ѝ е непроверена.', 'This game is outside the catalog. Its compatibility is unverified.');
    for (const game of filtered) {
      const card = node('article', '', 'compat-game');
      const label = node('label', '', 'compat-game-title');
      const checkbox = node('input'); checkbox.type = 'checkbox'; checkbox.dataset.gameId = game.id; checkbox.checked = chosen.has(game.id);
      checkbox.addEventListener('change', () => {if (checkbox.checked) chosen.add(game.id); else chosen.delete(game.id); options.onSelection?.([...chosen]); render(); [...list.querySelectorAll('input')].find(i=>i.dataset.gameId === game.id)?.focus({preventScroll:true});});
      label.append(checkbox, node('span', game.title));
      const badges = node('p', '', 'compat-badges');
      badges.append(node('span', game.launchPlatform === 'native' ? 'Linux' : game.launchPlatform === 'proton' ? (game.playStatus === 'verified' ? 'Proton' : text('Предложен Proton маршрут', 'Proposed Proton route')) : text('Неподдържана локално', 'Unsupported locally')));
      const status = {verified: text('✓ Проверена и работеща', '✓ Verified working'), unsupported: text('Неподдържана', 'Unsupported'), 'needs-setup': text('Нуждае се от настройка / нов тест', 'Needs setup / retest'), unverified: text('Непроверена в Tanados', 'Untested on Tanados')}[game.playStatus];
      badges.append(node('span', status, 'compat-' + game.playStatus));
      card.dataset.gameId = game.id; card.dataset.playStatus = game.playStatus;
      const multiplayer = node('p', text('Онлайн: ', 'Online: ') + ({verified: text('проверена игра на посочения сървър', 'gameplay verified on the recorded server'), native: text('Linux версия с multiplayer; непроверена в Tanados', 'Linux multiplayer build; untested on Tanados'), unverified: text('изисква отделна проверка', 'requires a separate check'), unsupported: text('неподдържан', 'unsupported'), 'not-applicable': text('single-player игра', 'single-player game')}[game.multiplayerStatus] || text('непроверен', 'unverified')), 'compat-online');
      const reason = node('p', game.reason[language], 'compat-reason');
      const link = node('a', text('Сайт на играта', 'Game website')); link.href = game.sourceUrl; link.target = '_blank'; link.rel = 'noopener noreferrer';
      if (options.openSource) link.addEventListener('click', e=>{e.preventDefault(); options.openSource(game.sourceUrl);});
      const source = node('p', '', 'compat-source'); source.append(link, document.createTextNode(' · ' + game.checkedAt));
      card.append(label, badges, reason, multiplayer);
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
  search.addEventListener('input', render); render();
  return {language(value) {language = value === 'bg' ? 'bg' : 'en'; render();}, selected() {return [...chosen];}};
};
