# Handoff: Sunreflex Website (Startseite / One-Pager Demo)

## Overview
Redesign der Startseite von sunreflex.ch — Frontwork AG, Geschäftsbereich Sunreflex, Spezialist für Sonnen- und Blendschutz an Fenstern, Glasfassaden und Dachverglasungen (Stationsstrasse 1, 8306 Brüttisellen).

Die Demo ist ein One-Pager mit sieben Sektionen: Hero (mit Vollflächen-Video-Slot), Hersteller-Marquee, Wirkung (Vorher/Nachher-Slider + Kennzahlen), Produkte, Ablauf, Referenzen, Kontakt (mit Formular) und Footer. Alle Inhalte, Kontaktdaten und Testimonials sind wörtlich von der bestehenden Website übernommen.

## About the Design Files
Die Dateien in diesem Bundle sind **Design-Referenzen in HTML** — Prototypen, die Aussehen und Verhalten zeigen, kein produktionsfertiger Code zum direkten Übernehmen. Die Aufgabe ist, dieses Design in der Zielumgebung nachzubauen (z.B. Next.js/React, Astro, Vue, oder ein CMS-Theme) mit deren etablierten Patterns und Libraries. Falls noch keine Umgebung existiert: passendes Framework wählen und dort umsetzen.

Die HTML-Datei nutzt ein hauseigenes Streaming-Component-Format (`.dc.html`) mit einer Template-Sektion und einer JS-Logik-Klasse. Für die Umsetzung interessieren nur Markup, Styles und die Daten-Arrays in der Logik-Klasse — das Format selbst nicht nachbauen.

## Fidelity
**High-fidelity.** Farben, Typografie, Spacing und Interaktionen sind final gedacht und sollten pixelgenau umgesetzt werden. Ausnahme: alle Bilder und das Hero-Video sind Platzhalter (gestreifte Flächen mit Monospace-Beschriftung, was dort hingehört). Der Kunde liefert das Material nach.

Offen: das Logo ist aktuell als Text-Wortmarke ("sunreflex" + Tagline) gesetzt. Das echte Logo-SVG ersetzt es. Der Blauwert `#1668C4` ist aus einem Screenshot der bestehenden Site abgegriffen — gegen den offiziellen CI-Wert prüfen.

## Design Tokens

### Farben
| Token | Hex | Verwendung |
|---|---|---|
| Blau (Primär) | `#1668C4` | Logo, Headlines, CTAs, Akzente, Slider-Handle, Fokus-Border |
| Blau dunkel (Hover) | `#0F4E96` | Hover-Zustand aller Primär-Buttons/Links |
| Blau tief | `#0F3E73` | Hintergrund der Ablauf-Sektion |
| Weiss | `#FFFFFF` | Basis-Hintergrund, Karten |
| Grau hell | `#F5F7FA` | Alternierender Sektions-Hintergrund, Zitat-Karten, Hover auf Produktkarten |
| Border | `#E3E7EC` | Standard-Hairline (Header, Karten, Raster) |
| Border kräftiger | `#DDE3EA` | Hairlines in der Kennzahlen-Tabelle |
| Border Input | `#D5DDE5` | Formularfelder |
| Border Button outline | `#C3CDD7` | Sekundärer Button in Kontakt |
| Text | `#1D2329` | Fliesstext, Headlines auf Weiss |
| Text kräftig | `#2A333B` | Zitat-Text |
| Text sekundär | `#5A656F` | Absätze, Beschreibungen |
| Text tertiär | `#7A8691` | Bild-Platzhalter-Labels, Meta |
| Text schwach | `#9AA4AE` | Marquee, Footer-Rubriken, Footer-Baseline |
| Text mittel (Nav) | `#4A555F` | Navigation, Labels auf hellen Platzhaltern |
| Hero-Grund | `#0C1620` | Fallback hinter dem Video |
| Platzhalter-Streifen hell | `#EDF1F5` / `#E3E9EF` | Bild-Slots auf Weiss |
| Platzhalter-Streifen Vergleich (mit Folie) | `#C9D3DD` / `#D6DEE6` | Slider rechte Hälfte |
| Platzhalter-Streifen Vergleich (ohne Schutz) | `#B7A88E` / `#C4B69C` | Slider linke Hälfte |
| Hero-Streifen | `#243444` / `#2A3C4E` | animierter Video-Fallback |

Weisse Transparenzen im Hero: `rgba(255,255,255,.82)` Absatz, `.75` Eyebrow/Badge, `.6` Kennzahl-Labels, `.45` Button-Border, `.22` Trennlinie.
Ablauf-Sektion: `rgba(255,255,255,.72)` Text, `.65` Eyebrow, `.7` Schrittnummer, `.22` Trennlinien.

### Typografie
- **Archivo** (Google Fonts, Gewichte 400/500/600/700) — alles ausser Labels
- **JetBrains Mono** (400/500) — Eyebrows, Labels, Platzhalter-Beschriftungen, Meta, Footer-Baseline

| Rolle | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Hero H1 | `clamp(44px,5.4vw,82px)` | 600 | 1 | -.035em |
| Section H2 | `clamp(34px,3.4vw,54px)` | 600 | 1.04 | -.03em |
| Ablauf H2 | `clamp(32px,3vw,46px)` | 600 | 1.06 | -.03em |
| Kontakt H2 | `clamp(38px,4.2vw,66px)` | 600 | 1 | -.035em |
| Karten-H3 | 21px | 600 | normal | -.015em |
| Ablauf-H3 | 24px | 600 | normal | -.02em |
| Kennzahl gross | 38px | 600 | normal | -.03em |
| Hero-Kennzahl | 28px | 600 | normal | -.02em |
| Lead-Absatz | 19px | 400 | 1.6 | — |
| Absatz | 18px / 16px | 400 | 1.65 | — |
| Karten-Text | 15px | 400 | 1.6 | — |
| Nav | 15px | 500 | — | — |
| Eyebrow (Mono) | 11px | 400 | — | .2em, uppercase |
| Bild-Label (Mono) | 10px | 400 | — | .14–.16em, uppercase |

`text-wrap: balance` auf Headlines, `text-wrap: pretty` auf Absätzen.

### Spacing & Form
- Sektions-Padding: `120px 40px`; Hero `140px 40px 56px` (Inhalt), Footer `64px 40px 40px`
- Content-Container: `max-width:1240px; margin:0 auto`
- Border-Radius: `2px` überall (Buttons, Inputs). Ausnahme: Slider-Handle `50%`
- Buttons primär: `padding:16px 30px`, 15px/600. Header-CTA: `padding:11px 20px`, 14px/600
- Inputs: `padding:14px 16px`, 15px
- Schatten: nur am Slider-Handle — `0 6px 24px rgba(12,30,50,.28)`

## Screens / Views

Ein Screen (One-Pager). Sektionen von oben nach unten:

### 1. Header (sticky)
- `position:sticky; top:0; z-index:60`, `padding:16px 40px`, Hintergrund `rgba(255,255,255,.9)` + `backdrop-filter:blur(18px)`, `border-bottom:1px solid #E3E7EC`
- Flex-Row, `justify-content:space-between`, `gap:32px`
- Links: Wortmarke "sunreflex" (24px/600, `#1668C4`, `-.02em`) + Tagline "sonnen- und blendschutz" (Mono 10px, `#8A949E`, `.14em`)
- Mitte: Nav — Produkte, Wirkung, Ablauf, Referenzen, Kontakt. `gap:clamp(16px,2vw,32px)`, `white-space:nowrap`, `overflow:hidden`. Hover → `#1668C4`
- Rechts: "Tel: +41 44 802 90 70" (15px/600, blau) + CTA "Offerte anfragen" (blauer Button)
- **Responsive:** Tagline wird unter 1080px Viewport-Breite ausgeblendet, die Telefonnummer unter 1180px. Logo-Block und rechte Gruppe sind `flex-shrink:0` mit `white-space:nowrap` — sonst bricht die Telefonnummer zeichenweise um.

### 2. Hero
- `min-height:88vh`, `display:flex; align-items:flex-end`, `overflow:hidden`, Grund `#0C1620`
- **Video-Slot:** absolute Ebene `inset:0`. Aktuell ein gestreifter Fallback (`repeating-linear-gradient(135deg,#243444 0 14px,#2A3C4E 14px 28px)`) mit langsamem Ken-Burns (`sr-pan`, 26s, scale 1.06→1.12, Translate -2%/-1.5%). **In der Implementierung ersetzen durch:** `<video autoplay muted loop playsinline>` mit `object-fit:cover; width:100%; height:100%`, Poster-Bild als Fallback, `prefers-reduced-motion` respektieren (Video pausieren, Poster zeigen)
- **Scrim** darüber: `linear-gradient(180deg, rgba(12,22,32,.55) 0%, rgba(12,22,32,.15) 34%, rgba(12,22,32,.86) 100%)`
- **Badge oben rechts** (`top:96px; right:40px`, gestrichelter Rahmen) markiert den Video-Slot — in der Produktion entfernen
- Inhalt unten links im 1240px-Container: Eyebrow mit 26px-Strich ("Brüttisellen · Vertriebspartner in der ganzen Schweiz"), H1 "Licht behalten. / Hitze aussperren." (max-width 900px), Lead-Absatz (max-width 560px), zwei Buttons ("Beratung anfragen" primär, "Systeme ansehen" outline weiss), darunter drei Kennzahlen (99.9% UV-Schutz · CH + FL Exklusiv MULTIFILM® · 1 Partner Beratung bis Montage) über einer Trennlinie, `gap:44px`, umbruchfähig

### 3. Hersteller-Marquee
- `padding:24px 0`, `border-bottom:1px solid #E3E7EC`, `overflow:hidden`
- Zwei identische Flex-Reihen hintereinander, äusserer Container `width:max-content`, Animation `sr-marquee` 34s linear infinite, `translateX(0 → -50%)`
- Namen: 3M, AVERY DENNISON, MULTIFILM®, SILENT GLISS, CRÉATION BAUMANN, MHZ, LEHA, IMAGEPERFECT — 17px/500, `#9AA4AE`, `.14em`, `gap:72px`
- Wenn Logos verfügbar sind, Textnamen dadurch ersetzen (Graustufen, Hover farbig)

### 4. Wirkung (`#F5F7FA`)
- Kopf: zweispaltig `repeat(auto-fit,minmax(340px,1fr))`, `gap:56px`, `align-items:end` — H2 blau "Der Unterschied ist messbar — und sichtbar." + erklärender Absatz
- **Vorher/Nachher-Slider:** `aspect-ratio:21/9`, `cursor:ew-resize`, `user-select:none`, `touch-action:none`, `border:1px solid #E3E7EC`
  - Basis-Ebene = "mit Folie" (kühle graue Streifen), Label unten rechts
  - Overlay-Ebene = "ohne Schutz" (warme Streifen + `linear-gradient(115deg, rgba(255,232,190,.8), rgba(255,216,150,.3) 45%, transparent 78%)` als Blendung), Label unten links
  - Clip: `clip-path: inset(0 <100-split>% 0 0)` auf dem Overlay
  - Handle: absolut positionierte 2px-Linie bei `left:<split>%`, `transform:translateX(-1px)`, darin ein 44px-Kreis in `#1668C4` mit "⇄"
  - Interaktion: Pointer Events — `pointerdown` setzt `setPointerCapture` + `dragging=true`, `pointermove` aktualisiert nur bei `dragging`, `pointerup` beendet. Wert = `clamp(2, 98, (clientX - rect.left) / rect.width * 100)`. Startwert 46
  - **Zugänglichkeit ergänzen:** in der Produktion zusätzlich ein `<input type="range">` oder Pfeiltasten-Steuerung mit `role="slider"` und ARIA-Werten
- **Kennzahlen-Reihe:** vier Zellen, `repeat(auto-fit,minmax(240px,1fr))`, `gap:0`. Hairlines liegen auf den Zellen (`border-right`/`border-bottom`), der Container trägt nur `border-top`/`border-left` — **nicht** über Container-Hintergrund + `gap:1px` lösen, sonst zeigen leere Rasterspuren graue Blöcke
  - Werte: 99.9% / Hitze / Blendfrei / CH-weit mit je einer Zeile Erklärung

### 5. Produkte (weiss)
- Kopf: H2 "Für jedes Fenster die passende Lösung." + Eyebrow "Systeme" + rechtsbündiger Absatz (max 420px)
- Raster `repeat(auto-fit,minmax(300px,1fr))`, Hairlines wie oben auf den Zellen
- Karte: Bild-Slot `aspect-ratio:4/3` (gestreift, zentriertes Mono-Label), darunter `padding:28px 26px 32px` mit Nummer (Mono, blau), H3 und Beschreibung. Hover: Karten-Hintergrund → `#F5F7FA`
- Sechs Karten (Texte siehe `content.json`): Sonnenschutzfolien, UV-Schutzfolien, Sonnenschutz-Rollos, Textile Systeme, Sicht- und Splitterschutz, Vogelschutz

### 6. Ablauf (`#0F3E73`, weisse Schrift)
- Zweispaltig `repeat(auto-fit,minmax(360px,1fr))`, `gap:72px`, `align-items:start`
- Linke Spalte `position:sticky; top:110px` mit Eyebrow, H2 und Absatz
- Rechte Spalte: vier Zeilen `grid-template-columns:90px 1fr`, `gap:28px`, `padding:34px 0`, `border-top:1px solid rgba(255,255,255,.22)`. Links Mono-Schrittnummer, rechts H3 + Text (max 520px)

### 7. Referenzen (weiss)
- Drei Zitat-Karten, `repeat(auto-fit,minmax(300px,1fr))`, `gap:24px`. Karte: `#F5F7FA`, `border:1px solid #E3E7EC`, `padding:34px 30px`, `justify-content:space-between`. Zitat 18px/1.6, Fusszeile über `border-top:1px solid #DDE3EA` mit Name (14px/600) und Meta (Mono 11px)
- Darunter vier Objekt-Platzhalter, `repeat(auto-fit,minmax(220px,1fr))`, `aspect-ratio:3/4`, Label unten links

### 8. Kontakt (`#F5F7FA`)
- Zweispaltig `repeat(auto-fit,minmax(380px,1fr))`, `gap:72px`, `align-items:start`
- Links: H2 blau "Besuchen Sie unseren Showroom in Brüttisellen.", Absatz mit Öffnungszeiten/Adresse, zwei Buttons (Telefon primär, E-Mail outline)
- Rechts: Formular auf weisser Karte, `padding:34px 32px`, `border:1px solid #E3E7EC`, `gap:16px`. Felder: Name, E-Mail, Objekt / Ort, Nachricht (Textarea, 4 Zeilen, `resize:vertical`). Fokus: Border → `#1668C4`. Submit-Button blau, Label wechselt nach Absenden zu "Danke — wir melden uns"

### 9. Footer (weiss)
- Vier Spalten `repeat(auto-fit,minmax(200px,1fr))`, `gap:40px`: Marke + Adresse, Produkte, Über uns, Kontakt
- Baseline über `border-top:1px solid #E3E7EC`: "Sunreflex ist eine Marke von Frontwork AG" links, Impressum / Datenschutzerklärung rechts (Mono 11px)

## Interactions & Behavior
- **Navigation:** reine Anker-Links auf die Sektions-IDs (`#produkte`, `#wirkung`, `#ablauf`, `#referenzen`, `#kontakt`). Bei Umsetzung als Multi-Page auf echte Routen mappen. `scroll-margin-top` in Höhe des Sticky-Headers (~75px) setzen
- **Hover:** alle Links/Nav → `#1668C4`; Primär-Buttons → `#0F4E96`; Outline-Button im Hero → `rgba(255,255,255,.12)` Fläche; Outline-Button in Kontakt → Border und Text `#1668C4`; Produktkarte → `#F5F7FA`
- **Marquee:** Endlos-Loop, 34s. Bei `prefers-reduced-motion: reduce` anhalten
- **Hero-Video:** autoplay, muted, loop, playsinline; bei `prefers-reduced-motion` Poster statt Video
- **Vergleichs-Slider:** siehe oben; Drag mit Pointer Capture, Wert 2–98%
- **Formular:** aktuell nur Client-State (`preventDefault` → Button-Label wechselt). In der Produktion echte Validierung (Name, E-Mail Pflicht + Format), Fehlermeldungen pro Feld, Loading- und Erfolgs-/Fehlerzustand, Spam-Schutz, Versand an `info@sunreflex.ch`
- **Responsive:** alle mehrspaltigen Raster nutzen `repeat(auto-fit,minmax(X,1fr))` und brechen von selbst um. Kein Mobile-Layout ausgearbeitet — unter ~760px sollten Hero-Typo, Sektions-Padding (40px → 24px) und der Sticky-Header (Burger-Menü) noch gestaltet werden

## State Management
Minimal, alles lokal:
- `split: number` (0–100, Startwert 46) — Position des Vergleichs-Sliders
- `dragging: boolean` — ob der Slider gerade gezogen wird
- `sent: boolean` — Formular abgeschickt, steuert das Button-Label
- `w: number` — Viewport-Breite, steuert das Ein-/Ausblenden von Telefonnummer und Tagline im Header. **In der Umsetzung besser durch CSS-Media-Queries ersetzen** (`display:none` unter 1180px bzw. 1080px) statt per JS-Resize-Listener

Kein Data Fetching. Produkt-, Ablauf- und Referenz-Inhalte sind statisch — in `content.json` extrahiert, gut geeignet für ein CMS.

## Assets
Alles Bildmaterial fehlt und ist als beschrifteter Platzhalter angelegt:
- **Hero-Video** — Loop, 16:9, deckt die Sektion vollflächig (`object-fit:cover`). Der Kunde produziert es separat. Poster-Bild nicht vergessen
- **Produktbilder** (6, 4:3): Sonnenschutzfolie, UV-Schutzfolie, Rollo MULTIFILM, Textile Systeme, Sichtschutzfolie, Vogelschutz
- **Vergleichsbilder** (2, 21:9): dieselbe Fassade ohne Schutz und mit Folie, identischer Bildausschnitt
- **Referenzobjekte** (4, 3:4): Büroneubau Proman AG Wollerau, Verwaltungsgebäude, Wintergarten/Privat, Glasfassade Gewerbe
- **Logo** — SVG des Sunreflex-Logos ersetzt die Text-Wortmarke im Header und Footer
- **Hersteller-Logos** (optional) für das Marquee
- **Fonts:** Archivo und JetBrains Mono von Google Fonts. Für Produktion selbst hosten (`font-display:swap`)

## Files
- `Sunreflex Website.dc.html` — der vollständige Design-Prototyp (Template + Logik)
- `content.json` — alle Texte, Produktdaten, Ablaufschritte und Testimonials strukturiert
- `README.md` — dieses Dokument

## Inhaltliche Quelle
Texte, Kontaktdaten, Herstellerliste und Testimonials stammen von sunreflex.ch. Namen und Zitate sind wörtlich übernommen — vor Livegang vom Kunden freigeben lassen.
