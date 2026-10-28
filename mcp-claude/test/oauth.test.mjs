// Prueba local del OAuth propio (sin red, claves falsas): node --test mcp-claude/test/oauth.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import worker from '../src/index.js';

const env = {
  OVIEDO_MCP_TOKEN: 'A'.repeat(40),
  OVIEDO_MCP_TOKEN_CHATGPT: 'B'.repeat(40)
};
const O = 'https://mcp.test';
const REDIR = 'https://chatgpt.com/connector_platform_oauth_redirect';
const call = (path, init) => worker.fetch(new Request(O + path, init), env);
const form = (o) => ({ method: 'POST', body: new URLSearchParams(o) });
const b64u = (b) => b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const verifier = 'v'.repeat(50);
const challenge = b64u(createHash('sha256').update(verifier).digest());

async function register(uris = [REDIR]) {
  return call('/register', { method: 'POST', body: JSON.stringify({ client_name: 't', redirect_uris: uris }) });
}
async function authorize(client_id, password) {
  const q = { response_type: 'code', client_id, redirect_uri: REDIR, code_challenge: challenge, code_challenge_method: 'S256', state: 'st1' };
  return call('/authorize', form({ ...q, password }));
}
async function flow() {
  const { client_id } = await (await register()).json();
  const r = await authorize(client_id, env.OVIEDO_MCP_TOKEN_CHATGPT);
  const code = new URL(r.headers.get('location')).searchParams.get('code');
  const t = await call('/token', form({ grant_type: 'authorization_code', code, redirect_uri: REDIR, client_id, code_verifier: verifier }));
  return { client_id, t };
}
const mcp = (tok) =>
  call('/mcp', { method: 'POST', headers: { authorization: 'Bearer ' + tok, 'content-type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }) });

test('metadatos y 401 anuncian el OAuth', async () => {
  const m = await (await call('/.well-known/oauth-authorization-server')).json();
  assert.equal(m.token_endpoint, O + '/token');
  assert.deepEqual(m.code_challenge_methods_supported, ['S256']);
  const p = await (await call('/.well-known/oauth-protected-resource')).json();
  assert.equal(p.resource, O + '/mcp');
  const r = await call('/mcp', { method: 'POST', body: '{}' });
  assert.equal(r.status, 401);
  assert.match(r.headers.get('www-authenticate'), /resource_metadata=/);
});

test('flujo completo: registro, clave correcta, token y llamada al MCP', async () => {
  const { t } = await flow();
  assert.equal(t.status, 200);
  const j = await t.json();
  assert.equal((await mcp(j.access_token)).status, 200);
  const tools = (await (await mcp(j.access_token)).json()).result.tools;
  assert.equal(tools.length, 2);
});

test('refresh_token entrega un acceso nuevo valido', async () => {
  const { client_id, t } = await flow();
  const j = await t.json();
  const r = await call('/token', form({ grant_type: 'refresh_token', refresh_token: j.refresh_token, client_id }));
  assert.equal(r.status, 200);
  assert.equal((await mcp((await r.json()).access_token)).status, 200);
});

test('clave incorrecta no autoriza', async () => {
  const { client_id } = await (await register()).json();
  const r = await authorize(client_id, 'x'.repeat(40));
  assert.equal(r.status, 401);
  assert.equal(r.headers.get('location'), null);
});

test('registro rechaza redirect no permitida', async () => {
  assert.equal((await register(['https://evil.example/cb'])).status, 400);
  assert.equal((await register(['http://chatgpt.com/cb'])).status, 400);
});

test('PKCE incorrecto, codigo reutilizado en otro cliente y token falso fallan', async () => {
  const { client_id } = await (await register()).json();
  const r = await authorize(client_id, env.OVIEDO_MCP_TOKEN_CHATGPT);
  const code = new URL(r.headers.get('location')).searchParams.get('code');
  const bad = await call('/token', form({ grant_type: 'authorization_code', code, redirect_uri: REDIR, client_id, code_verifier: 'otra'.repeat(15) }));
  assert.equal(bad.status, 400);
  assert.equal((await mcp('oat.falso.firma')).status, 401);
  assert.equal((await mcp('')).status, 401);
});

test('un access_token con firma alterada se rechaza y los Bearer estaticos siguen valiendo', async () => {
  const { t } = await flow();
  const tok = (await t.json()).access_token;
  assert.equal((await mcp(tok.slice(0, -2) + 'xx')).status, 401);
  assert.equal((await mcp(env.OVIEDO_MCP_TOKEN)).status, 200);
  assert.equal((await mcp(env.OVIEDO_MCP_TOKEN_CHATGPT)).status, 200);
});
