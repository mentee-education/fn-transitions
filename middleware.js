import { next } from '@vercel/functions';

/**
 * Server-side password gate (GCT3 pattern, as used on the bid sample sites).
 * Runs before any file is served, so a visitor without the password never receives
 * the page source, scripts, styles or the /docs files. Replaces the old browser-only
 * PasswordGate component; same password, same look. Local `pnpm dev` does not run this file.
 */
const PASSWORD = 'FNET';
const COOKIE = 'fn_transitions_access';
const TOKEN = 'granted-7c2e91b04d5a';

function loginPage(status = 401, message = '') {
  return new Response(
    `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Password Required</title>
<link rel="icon" href="/favicon.ico">
<style>
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0a0a0a;font-family:system-ui,sans-serif;padding:16px}
  form{display:flex;flex-direction:column;align-items:center;gap:16px;padding:48px;border-radius:12px;background:#111;border:1px solid #222;max-width:360px;width:100%}
  .label{font-size:14px;color:#888;letter-spacing:2px;text-transform:uppercase}
  input{width:100%;padding:12px 16px;border-radius:8px;border:1px solid ${message ? '#ef4444' : '#333'};background:#0a0a0a;color:#fff;font-size:16px;outline:none;transition:border-color .2s}
  button{width:100%;padding:12px;border-radius:8px;border:none;background:#fff;color:#000;font-size:14px;font-weight:600;cursor:pointer}
  .err{color:#ef4444;font-size:13px}
</style></head>
<body>
  <form method="POST">
    <div class="label">Password Required</div>
    <input type="password" name="password" placeholder="Enter password" aria-label="Password" autocomplete="current-password" autofocus required>
    <button type="submit">Enter</button>
    ${message ? `<div class="err">${message}</div>` : ''}
  </form>
</body></html>`,
    {
      status,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'x-robots-tag': 'noindex, nofollow',
      },
    }
  );
}

export default async function middleware(request) {
  const cookie = request.headers.get('cookie') || '';
  if (cookie.split(';').some((c) => c.trim() === `${COOKIE}=${TOKEN}`)) {
    return next();
  }

  if (request.method === 'POST') {
    let submitted = '';
    try {
      submitted = String((await request.formData()).get('password') || '');
    } catch {
      submitted = '';
    }
    if (submitted.trim() === PASSWORD) {
      const url = new URL(request.url);
      const https = (request.headers.get('x-forwarded-proto') || url.protocol).startsWith('https');
      // Session cookie (no Max-Age): like the old gate, the password is asked again in a new browser session.
      return new Response(null, {
        status: 303,
        headers: {
          location: url.pathname + url.search,
          'set-cookie': `${COOKIE}=${TOKEN}; Path=/; HttpOnly;${https ? ' Secure;' : ''} SameSite=Lax`,
        },
      });
    }
    return loginPage(401, 'Incorrect password');
  }

  return loginPage(401);
}

export const config = {
  runtime: 'edge',
  matcher: '/((?!favicon.ico|icon.png|apple-icon.png).*)',
};
