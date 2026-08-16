(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Header: stays transparent (white text) while the hero is in view,
     switches to the solid frosted bar once scrolled past it
     --------------------------------------------------------------------- */
  var siteHeader = document.getElementById('site-header');
  var hero = document.getElementById('hero');
  if (siteHeader) {
    // Keep --header-h in sync with the header's real rendered height so the
    // hero's negative margin-top always tucks in flush underneath it — the
    // two can drift apart by a hairline (visible as a thin gap above the
    // nav) under browser/OS zoom or display-scaling rounding, even though
    // the CSS values match exactly at 100% zoom.
    var syncHeaderHeight = function () {
      document.documentElement.style.setProperty('--header-h', siteHeader.offsetHeight + 'px');
    };
    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);
  }
  if (siteHeader && hero && 'IntersectionObserver' in window) {
    siteHeader.classList.add('is-on-hero');
    var heroObserver = new IntersectionObserver(function (entries) {
      siteHeader.classList.toggle('is-on-hero', entries[0].isIntersecting);
    }, { rootMargin: '-' + siteHeader.offsetHeight + 'px 0px 0px 0px', threshold: 0 });
    heroObserver.observe(hero);
  }

  /* ---------------------------------------------------------------------
     Hero slideshow: crossfade + Ken Burns zoom through real product photos
     --------------------------------------------------------------------- */
  var heroSlideshow = document.getElementById('hero-slideshow');
  if (heroSlideshow) {
    var slides = Array.prototype.slice.call(heroSlideshow.querySelectorAll('.hero-slide'));
    var captionEl = document.getElementById('hero-caption');
    var heroContent = document.getElementById('hero-content');
    var current = 0;
    var slideTimer = null;
    var slideshowStarted = false;

    function setCaption(el) {
      if (!captionEl) return;
      captionEl.classList.remove('is-visible');
      window.setTimeout(function () {
        captionEl.querySelector('.hero-caption__title').textContent = el.dataset.title || '';
        captionEl.querySelector('.hero-caption__text').textContent = el.dataset.text || '';
        captionEl.classList.add('is-visible');
      }, 300);
    }

    function transitionToSlide(index) {
      var el = slides[index];
      slides.forEach(function (s) { if (s !== el) s.classList.remove('is-active'); });

      // Force the Ken Burns zoom to restart from scale(1) instead of
      // continuing from wherever the previous cycle's transition left off.
      el.classList.add('is-resetting');
      el.classList.remove('is-active');
      void el.offsetWidth;
      el.classList.remove('is-resetting');
      window.requestAnimationFrame(function () { el.classList.add('is-active'); });

      setCaption(el);
    }

    function nextSlide() {
      current = (current + 1) % slides.length;
      transitionToSlide(current);
    }

    // Reset slide 1's `is-active` state right away so its Ken Burns zoom
    // doesn't run to completion, unseen, behind the hero video intro below.
    slides[0].classList.add('is-resetting');
    slides[0].classList.remove('is-active');
    void slides[0].offsetWidth;
    slides[0].classList.remove('is-resetting');

    function startSlideshow() {
      if (slideshowStarted) return;
      slideshowStarted = true;
      if (heroContent) heroContent.classList.remove('hero__content--pending');
      window.requestAnimationFrame(function () { slides[0].classList.add('is-active'); });
      setCaption(slides[0]);
      if (!reduceMotion && slides.length > 1) {
        slideTimer = window.setInterval(nextSlide, 6000);
      }
    }

    /* ---------------------------------------------------------------------
       Hero video intro: one combined UV-Folie + Rollo clip plays once, then
       hands off to the slideshow above. Relies on the native `autoplay`
       HTML attribute (set in the markup) to start playback — the browser's
       own autoplay pipeline runs before any JS executes and is honoured far
       more reliably on mobile than a JS-triggered play() call after load.
       --------------------------------------------------------------------- */
    var videoSequence = document.getElementById('hero-video-sequence');
    var video = videoSequence ? videoSequence.querySelector('.hero-video') : null;
    var sequenceDone = false;
    var captionSwapped = false;

    function finishVideoSequence() {
      if (sequenceDone) return;
      sequenceDone = true;
      if (video) video.pause();
      if (videoSequence) videoSequence.classList.add('is-done');
      startSlideshow();
    }

    if (videoSequence && video && typeof video.play === 'function') {
      var swapAt = parseFloat(video.dataset.swapAt || '0');

      if (swapAt > 0 && video.dataset.title2) {
        video.addEventListener('timeupdate', function () {
          if (!captionSwapped && video.currentTime >= swapAt) {
            captionSwapped = true;
            setCaption({ dataset: { title: video.dataset.title2, text: video.dataset.text2 } });
          }
        });
      }
      video.addEventListener('ended', finishVideoSequence);
      setCaption(video);

      // Mobile browsers are far stricter about autoplay than the `autoplay`
      // HTML attribute alone can guarantee, and on a real (non-zero-latency)
      // mobile connection the video's own data can simply arrive too slowly
      // for the browser's autoplay pipeline to have anything to play yet.
      // Setting `.muted`/`.defaultMuted` via JS right before play() (not
      // just the HTML attributes) and retrying play() on every "we now have
      // more data" event plus a fixed schedule, mirrors the approach already
      // proven reliable on this client's own amplifyr.ch hero video.
      video.muted = true;
      video.defaultMuted = true;

      function attemptPlay() {
        if (sequenceDone) return;
        var playResult = video.play();
        if (playResult && typeof playResult.catch === 'function') {
          playResult.catch(function () {});
        }
      }

      attemptPlay();
      ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough'].forEach(function (ev) {
        video.addEventListener(ev, attemptPlay, { once: true });
      });
      [100, 300, 800, 1500, 2500, 4000, 6000, 9000].forEach(function (delay) {
        window.setTimeout(function () {
          if (!sequenceDone && video.paused && !video.ended) attemptPlay();
        }, delay);
      });

      // First-tap fallback: if the browser is still refusing autoplay after
      // all of the above (some strict in-app/webview browsers require an
      // actual user gesture no matter what), the visitor's first touch or
      // click retries playback immediately.
      var gestureRetried = false;
      function retryOnGesture() {
        if (gestureRetried || sequenceDone || !video.paused) return;
        gestureRetried = true;
        attemptPlay();
      }
      document.addEventListener('touchstart', retryOnGesture, { once: true, passive: true });
      document.addEventListener('pointerdown', retryOnGesture, { once: true });

      // Final backstop: only give up to the slideshow if the video genuinely
      // never started (still at/near 0s after every retry above). If it IS
      // playing, let it run to its own 'ended' event instead of cutting it
      // off after a fixed delay — otherwise a video that autoplayed
      // successfully gets paused and hidden partway through, looking exactly
      // like it "never played" to anyone who checks the page more than a
      // few seconds after loading it.
      window.setTimeout(function () {
        if (sequenceDone || video.currentTime > 0.5) return;
        finishVideoSequence();
      }, 10000);

      // iOS sometimes doesn't fire 'ended' reliably — poll as backstop
      var endedPoll = window.setInterval(function () {
        if (sequenceDone) { clearInterval(endedPoll); return; }
        if (video.ended || (video.duration > 0 && video.currentTime >= video.duration - 0.3)) {
          clearInterval(endedPoll);
          finishVideoSequence();
        }
      }, 500);
    } else {
      // No video element on the page (or the browser lacks .play()) —
      // go straight to the slideshow.
      if (video) video.pause();
      startSlideshow();
    }
  }

  /* ---------------------------------------------------------------------
     Mobile navigation toggle
     --------------------------------------------------------------------- */
  var navToggle = document.getElementById('nav-toggle');
  var siteNav = document.getElementById('site-nav');

  function closeNav() {
    if (!siteNav || !navToggle) return;
    siteNav.classList.remove('is-open');
    if (siteHeader) siteHeader.classList.remove('nav-is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menü öffnen');
  }

  function openNav() {
    if (!siteNav || !navToggle) return;
    // Remove header backdrop-filter BEFORE showing nav — otherwise Safari
    // composites the nav into the parent's blur layer for one frame, making
    // it appear transparent on open.
    if (siteHeader) siteHeader.classList.add('nav-is-open');
    siteNav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Menü schliessen');
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) { closeNav(); } else { openNav(); }
    });
    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------------------------------------------------------------------
     Contact form: client-side validation + demo submit state
     --------------------------------------------------------------------- */
  var form = document.getElementById('kontakt-form');
  if (form) {
    var submitBtn = document.getElementById('kontakt-submit');
    var statusEl = document.getElementById('form-status');
    var nameInput = document.getElementById('f-name');
    var emailInput = document.getElementById('f-email');
    var nachrichtInput = document.getElementById('f-nachricht');

    var produktParam = new URLSearchParams(window.location.search).get('produkt');
    if (produktParam && nachrichtInput && !nachrichtInput.value) {
      nachrichtInput.value = 'Ich interessiere mich für ' + produktParam + ' und möchte eine unverbindliche Anfrage stellen.';
    }

    function setFieldError(input, errorEl, message) {
      var field = input.closest('.form-field');
      if (message) {
        field.classList.add('has-error');
        if (errorEl) errorEl.textContent = message;
      } else {
        field.classList.remove('has-error');
        if (errorEl) errorEl.textContent = '';
      }
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;
      var nameError = document.getElementById('f-name-error');
      var emailError = document.getElementById('f-email-error');

      if (!nameInput.value.trim()) {
        setFieldError(nameInput, nameError, 'Bitte Namen angeben.');
        valid = false;
      } else {
        setFieldError(nameInput, nameError, '');
      }

      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        setFieldError(emailInput, emailError, 'Bitte gültige E-Mail-Adresse angeben.');
        valid = false;
      } else {
        setFieldError(emailInput, emailError, '');
      }

      if (!valid) {
        statusEl.textContent = 'Bitte die markierten Felder korrigieren.';
        statusEl.classList.add('is-error');
        return;
      }

      statusEl.classList.remove('is-error');
      statusEl.textContent = 'Wird gesendet …';
      submitBtn.disabled = true;
      var originalLabel = submitBtn.textContent;
      submitBtn.textContent = 'Wird gesendet …';

      // Demo-Modus: es gibt aktuell kein produktives Versand-Backend.
      // Vor Go-Live hier an ein echtes Formular-Backend anbinden (siehe Betreiber.md).
      window.setTimeout(function () {
        statusEl.textContent = 'Danke — wir melden uns.';
        submitBtn.textContent = 'Danke — wir melden uns';
        form.reset();
        window.setTimeout(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }, 3200);
      }, 700);
    });
  }

  /* ---------------------------------------------------------------------
     GSAP scroll reveals (native browser scrolling — no scroll-hijacking
     library. Lenis was tried here but conflicted with the sticky header
     and sticky Ablauf-column, causing scroll to stutter/lock up; native
     scroll + CSS `scroll-behavior: smooth` is more reliable and plenty
     smooth on its own)
     --------------------------------------------------------------------- */
  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);

    var groups = [
      '.grid--products .product-card',
      '.ablauf-step',
      '.grid--quotes .quote-card',
      '.project-grid .project-card'
    ];

    groups.forEach(function (selector) {
      var items = document.querySelectorAll(selector);
      if (!items.length) return;
      window.gsap.set(items, { opacity: 0, y: 22 });
      window.gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: items[0].closest('.grid, .ablauf-steps'),
          start: 'top 85%'
        }
      });
    });

    document.querySelectorAll('.section-head, .kontakt-intro, .ablauf-intro').forEach(function (el) {
      window.gsap.set(el, { opacity: 0, y: 16 });
      window.gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
  }
})();
