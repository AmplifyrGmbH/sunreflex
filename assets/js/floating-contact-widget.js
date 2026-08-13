(function () {
  'use strict';

  var btn = document.getElementById('fchatBtn');
  var wrap = document.getElementById('fchat');
  var win = document.getElementById('fchatWin');
  var msgs = document.getElementById('fchatMsgs');
  var inp = document.getElementById('fchatInp');
  var form = document.getElementById('fchatForm');
  if (!btn || !wrap) return;

  function closeAll() {
    wrap.classList.remove('open-opts', 'open-chat');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', function () {
    if (wrap.classList.contains('open-opts') || wrap.classList.contains('open-chat')) {
      closeAll();
    } else {
      wrap.classList.add('open-opts');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  ['fchatOptsClose', 'fchatWinClose'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', closeAll);
  });

  var optChat = document.getElementById('fchatOptChat');
  if (optChat) optChat.addEventListener('click', function () {
    wrap.classList.remove('open-opts');
    wrap.classList.add('open-chat');
    if (inp) inp.focus();
    greet();
  });

  var sessionId = 's' + Math.random().toString(36).slice(2);
  var busy = false;
  var greeted = false;

  function addMsg(text, role) {
    var div = document.createElement('div');
    div.className = 'fc-msg fc-msg-' + role;
    if (role === 'ai') {
      var av = document.createElement('div');
      av.className = 'fc-av';
      av.textContent = 'KI';
      div.appendChild(av);
    }
    var bub = document.createElement('div');
    bub.className = 'fc-bub';
    bub.textContent = text;
    div.appendChild(bub);
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addTyping() {
    var div = document.createElement('div');
    div.className = 'fc-msg fc-msg-ai';
    var av = document.createElement('div');
    av.className = 'fc-av';
    av.textContent = 'KI';
    var dots = document.createElement('div');
    dots.className = 'fc-typing';
    dots.innerHTML = '<span></span><span></span><span></span>';
    div.appendChild(av);
    div.appendChild(dots);
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  function askApi(message) {
    return fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, message: message })
    }).then(function (r) { return r.json(); });
  }

  function greet() {
    if (greeted) return;
    greeted = true;
    var typing = addTyping();
    askApi('__START__')
      .then(function (d) { typing.remove(); addMsg(d.reply || 'Hallo! Wie kann ich helfen?', 'ai'); })
      .catch(function () { typing.remove(); addMsg('Hallo! Wie kann ich helfen?', 'ai'); });
  }

  if (inp) {
    inp.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.dispatchEvent(new Event('submit', { cancelable: true })); }
    });
  }

  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = inp.value.trim();
    if (!text || busy) return;
    busy = true;
    addMsg(text, 'user');
    inp.value = '';
    inp.style.height = 'auto';
    var typing = addTyping();
    askApi(text)
      .then(function (d) { typing.remove(); addMsg(d.reply || 'Entschuldigung, bitte nochmal versuchen.', 'ai'); })
      .catch(function () { typing.remove(); addMsg('Momentan nicht erreichbar. Bitte kontaktieren Sie uns direkt.', 'ai'); })
      .finally(function () { busy = false; });
  });
})();
