// Gemini chat proxy — a Vercel Serverless Function. Keeps GEMINI_API_KEY server-side
// (set via `vercel env add GEMINI_API_KEY`, never committed to git or shipped to the
// browser). The widget's frontend JS only ever talks to /api/chat, never to Google
// directly.

// Gehalten synchron mit der FAQ-Sektion auf kontakt.html — dieselben Fakten,
// damit Chat-Antworten und die sichtbare FAQ-Seite nie auseinanderlaufen.
const FAQ = [
  ['Bieten Sie eine kostenlose Beratung an?', 'Ja. Wir beraten unverbindlich telefonisch, per E-Mail oder direkt im Showroom in Brüttisellen.'],
  ['Was kostet ein Sonnenschutzsystem?', 'Abhängig von Grösse, Produkt und Montageaufwand. Nach kurzer Abklärung gibt es ein unverbindliches Angebot.'],
  ['In welchen Regionen sind Sie tätig?', 'Ganze Schweiz und Liechtenstein, mit Montagepartnern schweizweit.'],
  ['Welche Produkte bieten Sie an?', 'Sonnenschutzfolien, UV-Schutzfolien, Sonnenschutz-Rollos, textile Systeme, Sicht- und Splitterschutz, Vogelschutz.'],
  ['Mit welchen Herstellern arbeiten Sie zusammen?', '3M, Avery Dennison, ImagePerfect, MULTIFILM®, LEHA, Silent Gliss, Création Baumann, MHZ.'],
  ['Kann ich einen Termin im Showroom vereinbaren?', 'Ja, Montag–Freitag 8.00–17.00 Uhr nach Voranmeldung, Stationsstrasse 1, 8306 Brüttisellen.'],
  ['Wie läuft ein Projekt ab?', 'Beratung, Aufmass am Objekt, Fertigung nach Mass, Montage durch eigenes Team oder Montagepartner.'],
  ['Arbeiten Sie auch mit Firmen, Spitälern oder öffentlichen Gebäuden?', 'Ja, Referenzen aus Gesundheitswesen, Bürogebäuden und Gewerbe.'],
  ['Wie finde ich das richtige Produkt für mein Fenster?', 'Online-Konfigurator (5 Fragen) auf der Startseite, oder persönliche Beratung.'],
  ['Wie kann ich Sie kontaktieren?', 'Telefon +41 44 802 90 70, E-Mail info@sunreflex.ch, WhatsApp, Kontaktformular oder dieser Chat.']
].map(function (pair) { return '- F: ' + pair[0] + ' A: ' + pair[1]; }).join('\n');

const SYSTEM_PROMPT = 'Du bist der freundliche digitale Berater von Sunreflex, einem '
  + 'Schweizer Anbieter für Sonnen- und Blendschutz (Sonnenschutzfolien, UV-Schutzfolien, '
  + 'Sonnenschutz-Rollos, textile Systeme, Sicht- und Splitterschutz, Vogelschutz) mit '
  + 'Showroom in Brüttisellen. Antworte kurz, konkret und auf Deutsch.\n\n'
  + 'Nutze für Antworten in erster Linie folgende, bestätigte Firmen-Fakten (das ist eure '
  + 'FAQ-Wissensbasis, exakt wie auf der Kontaktseite veröffentlicht):\n' + FAQ + '\n\n'
  + 'Wenn eine Frage über diese Fakten hinausgeht und eine persönliche Beratung, ein Angebot '
  + 'oder eine Vor-Ort-Einschätzung braucht, verweise freundlich auf das Kontaktformular oder '
  + 'die Telefonnummer +41 44 802 90 70. Erfinde keine Preise, Garantien oder technischen '
  + 'Kennzahlen, die nicht oben stehen oder dir sonst sicher bekannt sind.';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ reply: 'Methode nicht erlaubt.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ reply: 'Chat ist momentan nicht konfiguriert.' });
    return;
  }

  const body = req.body || {};
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 1000) : '';

  if (!message) {
    res.status(200).json({ reply: 'Wie kann ich Ihnen weiterhelfen?' });
    return;
  }

  if (message === '__START__') {
    res.status(200).json({
      reply: 'Hallo! Ich bin der digitale Berater von Sunreflex. Fragen Sie mich zu '
        + 'Sonnenschutzfolien, UV-Schutz, Rollos oder textilen Systemen — ich helfe gerne weiter.'
    });
    return;
  }

  try {
    const geminiRes = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: 'user', parts: [{ text: message }] }]
        })
      }
    );

    const rawBody = await geminiRes.text();
    if (!geminiRes.ok) {
      console.error('Gemini API error', geminiRes.status, rawBody);
      res.status(200).json({
        reply: 'Entschuldigung, ich bin gerade nicht erreichbar. Bitte kontaktieren Sie uns direkt telefonisch oder per E-Mail.'
      });
      return;
    }

    const data = JSON.parse(rawBody);
    const reply = data && data.candidates && data.candidates[0]
      && data.candidates[0].content && data.candidates[0].content.parts
      && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text;

    res.status(200).json({ reply: reply || 'Entschuldigung, dazu habe ich gerade keine Antwort. Bitte kontaktieren Sie uns direkt.' });
  } catch (err) {
    console.error('Chat proxy exception', err && err.stack || err);
    res.status(200).json({
      reply: 'Entschuldigung, ich bin gerade nicht erreichbar. Bitte kontaktieren Sie uns direkt telefonisch oder per E-Mail.'
    });
  }
};
