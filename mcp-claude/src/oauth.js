// OAuth 2.1 propio y SIN ESTADO para el conector MCP (ChatGPT web exige OAuth o nada).
// Sin base de datos: codigos y tokens son JSON firmado (HMAC-SHA256) con una clave derivada
// del secreto OVIEDO_MCP_TOKEN. Rotar ese secreto invalida todos los tokens OAuth.
// El dueño aprueba cada conexion escribiendo su clave (OVIEDO_MCP_TOKEN_CHATGPT u OVIEDO_MCP_TOKEN)
// en la pagina /authorize. Nunca se guardan secretos en el repo.
const enc = new TextEncoder();
const dec = new TextDecoder();

const ACCESS_TTL = 24 * 3600;
const REFRESH_TTL = 90 * 24 * 3600;
const CODE_TTL = 120;
const CLIENT_TTL = 10 * 365 * 24 * 3600;
const ALLOWED_HOSTS = ["chatgpt.com", "openai.com", "claude.ai", "claude.com"];

const b64u = (buf) =>
  btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

const unb64u = (s) =>
  Uint8Array.from(atob(String(s).replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));

const now = () => Math.floor(Date.now() / 1000);

function eq(a, b) {
  const x = enc.encode(a);
  const y = enc.encode(b);
  let z = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) z |= (x[i] || 0) ^ (y[i] || 0);
  return z === 0;
}

const hmacKey = (env) =>
  crypto.subtle.importKey("raw", enc.encode("oauth-v1:" + env.OVIEDO_MCP_TOKEN), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);

async function sign(env, obj) {
  const p = b64u(enc.encode(JSON.stringify(obj)));
  const s = await crypto.subtle.sign("HMAC", await hmacKey(env), enc.encode(p));
  return p + "." + b64u(s);
}

async function verify(env, token, type) {
  try {
    const [p, s] = String(token).split(".");
    if (!p || !s) return null;
    if (!(await crypto.subtle.verify("HMAC", await hmacKey(env), unb64u(s), enc.encode(p)))) return null;
    const o = JSON.parse(dec.decode(unb64u(p)));
    if (o.t !== type || !o.exp || o.exp < now()) return null;
    return o;
  } catch {
    return null;
  }
}

export async function isAccessToken(env, token) {
  return !!(await verify(env, token, "at"));
}

const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "content-type, authorization, mcp-protocol-version",
  "access-control-allow-methods": "GET, POST, OPTIONS"
};

const json = (v, status = 200) =>
  new Response(JSON.stringify(v), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store", ...CORS }
  });

const oerr = (error, description, status = 400) => json({ error, error_description: description }, status);

function redirectAllowed(u) {
  try {
    const r = new URL(u);
    if (r.hash) return false;
    if (r.protocol === "http:") return r.hostname === "localhost" || r.hostname === "127.0.0.1";
    if (r.protocol !== "https:") return false;
    return ALLOWED_HOSTS.some((h) => r.hostname === h || r.hostname.endsWith("." + h));
  } catch {
    return false;
  }
}

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const FIELDS = ["response_type", "client_id", "redirect_uri", "code_challenge", "code_challenge_method", "state"];

function page(params, message) {
  const hidden = FIELDS.map((f) => `<input type="hidden" name="${f}" value="${esc(params[f] || "")}">`).join("");
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Autorizar conector</title>
<style>body{font:16px system-ui;max-width:28rem;margin:3rem auto;padding:0 1rem;color:#1b1b1b}input[type=password]{width:100%;padding:.6rem;margin:.5rem 0 1rem;box-sizing:border-box}button{padding:.6rem 1.2rem;font-size:1rem}.e{color:#b00020}</style></head><body>
<h1>Oviedo Studio MCP</h1><p>Una IA pide acceso de <strong>solo lectura</strong> al estado del proyecto. Escribe tu clave del conector para autorizar.</p>
${message ? `<p class="e">${esc(message)}</p>` : ""}
<form method="post" action="/authorize">${hidden}<label>Clave del conector<input type="password" name="password" autocomplete="off" required autofocus></label><button type="submit">Autorizar</button></form></body></html>`;
  return new Response(html, {
    status: message ? 401 : 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "content-security-policy": "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'",
      "x-content-type-options": "nosniff"
    }
  });
}

async function checkAuthorizeParams(env, p) {
  if (p.response_type !== "code") return "response_type debe ser code";
  if (p.code_challenge_method !== "S256" || !p.code_challenge) return "Se exige PKCE S256";
  const client = await verify(env, p.client_id, "cid");
  if (!client) return "client_id no valido";
  if (!client.ru.includes(p.redirect_uri)) return "redirect_uri no registrada";
  return null;
}

export async function handleOAuth(request, env, url) {
  const path = url.pathname;
  const known =
    path.startsWith("/.well-known/oauth-") || ["/register", "/authorize", "/token"].includes(path);
  if (!known) return null;

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (!env.OVIEDO_MCP_TOKEN || env.OVIEDO_MCP_TOKEN.length < 32) return oerr("server_error", "server_not_configured", 503);

  const origin = url.origin;

  if (path.startsWith("/.well-known/oauth-protected-resource")) {
    return json({ resource: origin + "/mcp", authorization_servers: [origin], bearer_methods_supported: ["header"] });
  }

  if (path.startsWith("/.well-known/oauth-authorization-server")) {
    return json({
      issuer: origin,
      authorization_endpoint: origin + "/authorize",
      token_endpoint: origin + "/token",
      registration_endpoint: origin + "/register",
      response_types_supported: ["code"],
      grant_types_supported: ["authorization_code", "refresh_token"],
      code_challenge_methods_supported: ["S256"],
      token_endpoint_auth_methods_supported: ["none"]
    });
  }

  if (path === "/register" && request.method === "POST") {
    let b;
    try {
      b = await request.json();
    } catch {
      return oerr("invalid_client_metadata", "JSON invalido");
    }
    const uris = Array.isArray(b.redirect_uris) ? b.redirect_uris : [];
    if (!uris.length || uris.length > 5 || !uris.every(redirectAllowed)) {
      return oerr("invalid_redirect_uri", "redirect_uris no permitidas");
    }
    const client_id = await sign(env, { t: "cid", ru: uris, exp: now() + CLIENT_TTL });
    return json(
      {
        client_id,
        client_name: String(b.client_name || "cliente MCP").slice(0, 80),
        redirect_uris: uris,
        token_endpoint_auth_method: "none",
        grant_types: ["authorization_code", "refresh_token"],
        response_types: ["code"]
      },
      201
    );
  }

  if (path === "/authorize") {
    if (request.method === "GET") {
      const p = Object.fromEntries(FIELDS.map((f) => [f, url.searchParams.get(f) || ""]));
      const bad = await checkAuthorizeParams(env, p);
      if (bad) return new Response(bad, { status: 400, headers: { "content-type": "text/plain; charset=utf-8" } });
      return page(p);
    }
    if (request.method === "POST") {
      const f = await request.formData();
      const p = Object.fromEntries(FIELDS.map((k) => [k, String(f.get(k) || "")]));
      const bad = await checkAuthorizeParams(env, p);
      if (bad) return new Response(bad, { status: 400, headers: { "content-type": "text/plain; charset=utf-8" } });
      const pw = String(f.get("password") || "");
      const keys = [env.OVIEDO_MCP_TOKEN_CHATGPT, env.OVIEDO_MCP_TOKEN].filter((k) => k && k.length >= 32);
      if (!pw || !keys.some((k) => eq(pw, k))) return page(p, "Clave incorrecta.");
      const code = await sign(env, { t: "code", cid: p.client_id, ru: p.redirect_uri, cc: p.code_challenge, exp: now() + CODE_TTL });
      const to = new URL(p.redirect_uri);
      to.searchParams.set("code", code);
      if (p.state) to.searchParams.set("state", p.state);
      return new Response(null, { status: 302, headers: { location: to.toString(), "cache-control": "no-store" } });
    }
    return new Response(null, { status: 405 });
  }

  if (path === "/token" && request.method === "POST") {
    const f = await request.formData();
    const g = (k) => String(f.get(k) || "");
    const client = await verify(env, g("client_id"), "cid");
    if (!client) return oerr("invalid_client", "client_id no valido", 401);
    const issue = async () =>
      json({
        access_token: await sign(env, { t: "at", exp: now() + ACCESS_TTL }),
        token_type: "Bearer",
        expires_in: ACCESS_TTL,
        refresh_token: await sign(env, { t: "rt", cid: g("client_id"), exp: now() + REFRESH_TTL })
      });
    if (g("grant_type") === "authorization_code") {
      const c = await verify(env, g("code"), "code");
      if (!c || c.cid !== g("client_id") || c.ru !== g("redirect_uri")) return oerr("invalid_grant", "codigo no valido");
      const digest = b64u(await crypto.subtle.digest("SHA-256", enc.encode(g("code_verifier"))));
      if (!g("code_verifier") || !eq(digest, c.cc)) return oerr("invalid_grant", "PKCE no coincide");
      return issue();
    }
    if (g("grant_type") === "refresh_token") {
      const r = await verify(env, g("refresh_token"), "rt");
      if (!r || r.cid !== g("client_id")) return oerr("invalid_grant", "refresh_token no valido");
      return issue();
    }
    return oerr("unsupported_grant_type", "grant_type no soportado");
  }

  return new Response(null, { status: 405 });
}
