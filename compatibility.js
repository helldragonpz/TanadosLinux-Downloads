'use strict';
// Shared renderer for the public site and the sandboxed Media Creator.
// All publisher text is rendered as text, never interpreted as markup.
window.TanadosCompatibility = function(container, catalog, options = {}) {
  if (!catalog || catalog.schemaVersion !== 1 || !Array.isArray(catalog.games) || catalog.games.length > 2000 || !catalog.policy?.bg || !catalog.policy?.en) throw Error('Invalid game catalog');
  for (const game of catalog.games) if (typeof game.title !== 'string' || typeof game.id !== 'string' || new URL(game.sourceUrl).protocol !== 'https:' || !game.reason?.bg || !game.reason?.en) throw Error('Invalid game evidence');
  let language = options.language === 'bg' ? 'bg' : 'en';
  const chosen = new Set(options.selected || []);
  const text = (bg, en) => language === 'bg' ? bg : en;
  const node = (tag, content, className) => {const e = document.createElement(tag); if (content) e.textContent = content; if (className) e.className = className; return e;};
  const searchLabel = node('label', '', 'compat-search-label');
  const search = node('input'); search.type = 'search'; search.autocomplete = 'off'; searchLabel.append(search);
  const summary = node('p', '', 'compat-summary'); summary.setAttribute('aria-live', 'polite');
  const policy = node('p', '', 'compat-policy');
  const list = node('div', '', 'compat-list');
  const empty = node('p', '', 'compat-empty');
  container.removeAttribute("data-i18n");
  container.replaceChildren(searchLabel, summary, policy, list, empty);
  function render() {
    search.placeholder = text('Търси любимите си игри', 'Search your favorite games');
    search.setAttribute('aria-label', search.placeholder);
    policy.textContent = catalog.policy[language];
    const unsupported = catalog.games.filter(g => chosen.has(g.id) && g.playStatus === 'unsupported');
    summary.textContent = text('Избрани игри: ', 'Selected games: ') + chosen.size + (unsupported.length
      ? text(' · Неподдържани: ', ' · Unsupported: ') + unsupported.map(g=>g.title).join(', ') : text(' · Провери gameplay преди да замениш Windows.', ' · Check gameplay before replacing Windows.'));
    summary.classList.toggle('compat-warning', unsupported.length > 0);
    list.replaceChildren();
    const filtered = catalog.games.filter(g => g.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase().trim()));
    empty.hidden = filtered.length > 0;
    empty.textContent = text('Играта не е в каталога. Съвместимостта ѝ е непроверена.', 'This game is outside the catalog. Its compatibility is unverified.');
    for (const game of filtered) {
      const card = node('article', '', 'compat-game');
      const label = node('label', '', 'compat-game-title');
      const checkbox = node('input'); checkbox.type = 'checkbox'; checkbox.dataset.gameId = game.id; checkbox.checked = chosen.has(game.id);
      checkbox.addEventListener('change', () => {if (checkbox.checked) chosen.add(game.id); else chosen.delete(game.id); options.onSelection?.([...chosen]); render(); [...list.querySelectorAll('input')].find(i=>i.dataset.gameId === game.id)?.focus({preventScroll:true});});
      label.append(checkbox, node('span', game.title));
      const badges = node('p', '', 'compat-badges');
      badges.append(node('span', game.launchPlatform === 'native' ? 'Linux' : game.launchPlatform === 'proton' ? text('Предложен Proton маршрут', 'Proposed Proton route') : text('Неподдържана локално', 'Unsupported locally')));
      badges.append(node('span', game.playStatus === 'unsupported' ? text('Неподдържана', 'Unsupported') : text('Непроверена в Tanados', 'Untested on Tanados'), game.playStatus === 'unsupported' ? 'compat-unsupported' : 'compat-unverified'));
      const multiplayer = node('p', text('Онлайн: ', 'Online: ') + ({native: text('Linux версия с multiplayer; непроверена в Tanados', 'Linux multiplayer build; untested on Tanados'), unverified: text('изисква отделна проверка', 'requires a separate check'), unsupported: text('неподдържан', 'unsupported'), 'not-applicable': text('single-player игра', 'single-player game')}[game.multiplayerStatus] || text('непроверен', 'unverified')), 'compat-online');
      const reason = node('p', game.reason[language], 'compat-reason');
      const link = node('a', text('Официален източник', 'Official source')); link.href = game.sourceUrl; link.target = '_blank'; link.rel = 'noopener noreferrer';
      if (options.openSource) link.addEventListener('click', e=>{e.preventDefault(); options.openSource(game.sourceUrl);});
      const source = node('p', '', 'compat-source'); source.append(link, document.createTextNode(' · ' + game.checkedAt));
      card.append(label, badges, reason, multiplayer, source); list.append(card);
    }
  }
  search.addEventListener('input', render); render();
  return {language(value) {language = value === 'bg' ? 'bg' : 'en'; render();}, selected() {return [...chosen];}};
};
