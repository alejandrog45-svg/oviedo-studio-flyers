// Guardia anti-despliegue accidental del conector MCP. Sin dependencias:
//   node --test mcp-claude/test/blindaje.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => fs.readFileSync(path.join(dir, f), 'utf8');
const nameOf = (t) => (t.match(/^\s*name\s*=\s*"([^"]+)"/m) || [])[1];
const PROD = 'studio-claude-mcp';

test('wrangler.toml NO apunta al Worker de produccion y no tiene direccion publica', () => {
  const t = read('wrangler.toml');
  assert.notEqual(nameOf(t), PROD, 'wrangler.toml no puede llamarse como el Worker de produccion');
  assert.match(nameOf(t) || '', /prueba/, 'el nombre seguro debe contener "prueba"');
  assert.match(t, /^\s*workers_dev\s*=\s*false/m, 'workers_dev debe ser false en la config segura');
});

test('wrangler.produccion.toml describe el Worker real', () => {
  assert.equal(nameOf(read('wrangler.produccion.toml')), PROD);
});

test('ambas configuraciones llevan el service binding V2 -> nexus-oviedo-studio-v2', () => {
  for (const f of ['wrangler.toml', 'wrangler.produccion.toml']) {
    const t = read(f);
    assert.match(t, /binding\s*=\s*"V2"/, f);
    assert.match(t, /service\s*=\s*"nexus-oviedo-studio-v2"/, f);
  }
});

test('ninguna configuracion guarda secretos ni variables', () => {
  for (const f of ['wrangler.toml', 'wrangler.produccion.toml']) {
    const t = read(f);
    assert.doesNotMatch(t, /^\s*\[vars\]/m, `${f} no debe tener [vars]`);
    assert.doesNotMatch(t, /(OVIEDO_MCP_TOKEN|GITHUB_READ_TOKEN)\s*=/, `${f} no debe asignar secretos`);
  }
});

test('el codigo y las configuraciones no contienen tokens', () => {
  for (const f of ['src/index.js', 'wrangler.toml', 'wrangler.produccion.toml', 'README.md']) {
    const t = read(f);
    assert.doesNotMatch(t, /Bearer [A-Za-z0-9_\-]{20,}/, f);
    assert.doesNotMatch(t, /\b(ghp_|gho_|github_pat_|sk-)[A-Za-z0-9_]{10,}/, f);
  }
});

test('el README abre con la advertencia NO DESPLEGAR', () => {
  const head = read('README.md').split('\n').slice(0, 14).join('\n');
  assert.match(head, /NO DESPLEGAR/);
  assert.match(head, /wrangler\.produccion\.toml/);
});