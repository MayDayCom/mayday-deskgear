const endpoint = 'https://mayday-deskgear-install-counter.cgibank0.workers.dev/install-count';
const locale = document.documentElement.lang === 'en' ? 'en' : 'ko';
const pages = new Set(['/mayday-deskgear/', '/mayday-deskgear/index.html', '/mayday-deskgear/en/', '/mayday-deskgear/en/index.html']);
const live = location.origin === 'https://maydaycom.github.io' && pages.has(location.pathname);
let counter, shown = -1;

function show(snapshot) {
  if (!counter || !snapshot || !Number.isSafeInteger(snapshot.count) || snapshot.count < shown || !/^\d{4}-\d{2}-\d{2}$/.test(snapshot.since)) return;
  const date = new Date(snapshot.since + 'T00:00:00Z');
  if (!Number.isFinite(date.getTime())) return;
  const number = new Intl.NumberFormat(locale).format(snapshot.count);
  counter.querySelector('strong').textContent = locale === 'en' ? `USB installs: ${number}` : `USB 설치 완료 ${number}건`;
  counter.querySelector('time').textContent = new Intl.DateTimeFormat(locale, {dateStyle:'medium', timeZone:'UTC'}).format(date);
  counter.querySelector('time').dateTime = snapshot.since;
  shown = snapshot.count;
  counter.hidden = false;
}

export function recordFirmwareInstall(type) {
  if (!live) return;
  try {
    const body = JSON.stringify({id: crypto.randomUUID(), type});
    const submit = async () => {
      const response = await fetch(endpoint, {method:'POST', headers:{'Content-Type':'application/json'}, body, keepalive:true, signal:AbortSignal.timeout(7000)});
      if (!response.ok) throw Error('Counter unavailable');
      return response.json();
    };
    submit().catch(submit).then(show).catch(() => {});
  } catch { /* Never interrupt a firmware installation because of analytics. */ }
}

export function initializeCounters() {
  const footer = document.querySelector('footer');
  if (footer && !footer.querySelector('.footer-hits')) {
    const link = document.createElement('a');
    link.className = 'footer-hits';
    link.href = 'https://hits.sh/maydaycom.github.io/mayday-deskgear/';
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    const img = document.createElement('img');
    img.alt = locale === 'en' ? 'Page views' : '페이지 조회 수';
    img.src = `https://hits.sh/maydaycom.github.io/mayday-deskgear.svg?style=flat&label=${encodeURIComponent(locale === 'en' ? 'views' : '조회')}&color=325e49&labelColor=626860`;
    if (live) { link.append(img); (footer.querySelector('.footer-links') || footer).append(link); }
  }
  const heading = document.querySelector('#update article h3');
  if (!heading || !live) return;
  counter = document.createElement('p'); counter.className = 'install-count'; counter.hidden = true;
  const label = document.createElement('strong'), date = document.createElement('small'), time = document.createElement('time');
  date.append(locale === 'en' ? ' · Counting since ' : ' · 집계 시작 ', time);
  counter.append(label, date); heading.after(counter);
  fetch(endpoint, {cache:'no-store', signal:AbortSignal.timeout(5000)}).then(r => {if(!r.ok) throw Error('Counter unavailable'); return r.json();}).then(show).catch(() => {});
}
