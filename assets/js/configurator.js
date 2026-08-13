(function () {
  'use strict';

  var root = document.getElementById('configurator');
  if (!root) return;

  var stage = document.getElementById('configurator-stage');
  var stepLabel = document.getElementById('configurator-step-label');
  var progressBar = document.getElementById('configurator-progress-bar');
  var backBtn = document.getElementById('configurator-back');
  var restartBtn = document.getElementById('configurator-restart');

  var CATEGORY_META = {
    folien: {
      title: 'Sonnenschutzfolien',
      img: 'assets/img/produkt-sonnenschutzfolien.webp',
      blurb: 'Hochreflektierende Flachglasfolien für dauerhaften, unsichtbaren Hitze- und Blendschutz — nachrüstbar an bestehendem Glas.'
    },
    uv: {
      title: 'UV-Schutzfolien',
      img: 'assets/img/produkt-uv-schutzfolien.webp',
      blurb: '99.9% UV-Schutz — schützt Einrichtung, Waren und Kunstwerke vor Ausbleichung, unsichtbar angebracht.'
    },
    rollos: {
      title: 'Sonnenschutz-Rollos',
      img: 'assets/img/produkt-rollos.webp',
      blurb: 'Technische MULTIFILM®-Rollos für flexibel dosierbaren Sonnenschutz, manuell oder elektrisch bedienbar.'
    },
    textil: {
      title: 'Textile Systeme',
      img: 'assets/img/produkt-textile-systeme.webp',
      blurb: 'Rollo, Plissee, Flächen- oder Lamellenvorhang — elegante, wohnliche Beschattung nach Mass.'
    },
    sicht: {
      title: 'Sicht- & Splitterschutz',
      img: 'assets/img/produkt-sicht-splitterschutz.webp',
      blurb: 'Diskretion bei Tageslicht und Sicherheit bei Glasbruch — für Büro, Praxis oder öffentliche Gebäude.'
    },
    vogel: {
      title: 'Vogelschutz',
      img: 'assets/img/produkt-vogelschutz.webp',
      blurb: 'Markierungen für Glasfassaden, die Vogelschlag verhindern, ohne die Architektur zu stören.'
    }
  };

  var QUESTIONS = [
    {
      question: 'Was ist Ihr Hauptanliegen?',
      options: [
        { label: 'Hitze & Blendung reduzieren', scores: { folien: 3, rollos: 2, textil: 1 } },
        { label: 'Vor Ausbleichung schützen (UV)', scores: { uv: 3 } },
        { label: 'Privatsphäre & Sichtschutz', scores: { sicht: 3 } },
        { label: 'Sicherheit bei Glasbruch', scores: { sicht: 3 } },
        { label: 'Vögel vor Glas schützen', scores: { vogel: 3 } }
      ]
    },
    {
      question: 'Um welche Art von Fläche geht es?',
      options: [
        { label: 'Standardfenster (Wohnraum)', scores: { textil: 2, rollos: 1 } },
        { label: 'Grosse Glasfassade / Fensterfront', scores: { folien: 2, rollos: 2 } },
        { label: 'Dachfenster / Schrägverglasung', scores: { rollos: 2, folien: 1 } },
        { label: 'Schaufenster / Gewerbefläche', scores: { sicht: 2, folien: 1 } }
      ]
    },
    {
      question: 'Wie wichtig ist Ihnen die unveränderte Optik des Fensters?',
      options: [
        { label: 'Sehr wichtig — soll unsichtbar bleiben', scores: { folien: 3, uv: 1 } },
        { label: 'Egal, Hauptsache wirksam', scores: { folien: 1, rollos: 1, textil: 1, uv: 1, sicht: 1 } },
        { label: 'Ich möchte selbst ein-/ausschalten können', scores: { rollos: 3, textil: 2 } }
      ]
    },
    {
      question: 'Um welchen Gebäudetyp handelt es sich?',
      options: [
        { label: 'Wohnraum / Privat', scores: { textil: 2, rollos: 1 } },
        { label: 'Büro / Gewerbe', scores: { rollos: 2, folien: 1 } },
        { label: 'Öffentliches Gebäude (Spital, Schule …)', scores: { sicht: 2, uv: 1 } }
      ]
    },
    {
      question: 'Was hat für Sie Priorität?',
      options: [
        { label: 'Maximaler Hitzeschutz', scores: { folien: 3 } },
        { label: 'Ausgewogen — Licht & Schutz', scores: { rollos: 2, textil: 2 } },
        { label: 'Maximales Tageslicht erhalten', scores: { uv: 2, textil: 1 } }
      ]
    }
  ];

  var answers = [];
  var currentStep = 0; // 0..4 = questions, 5 = result

  function computeScores() {
    var scores = { folien: 0, uv: 0, rollos: 0, textil: 0, sicht: 0, vogel: 0 };
    answers.forEach(function (optionIndex, qIndex) {
      if (optionIndex == null) return;
      var opt = QUESTIONS[qIndex].options[optionIndex];
      Object.keys(opt.scores).forEach(function (key) {
        scores[key] += opt.scores[key];
      });
    });
    return scores;
  }

  function topCategories() {
    var scores = computeScores();
    var ranked = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a]; });
    return ranked;
  }

  function updateProgress() {
    var displayStep = Math.min(currentStep + 1, QUESTIONS.length);
    stepLabel.textContent = currentStep < QUESTIONS.length
      ? 'Frage ' + displayStep + ' von ' + QUESTIONS.length
      : 'Ihre Empfehlung';
    var pct = currentStep < QUESTIONS.length
      ? (currentStep / QUESTIONS.length) * 100
      : 100;
    progressBar.style.width = pct + '%';
  }

  function renderQuestion(stepIndex) {
    var q = QUESTIONS[stepIndex];
    stage.innerHTML = '';

    var heading = document.createElement('h2');
    heading.className = 'configurator__question';
    heading.textContent = q.question;
    stage.appendChild(heading);

    var grid = document.createElement('div');
    grid.className = 'configurator__options';

    q.options.forEach(function (opt, optIndex) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'configurator__option';
      if (answers[stepIndex] === optIndex) btn.classList.add('is-selected');
      btn.textContent = opt.label;
      btn.addEventListener('click', function () {
        answers[stepIndex] = optIndex;
        if (stepIndex < QUESTIONS.length - 1) {
          currentStep = stepIndex + 1;
          renderQuestion(currentStep);
        } else {
          currentStep = QUESTIONS.length;
          renderResult();
        }
        updateProgress();
        updateNavButtons();
      });
      grid.appendChild(btn);
    });

    stage.appendChild(grid);
  }

  function renderResult() {
    var ranked = topCategories();
    var primary = CATEGORY_META[ranked[0]];
    var secondary = CATEGORY_META[ranked[1]];

    stage.innerHTML = '';

    var heading = document.createElement('h2');
    heading.className = 'configurator__question';
    heading.textContent = 'Unsere Empfehlung für Sie';
    stage.appendChild(heading);

    var note = document.createElement('p');
    note.className = 'configurator__note';
    note.textContent = 'Unverbindliche Empfehlung basierend auf Ihren Angaben — für eine verbindliche Einschätzung beraten wir Sie gerne persönlich vor Ort.';
    stage.appendChild(note);

    var resultGrid = document.createElement('div');
    resultGrid.className = 'configurator__result';

    resultGrid.appendChild(buildResultCard(primary, true));
    if (secondary) resultGrid.appendChild(buildResultCard(secondary, false));

    stage.appendChild(resultGrid);

    restartBtn.style.display = 'inline-flex';
  }

  function buildResultCard(meta, isPrimary) {
    var card = document.createElement('div');
    card.className = 'configurator__result-card' + (isPrimary ? ' is-primary' : '');

    var media = document.createElement('div');
    media.className = 'configurator__result-media';
    var img = document.createElement('img');
    img.src = meta.img;
    img.alt = meta.title;
    img.loading = 'lazy';
    media.appendChild(img);
    card.appendChild(media);

    var body = document.createElement('div');
    body.className = 'configurator__result-body';
    var tag = document.createElement('span');
    tag.className = 'configurator__result-tag';
    tag.textContent = isPrimary ? 'Top-Empfehlung' : 'Ebenfalls interessant';
    var title = document.createElement('h3');
    title.textContent = meta.title;
    var text = document.createElement('p');
    text.textContent = meta.blurb;

    var actions = document.createElement('div');
    actions.className = 'configurator__result-actions';
    var cta = document.createElement('a');
    cta.href = 'kontakt.html?produkt=' + encodeURIComponent(meta.title) + '#kontakt-form';
    cta.className = 'btn btn--primary btn--sm';
    cta.textContent = meta.title + ' anfragen';
    actions.appendChild(cta);

    body.appendChild(tag);
    body.appendChild(title);
    body.appendChild(text);
    body.appendChild(actions);
    card.appendChild(body);

    return card;
  }

  function updateNavButtons() {
    backBtn.disabled = currentStep === 0;
    restartBtn.style.display = currentStep === QUESTIONS.length ? 'inline-flex' : 'none';
  }

  backBtn.addEventListener('click', function () {
    if (currentStep === 0) return;
    currentStep = currentStep - 1;
    if (currentStep === QUESTIONS.length) {
      renderResult();
    } else {
      renderQuestion(currentStep);
    }
    updateProgress();
    updateNavButtons();
  });

  restartBtn.addEventListener('click', function () {
    answers = [];
    currentStep = 0;
    renderQuestion(0);
    updateProgress();
    updateNavButtons();
  });

  renderQuestion(0);
  updateProgress();
  updateNavButtons();
})();
