import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (file) => readFile(new URL(file, import.meta.url), 'utf8');
const css = await read('../app/globals.css');
const start = await read('../app/start-here/page.js');
const home = await read('../app/page.js');
const card = await read('../components/AudiencePathCard.jsx');

test('the project owner is the only primary path and all destinations stay intact', () => {
  assert.equal((start.match(/^\s+primary$/gm) || []).length, 1);
  assert.match(start, /pathType="project"\s+primary/);
  for (const href of ['/post-project', '/contractor', '/contractor?type=consultant']) {
    assert.ok(start.includes(`href="${href}"`));
  }
  assert.equal((card.match(/data-primary=\{primary \? 'true' : undefined\}/g) || []).length, 2);
});

test('category affordance follows writing direction without replacing real links', () => {
  assert.match(css, /\.studio-category > svg:last-child \{[^}]*display: block;[^}]*inset-inline-end: 12px/);
  assert.ok(home.includes('href={`/post-project?category=${category}`}'));
  assert.match(home, /dir === 'rtl' \? 'rotate-180'/);
});

test('FAQ open-state styling keeps the existing accessible accordion behavior', () => {
  assert.match(home, /<Accordion type="single" collapsible/);
  assert.match(css, /\.studio-accordion > div\[data-state="open"\]/);
  assert.match(css, /\.studio-accordion \[role="region"\] \{ margin-inline: 16px/);
  assert.match(css, /\.studio-accordion button\[data-state="open"\] \.accordion-chevron \{ color: #152B54/);
});

test('entry-card feedback is scoped and does not add motion or a new tracker', () => {
  assert.match(css, /\.start-here-grid \.path-card \{[^}]*transform: none;[^}]*transition: background-color 150ms ease, border-color 150ms ease/);
  assert.match(css, /\.path-card-link-label > span \{ color: #152B54/);
  assert.match(card, /trackMeta\('PathSelected'/);
  assert.doesNotMatch(start, /setTimeout|IntersectionObserver|fbq\(/);
});

test('each whole-card link exposes its existing title and action as an accessible name', () => {
  assert.ok(card.includes('aria-label={cta ? `${title} — ${cta}` : title}'));
});
