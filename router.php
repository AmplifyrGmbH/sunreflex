<?php
// ============================================================
// CONFIG
// ============================================================
define('SITE_PASSWORD', 'beat');            // <-- Passwort hier ändern
define('SESSION_NAME', 'sr_preview');

// ============================================================
// NOINDEX – alle Responses bekommen diesen Header
// ============================================================
header('X-Robots-Tag: noindex, nofollow');

// ============================================================
// PASSWORTSCHUTZ
// ============================================================
session_name(SESSION_NAME);
session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'httponly' => true,
    'samesite' => 'Lax',
    'secure'   => isset($_SERVER['HTTPS']),
]);
session_start();

// Lokal (PHP built-in server) braucht kein Passwort
$isLocal      = PHP_SAPI === 'cli-server';
$authenticated = $isLocal || !empty($_SESSION['auth']);

if (!$authenticated) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['pw'])) {
        if ($_POST['pw'] === SITE_PASSWORD) {
            $_SESSION['auth'] = true;
            $redirect = $_SERVER['REQUEST_URI'] ?? '/';
            header('Location: ' . $redirect);
            exit;
        }
        $error = true;
    }

    http_response_code(401);
    header('Content-Type: text/html; charset=UTF-8');
    $err = !empty($error) ? '<p class="err">Falsches Passwort.</p>' : '';
    echo <<<HTML
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Vorschau – Sunreflex</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0c1620;
    font-family: system-ui, sans-serif;
    color: #fff;
  }
  .box {
    width: 100%;
    max-width: 360px;
    padding: 40px 32px;
    background: #131f2b;
    border: 1px solid rgba(255,255,255,.1);
  }
  .logo { font-size: 13px; letter-spacing: .12em; color: rgba(255,255,255,.5); margin-bottom: 28px; }
  h1 { font-size: 20px; font-weight: 600; margin-bottom: 8px; }
  p { font-size: 14px; color: rgba(255,255,255,.55); margin-bottom: 24px; }
  label { display: block; font-size: 13px; margin-bottom: 6px; color: rgba(255,255,255,.7); }
  input[type=password] {
    width: 100%;
    padding: 10px 12px;
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.15);
    color: #fff;
    font-size: 15px;
    margin-bottom: 14px;
    outline: none;
  }
  input[type=password]:focus { border-color: #1668C4; }
  button {
    width: 100%;
    padding: 11px;
    background: #1668C4;
    color: #fff;
    border: none;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
  }
  button:hover { background: #1257a8; }
  .err { color: #f87171; margin-bottom: 12px; font-size: 13px; }
</style>
</head>
<body>
<div class="box">
  <div class="logo">SUNREFLEX · VORSCHAU</div>
  <h1>Zugang erforderlich</h1>
  <p>Diese Seite ist passwortgeschützt.</p>
  <form method="post">
    $err
    <label for="pw">Passwort</label>
    <input type="password" id="pw" name="pw" autofocus autocomplete="current-password">
    <button type="submit">Weiter</button>
  </form>
</div>
</body>
</html>
HTML;
    exit;
}

// ============================================================
// ROUTING – Clean URLs
// ============================================================
$uri  = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$file = __DIR__ . $uri;

// Serve existing static files directly
if ($uri !== '/' && file_exists($file) && !is_dir($file)) {
    return false;
}

// Directory → index.html
if (is_dir($file)) {
    $index = rtrim($file, '/') . '/index.html';
    if (file_exists($index)) {
        header('Content-Type: text/html; charset=UTF-8');
        echo file_get_contents($index);
        return true;
    }
}

// Clean URL → .html
$htmlFile = rtrim($file, '/') . '.html';
if (file_exists($htmlFile)) {
    header('Content-Type: text/html; charset=UTF-8');
    echo file_get_contents($htmlFile);
    return true;
}

// 404
http_response_code(404);
$notFound = __DIR__ . '/404.html';
if (file_exists($notFound)) {
    header('Content-Type: text/html; charset=UTF-8');
    echo file_get_contents($notFound);
}
return true;
