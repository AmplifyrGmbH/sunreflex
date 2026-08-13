(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Header: stays transparent (white text) while the hero is in view,
     switches to the solid frosted bar once scrolled past it
     --------------------------------------------------------------------- */
  var siteHeader = document.getElementById('site-header');
  var hero = document.getElementById('hero');
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
       Hero video intro: UV-Folie + Rollo product videos play once, then
       hand off to the slideshow above
       --------------------------------------------------------------------- */
    var videoSequence = document.getElementById('hero-video-sequence');
    var videos = videoSequence ? Array.prototype.slice.call(videoSequence.querySelectorAll('.hero-video')) : [];
    var sequenceDone = false;

    function finishVideoSequence() {
      if (sequenceDone) return;
      sequenceDone = true;
      videos.forEach(function (v) { v.pause(); });
      if (videoSequence) videoSequence.classList.add('is-done');
      startSlideshow();
    }

    if (videoSequence && videos.length === 2 && !reduceMotion && typeof videos[0].play === 'function') {
      videos[0].addEventListener('ended', function () {
        setCaption(videos[1]);
        videos[0].classList.remove('is-active');
        videos[1].classList.add('is-active');
        videos[1].play().catch(finishVideoSequence);
      });
      videos[1].addEventListener('ended', finishVideoSequence);

      setCaption(videos[0]);
      videos[0].play().catch(finishVideoSequence);
    } else {
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
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menü öffnen');
  }

  function openNav() {
    if (!siteNav || !navToggle) return;
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
