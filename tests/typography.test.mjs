import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const postcss = require('postcss');
const config = require('../tailwind.config.js');
const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');
const layout = await read('../app/layout.js');
const css = await read('../app/typography.css');
const globals = await read('../app/globals.css');
const parsed = postcss.parse(css);
const declarations = (selector) => {
  const result = [];
  parsed.walkRules((rule) => {
    if (rule.selector === selector) rule.walkDecls((decl) => result.push([decl.prop, decl.value]));
  });
  return result;
};

test('the bilingual fonts are build-time self-hosted with visible fallback text', () => {
  assert.match(layout, /IBM_Plex_Sans_Arabic, Manrope/);
  assert.equal((layout.match(/display: 'swap'/g) || []).length, 2);
  assert.match(layout, /weight: \['400', '500', '600'\]/);
  assert.match(layout, /adjustFontFallback: false/);
  assert.doesNotMatch(layout, /fonts\.googleapis\.com|fonts\.gstatic\.com|--font-cairo|--font-inter/);
});

test('both directions keep Manrope before Plex so Latin glyphs are not duplicated', () => {
  for (const direction of ['rtl', 'ltr']) {
    const rule = `html[dir="${direction}"] body { font-family: var(--font-latin), var(--font-arabic), Arial, sans-serif; }`;
    assert.ok(globals.includes(rule));
  }
  assert.match(layout, /<html lang=\{initialLang\} dir=\{initialLang === 'ar' \? 'rtl' : 'ltr'\}/);
});

test('Arabic headings have natural spacing and room for ascenders and marks', () => {
  const hero = declarations("html[dir='rtl'] .studio-hero h1");
  assert.ok(hero.some(([property, value]) => property === 'letter-spacing' && value === '0'));
  assert.ok(hero.some(([property, value]) => property === 'line-height' && Number(value) >= 1.4));
  assert.match(css, /font-synthesis: none/);
});

test('all utility weights correspond to the three installed Arabic weights', () => {
  const available = new Set(['400', '500', '600']);
  for (const name of ['normal', 'medium', 'semibold', 'bold', 'extrabold', 'black']) {
    assert.ok(available.has(config.theme.extend.fontWeight[name]), `${name} requests an unloaded weight`);
  }
});

test('body copy and supporting text have explicit readable type tokens', () => {
  assert.ok(declarations(':root').some(([p, v]) => p === '--type-copy' && v === '0.9375rem'));
  assert.ok(declarations(':root').some(([p, v]) => p === '--type-caption' && v === '0.8125rem'));
  assert.match(css, /font-variant-numeric: lining-nums tabular-nums/);
});

test('category names may reflow when a reader increases text spacing', () => {
  assert.ok(declarations('.studio-category span').some(([property, value]) => property === 'overflow-wrap' && value === 'break-word'));
  assert.ok(declarations('.studio-category span').some(([property, value]) => property === 'width' && value === '100%'));
  assert.ok(declarations('.studio-category span').some(([property, value]) => property === 'min-width' && value === '0'));
});

test('the final project action retains breathing room around either script', () => {
  assert.ok(declarations('.studio-final .btn').some(([property, value]) => property === 'padding-inline' && value === '1.5rem'));
});

test('both font licenses remain available in the public distribution', async () => {
  for (const file of ['IBM-Plex-Sans-Arabic-OFL.txt', 'Manrope-OFL.txt']) {
    const license = await read(`../public/fonts/licenses/${file}`);
    assert.match(license, /SIL OPEN FONT LICENSE Version 1\.1/);
    assert.match(license, /Copyright/);
    assert.match(license, /PERMISSION & CONDITIONS/);
  }
});
