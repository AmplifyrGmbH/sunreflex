(function () {
  'use strict';

  var btn  = document.getElementById('fchatBtn');
  var wrap = document.getElementById('fchat');
  if (!btn || !wrap) return;

  function closeAll() {
    wrap.classList.remove('open-opts');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', function () {
    if (wrap.classList.contains('open-opts')) {
      closeAll();
    } else {
      wrap.classList.add('open-opts');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  var optsClose = document.getElementById('fchatOptsClose');
  if (optsClose) optsClose.addEventListener('click', closeAll);

  // "KI-Berater fragen" → Embed-Chatbot öffnen
  var optChat = document.getElementById('fchatOptChat');
  if (optChat) optChat.addEventListener('click', function () {
    closeAll();
    // Panel direkt öffnen (ac-hidden entfernen), Fallback: ac-btn klicken
    var panel = document.getElementById('ac-panel');
    var embedBtn = document.getElementById('ac-btn');
    if (panel && panel.classList.contains('ac-hidden')) {
      panel.classList.remove('ac-hidden');
      var inp = panel.querySelector('textarea, input[type="text"]');
      if (inp) inp.focus();
    } else if (embedBtn) {
      embedBtn.click();
    }
  });
})();
