# Sunreflex — Hero-Videos (UV-Folie & Rollo)

Zwei eigenständige Hero-Videos für die bestehende Website sunreflex.ch.
Kein Landingpage-/Blog-Build (Website existiert bereits) — nur die Assets.

## Inhalt

| Datei | Thema |
|---|---|
| `uv-folie-hero.mp4` | UV-/Hitzeschutzfolie — schwebende Glasscheibe, Folie appliziert sich |
| `rollo-hero.mp4` | Rollo — schwebender Mechanismus, Stoff rollt sich ab |

Beide: 16:9, 8s, Apple-Keynote-Produktfilm-Stil, reines weisses Studio, kein
Raum, keine Personen, kein eingebrannter Text.

## Verwendete Prompts (Wortlaut, für Nachvollziehbarkeit/Wiederverwendung)

### UV-Folie
```
Ultra-clean Apple-style product commercial, pure white studio background, no room, no environment, no people, no hands, no text overlays. A single large pane of glass floats vertically in the center of the frame, isolated on seamless white background, softbox studio lighting, crisp reflections, premium minimalist product photography look — similar to an Apple keynote product reveal. Camera slowly orbits and dollies in toward the glass, shallow depth of field, subtle specular highlights sweeping across the surface as the camera moves. A thin, transparent UV protection film smoothly glides down and adheres to the glass surface in one continuous fluid motion, top to bottom — perfectly even, no bubbles, no wrinkles. As it settles, a subtle light-refraction pulse ripples across the film, visually indicating protection being applied. Macro insert shot: extreme close-up on the glass edge, film laminating perfectly flat, fine surface detail, soft rim light tracing the edge. Final hero shot: the glass pane centered, floating, fully laminated, clean white background, soft shadow beneath, calm and precise. Mood: precision engineering, purity, clarity, premium technology. Lighting: bright even studio lighting, soft shadows, high-key. Color grade: neutral, crisp whites, subtle cool highlights. Lens: 50mm macro-clean look, slow motion feel, smooth motorized camera movement. Aspect ratio: 16:9, loopable.
```
Modell: `seedance_2_0`, `--mode fast --duration 8 --aspect_ratio 16:9 --resolution 720p`

### Rollo
```
Ultra-clean Apple-style product commercial, pure white studio background, no room, no environment, no people, no hands, no text overlays. A technical fabric rollo blind (fabric roll + mechanism) floats horizontally in the center of frame, isolated on seamless white background, softbox studio lighting, premium minimalist product photography look — similar to an Apple keynote product reveal. Camera slowly orbits around the rolled mechanism, shallow depth of field, subtle highlights sweeping across the metal housing and fabric edge as the camera moves. The fabric unrolls smoothly downward from the mechanism in one continuous fluid motion, perfectly straight, no wrinkles, revealing the fine woven texture as it extends — light gently passes through the weave, showing subtle translucency. Macro insert shot: extreme close-up on the fabric weave, threads catching soft light, fine texture detail, shallow focus. Final hero shot: fabric fully extended, floating, clean white background, soft shadow beneath, calm and precise, subtle even glow passing through the material. Mood: elegance, precision, quiet sophistication, engineered comfort. Lighting: bright even studio lighting, soft shadows, high-key. Color grade: neutral, crisp whites, subtle warm highlights through the fabric. Lens: 50mm macro-clean look, slow motion feel, smooth motorized camera movement. Aspect ratio: 16:9, loopable.
```
Modell: `seedance_2_0`, `--mode fast --duration 8 --aspect_ratio 16:9 --resolution 720p`

## Caption-/On-Screen-Text (nicht ins Video gerendert)

- **UV-Folie:** „UV-Schutzfolien – unsichtbarer Schutz vor schädlichen UV-Strahlen"
- **Rollo:** noch offen — gleiche Zeile im Stil gesucht (z.B. „Rollos – Blend-
  und Hitzeschutz mit Stil"), bitte bestätigen oder eigenen Text von der
  Website übernehmen.

Der Text ist bewusst nicht ins Video gerendert (KI-Videotext ist unzuverlässig)
— stattdessen als Overlay/Caption auf der Website oder im Editor einfügen.

## Einbau auf sunreflex.ch

```html
<video autoplay muted loop playsinline poster="fallback.jpg">
  <source src="uv-folie-hero.mp4" type="video/mp4">
</video>
```

## Loop-Check

Bei beiden Videos liegen Start- und Endframe sehr nah beieinander (gleiche
Kameraposition, fertig „eingerichtetes" Produkt) — ein harter Loop ohne
Crossfade sollte in der Praxis unauffällig sein. Kein zusätzlicher
Crossfade-Schnitt vorgenommen; bei Bedarf lokal mit ffmpeg nachrüstbar
(kostenlos, kein Credit-Verbrauch).

## Credit-Log

| Schritt | Kosten | Rest |
|---|---|---|
| Start (Starter-Plan-Reset) | — | 270.00 |
| … (Kaleburcu-Kampagne, siehe anderes Projekt) | — | 76.85 |
| UV-Folie-Video (seedance_2_0, fast, 8s, 16:9) | -28 | 48.85 |
| Rollo-Video (seedance_2_0, fast, 8s, 16:9) | -28 | 20.85 |

**Verbleibend: 20.85 Credits** bis zum Reset am 12.09. (dann wieder 270).

## Bekannte Einschränkungen

- Kein reales Referenzfoto der Folie/des Rollo-Gewebes verfügbar (weder von
  euch noch auf sunreflex.ch) — beide Videos sind bewusst abstrakte
  Studio-Produktdarstellungen, keine 1:1-Abbildung eines konkreten
  Sunreflex-Produkts.
- „Loopable" ist bei generativem Video nie hart garantiert — siehe Loop-Check
  oben, wirkt aber in beiden Fällen bereits sehr sauber.
