import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { estimateReadingTime } from '../src/lib/format';

test('publication calendar date stays the same across reader time zones', () => {
  for (const zone of ['America/Los_Angeles', 'UTC', 'Asia/Tokyo']) {
    const result = spawnSync(process.execPath, [
      '--import', 'tsx', '--input-type=module', '-e',
      `import assert from 'node:assert/strict';
       import { formatLongDate, formatShortDate } from './src/lib/format.ts';
       for (const date of ['2026-10-29', '2026-10-29T00:00:00.000Z']) {
         assert.equal(formatLongDate(date), 'October 29, 2026');
         assert.equal(formatShortDate(date), 'Oct 29, 2026');
       }`,
    ], { env: { ...process.env, TZ: zone }, encoding: 'utf8' });
    assert.equal(result.status, 0, `${zone}: ${result.stderr}`);
  }
});

test('Chinese prose without whitespace counts toward reading time', () => {
  assert.equal(estimateReadingTime('研究'.repeat(600)), 3);
});

test('mixed Chinese and English adds both reading estimates', () => {
  assert.equal(estimateReadingTime('研'.repeat(800) + ' research'.repeat(220)), 3);
});

test('English and empty content retain a useful minimum', () => {
  assert.equal(estimateReadingTime('research '.repeat(440)), 2);
  assert.equal(estimateReadingTime(''), 1);
});
