// 日本語 / English の切り替え
// 英語にしたい要素に data-en="英語のHTML" を付けておくと、ボタンで入れ替わる
(() => {
  let lang = null;
  try { lang = localStorage.getItem('lang'); } catch (e) {}
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'en' || q === 'ja') lang = q;
  if (!lang) lang = (navigator.language || 'ja').toLowerCase().startsWith('ja') ? 'ja' : 'en';

  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'lang-sw';
  btn.setAttribute('aria-label', 'Language / 言語');
  btn.innerHTML = '<span data-l="ja">JA</span> / <span data-l="en">EN</span>';
  const header = document.querySelector('header');
  if (header) header.appendChild(btn);

  function apply(l) {
    document.querySelectorAll('[data-en]').forEach(el => {
      if (!el.hasAttribute('data-ja')) el.setAttribute('data-ja', el.innerHTML);
      el.innerHTML = el.getAttribute(l === 'en' ? 'data-en' : 'data-ja');
    });
    document.documentElement.lang = l;
    window.LANG = l;
    btn.querySelectorAll('[data-l]').forEach(s => s.classList.toggle('on', s.dataset.l === l));
    document.dispatchEvent(new Event('langchange'));
  }
  btn.addEventListener('click', () => {
    lang = lang === 'en' ? 'ja' : 'en';
    try { localStorage.setItem('lang', lang); } catch (e) {}
    apply(lang);
  });
  apply(lang);
})();
