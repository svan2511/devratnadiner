// Build-time guard — `npm run build` se pehle auto-chalta hai (prebuild).
// Check karta hai:
//   1. Map ki har file public/ me maujood hai (koi missing/typo nahi).
//   2. Har MENU + SIGNATURE dish kisi maujood photo pe resolve hoti hai.
// Fail hua to build ruk jayegi — galat/tooti photo kabhi live nahi jayegi.
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CATEGORY_FALLBACK_IMAGE,
  DISH_IMAGE_BY_NAME,
  MENU_ITEMS,
  SIGNATURE_DISHES,
} from '../src/data/site.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = (p) => join(root, 'public', String(p).replace(/^\//, ''));

let errors = 0;
let warnings = 0;
const fail = (m) => { errors++; console.error(`  ✗ ${m}`); };
const warn = (m) => { warnings++; console.warn(`  ! ${m}`); };

console.log('Checking dish images…');

// 1. Map ki har file maujood honi chahiye.
for (const [name, file] of Object.entries(DISH_IMAGE_BY_NAME)) {
  if (!existsSync(pub(file))) fail(`missing file: "${name}" → ${file}`);
}

// 2. Har dish resolve honi chahiye (map → img → category fallback).
const dishes = [
  ...MENU_ITEMS.map((d) => ({ ...d, from: 'menu' })),
  ...SIGNATURE_DISHES.map((d) => ({ ...d, from: 'signature' })),
];
for (const d of dishes) {
  const direct = DISH_IMAGE_BY_NAME[d.name];
  const resolved = direct ?? d.img ?? CATEGORY_FALLBACK_IMAGE[d.category];
  if (!resolved) {
    fail(`no image at all: "${d.name}" (${d.from})`);
    continue;
  }
  if (resolved.startsWith('http')) continue; // external URL — browser pe chalta hai
  if (!existsSync(pub(resolved))) {
    fail(`broken resolve: "${d.name}" (${d.from}) → ${resolved}`);
    continue;
  }
  if (!direct) warn(`fallback image: "${d.name}" (${d.from}) → ${resolved}`);
}

// 3. Stale entries — map me aisi key jo kisi dish se judi nahi.
const dishNames = new Set(dishes.map((d) => d.name));
for (const name of Object.keys(DISH_IMAGE_BY_NAME)) {
  if (!dishNames.has(name)) warn(`stale map key (kisi dish me nahi): "${name}"`);
}

const files = readdirSync(join(root, 'public')).filter((f) => f.endsWith('.jpg')).length;
console.log(`  …${Object.keys(DISH_IMAGE_BY_NAME).length} mapped, ${dishes.length} dishes, ${files} photos in public/`);
if (warnings > 0) console.log(`  ${warnings} warning(s) — chalega, par dekh lena.`);
if (errors > 0) {
  console.error(`IMAGE CHECK FAILED (${errors} error) — build roki gayi.`);
  process.exit(1);
}
console.log('Image check passed ✓');
