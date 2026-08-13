# Sunreflex – Übergabedokument (Demo-Stand)

Dieses Dokument hält fest, was in der aktuellen Verkaufs-Demo bewusste Annahmen/Platzhalter sind und was vor einem echten Go-Live noch erledigt werden muss.

## Herkunft der Inhalte und Bilder

- **Texte, Kontaktdaten, Testimonials:** wörtlich aus dem Design-Handoff bzw. von der bestehenden Website sunreflex.ch übernommen. **Vor Livegang vom Kunden freigeben lassen** (v.a. Testimonials/Namen).
- **Bilder (Produkte, Vergleichsslider, Hero-Diashow):** aus dem bestehenden Bildmaterial von sunreflex.ch übernommen (eigene Assets des Kunden, keine externen Stock-Fotos). Die Herkunfts-URLs sind in der Git-Historie/Kommentaren nachvollziehbar.
- **Wichtige Einschränkung:** Ein grosser Teil der bestehenden Produktfotos auf sunreflex.ch liegt nur in sehr niedriger Auflösung vor (teils nur 230×140 Pixel). Wir haben diese Bilder hochskaliert und farblich vereinheitlicht, damit sie in der Demo nicht "kaputt" wirken — bei genauer Betrachtung (grosser Bildschirm, Zoom) ist die Weichheit aber erkennbar.
  - **Empfehlung für den Launch:** neues, hochauflösendes Fotomaterial für die 6 Produktkarten sowie für die 4 Referenzobjekte beschaffen (Fotograf oder zumindest aktuelle Handy-Fotos in guter Auflösung, min. 1600px Breite).
  - Die 4 Referenzobjekt-Kacheln zeigen deshalb in der Demo **bewusst keine Fotos**, sondern eine typografische "Case-Study"-Karte (Projektname + Kategorie) — das war zu niedrig aufgelöst, um es als Foto zu zeigen, wirkt so aber gestalterisch bewusst statt kaputt.
- **Hero:** eine Crossfade-Diashow mit Ken-Burns-Zoom aus 9 echten Sunreflex-Fotos (1700×800px, aus dem Bilder-Slider der bestehenden Website), inkl. Original-Bildunterschriften als Overlay. Ein Versuch mit KI-generiertem Video (Luma Dream Machine) wurde getestet, aber verworfen — Bild-zu-Video-Modelle flackern/verzerren zuverlässig bei feinen, sich wiederholenden Texturen wie Lamellen oder Stoff-Rollos. Die Diashow ist dadurch sowohl zuverlässiger als auch kostenlos. `assets/video/hero-loop.mp4` liegt noch im Projekt, wird aber aktuell nicht mehr referenziert (falls doch ein Video gewünscht ist, in `index.html` wieder einbauen).
- **Hersteller-Logos** (3M, Avery Dennison, MULTIFILM® etc.): aktuell als Text-Wortmarke im Marquee, keine echten Logo-Dateien eingebunden.
- **Logo Sunreflex:** echtes Original-Logo (`assets/img/logo-sunreflex.png`) vom Nutzer bereitgestellt und eingebunden — keine Nachbildung mehr.
- **Wirkung-Sektion:** Der ursprüngliche Vorher/Nachher-Regler wurde zunächst durch eine Energiefluss-Grafik ersetzt, dann aber final durch den **Konfigurator** (siehe unten) — die Energiefluss-Grafik war zwar objektiv korrekt, aber nur für Sonnenschutzfolie zutreffend, nicht für alle 6 Produktkategorien. Sie wurde produktspezifisch verteilt: die Folien-Variante (52% Reflexion, 23%+24% Wärmeabgabe, 1% Transmission) sitzt jetzt auf `produkte/sonnenschutzfolien.html`, eine neue Gewebe-Variante (77% Reflexion, 17% Absorption, 6% Transmission, ebenfalls echte Werte von sunreflex.ch) auf `produkte/rollos.html`.
- **Konfigurator:** Der 5-Fragen-Produktkonfigurator ist direkt auf der Startseite eingebettet (an der Stelle der früheren Wirkung-Sektion), nicht mehr als eigener Navigationspunkt. Die eigenständige Seite `konfigurator.html` existiert weiterhin (z.B. zum Teilen eines direkten Links), ist aber nirgends mehr verlinkt.
- **Team-Fotos:** Alle 14 Mitarbeitenden auf `/ueber-uns` haben jetzt ein echtes Foto (kleine Rund-Avatare, aus dem bestehenden Bildmaterial von sunreflex.ch, dort nur in 180×120px verfügbar — für die kompakte Avatar-Grösse ausreichend).
- **Kontakt-Seite:** Ein Duplikat (Showroom-Überschrift + Text erschien zweimal auf derselben Seite) wurde behoben. Die zweite Stelle zeigt jetzt Öffnungszeiten, Adresse und einen "Route planen"-Link (Google-Maps-Deeplink, kein API-Key nötig) statt der Wiederholung.

## Seitenstruktur

Die Demo ist jetzt **mehrseitig** (nicht mehr nur ein One-Pager), analog zur Informationsarchitektur von sunreflex.ch:
- `/produkte` (Übersicht) + 6 Produkt-Detailseiten (Sonnenschutzfolien, UV-Schutzfolien, Rollos, Textile Systeme, Sicht-/Splitterschutz, Vogelschutz)
- `/referenzen` (Fallstudien mit echten Kennzahlen + Kundenliste aus dem Gesundheitswesen)
- `/ueber-uns` (Firmentext + Team ohne individuelle Kontaktdaten, siehe unten + Montagepartner)
- `/downloads` (Linkliste zu den echten, bestehenden PDFs auf sunreflex.ch — nicht neu gehostet)
- `/kontakt` (eigene Seite, gleiches Formular wie auf der Startseite)

Die Startseite bleibt zusätzlich als "Storytelling"-Overview mit Hero/Wirkung/Ablauf erhalten; die Produktkarten/Referenzen dort verlinken jetzt auf die jeweiligen Detailseiten statt nur zu scrollen.

**Datenschutz-Hinweis Team-Seite:** Auf `/ueber-uns` sind Namen und Rollen aller Mitarbeitenden aufgeführt (identisch zur bestehenden Website), aber bewusst **ohne** deren direkte Telefonnummern/E-Mail-Adressen, die auf der Originalseite einzeln aufgeführt sind. Für die Demo reicht die allgemeine Firmennummer im Footer — vor Übernahme der Original-Kontaktdaten die Mitarbeitenden ggf. um Einverständnis fragen.

## Rechtliches – noch zu ergänzen

- **Impressum:** UID-/Handelsregister-Nummer fehlt (Platzhalter im Code markiert).
- **Datenschutzerklärung:** Generischer Text auf Basis der aktuellen Funktionsweise (nur Kontaktformular, kein Tracking). Muss angepasst werden, sobald Analytics/Tracking-Tools hinzukommen.
- Beide Texte sind keine Rechtsberatung — vor Livegang durch den Kunden bzw. eine Fachperson prüfen lassen.

## Formular

Das Kontaktformular ist vollständig client-seitig validiert (Pflichtfelder, E-Mail-Format, Fehler-/Erfolgszustand). **Es gibt aktuell kein produktives Versand-Backend** — eine Anfrage wird visuell als "gesendet" bestätigt, aber nirgends zugestellt. Vor Go-Live:
- Ein Formular-Backend anbinden (z.B. Formspree, ein serverloses Formular-Endpoint, oder Versand an `info@sunreflex.ch`)
- `assets/js/script.js`, Abschnitt "Contact form" entsprechend anpassen

## Domain & Meta-Daten

Alle kanonischen URLs, Open-Graph-Tags und das Schema.org-Markup gehen von der Zieldomain `https://sunreflex.ch` aus. Falls die Demo unter einer anderen Domain (z.B. Vercel-Preview-URL) gezeigt wird, sind das keine falschen Angaben für die Demo selbst, aber vor einem echten Go-Live unter einer anderen Domain müssten diese URLs entsprechend angepasst werden.

Die Geo-Koordinaten im LocalBusiness-Schema sind eine ungefähre Ortsangabe für Brüttisellen — für Präzision die exakten Koordinaten von Stationsstrasse 1, 8306 Brüttisellen ergänzen.

## Empfehlung vor Kundenpräsentation

- Lighthouse/PageSpeed-Check durchführen
- Mobile-Ansicht auf einem echten Gerät testen (nicht nur Browser-DevTools)
- Formular-Demo-Verhalten dem Kunden gegenüber transparent machen, falls danach gefragt wird
