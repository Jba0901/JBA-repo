import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolveLanguage, isLanguage } from '../lib/language.mjs';

test('explicit Arabic and English links override the remembered language', () => {
  assert.equal(resolveLanguage('en', 'ar'), 'en');
  assert.equal(resolveLanguage('ar', 'en'), 'ar');
});

test('a valid cookie is used when the URL has no supported language', () => {
  assert.equal(resolveLanguage(null, 'en'), 'en');
  assert.equal(resolveLanguage('xx', 'en'), 'en');
  assert.equal(resolveLanguage(undefined, 'ar'), 'ar');
});

test('untrusted locale values cannot escape the two-language allowlist', () => {
  for (const value of [undefined, null, '', 'EN', 'fr', '<script>', '../../en']) {
    assert.equal(isLanguage(value), false);
    assert.equal(resolveLanguage(value, value), 'ar');
  }
});

test('server HTML and hydrated context share the same initial language', async () => {
  const layout = await readFile(new URL('../app/layout.js', import.meta.url), 'utf8');
  const context = await readFile(new URL('../lib/LangContext.js', import.meta.url), 'utf8');
  assert.match(layout, /headers\(\)\.get\(LANG_HEADER\)/);
  assert.match(layout, /<LangProvider initialLang=\{initialLang\}>/);
  assert.match(context, /useState\(initialLang\)/);
  assert.doesNotMatch(context, /localStorage\.getItem/);
  assert.match(context, /url\.searchParams\.set\('lang', nextLang\)/);
  assert.match(context, /SameSite=Lax/);
});
