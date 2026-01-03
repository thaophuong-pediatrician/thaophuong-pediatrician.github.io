#!/usr/bin/env node

/**
 * Additional test specifically for Z-Score flag classification
 * This tests the edge cases for the classification logic
 */

// Original logic
function ZscoreFlag_Original(zScore) {
  if ((zScore >= 1.65 && zScore < 1.96) || (zScore > -1.96 && zScore <= -1.67)) {
    return 'borderline';
  } else if ((zScore >= 1.96 && zScore < 3) || (zScore > -3 && zScore <= -1.96)) {
    return 'mild';
  } else if ((zScore >= 3 && zScore < 4) || (zScore > -4 && zScore <= -3)) {
    return 'moderate';
  } else if (zScore >= 4 || zScore <= -4) {
    return 'severe';
  } else return 'normal';
}

// New logic
function getZScoreClass_New(zScore) {
  if (zScore === null) return '';
  if ((zScore >= 1.65 && zScore < 1.96) || (zScore > -1.96 && zScore <= -1.67)) {
    return 'borderline';
  } else if ((zScore >= 1.96 && zScore < 3) || (zScore > -3 && zScore <= -1.96)) {
    return 'mild';
  } else if ((zScore >= 3 && zScore < 4) || (zScore > -4 && zScore <= -3)) {
    return 'moderate';
  } else if (zScore >= 4 || zScore <= -4) {
    return 'severe';
  }
  return 'normal';
}

console.log('Z-Score Flag Classification Test');
console.log('='.repeat(80));

const testCases = [
  { z: 0, expected: 'normal', desc: 'Zero (normal)' },
  { z: 1.0, expected: 'normal', desc: '1.0 (normal)' },
  { z: 1.64, expected: 'normal', desc: '1.64 (normal, just below borderline)' },
  { z: 1.65, expected: 'borderline', desc: '1.65 (borderline start)' },
  { z: 1.80, expected: 'borderline', desc: '1.80 (borderline middle)' },
  { z: 1.95, expected: 'borderline', desc: '1.95 (borderline end)' },
  { z: 1.96, expected: 'mild', desc: '1.96 (mild start)' },
  { z: 2.5, expected: 'mild', desc: '2.5 (mild middle)' },
  { z: 2.99, expected: 'mild', desc: '2.99 (mild end)' },
  { z: 3.0, expected: 'moderate', desc: '3.0 (moderate start)' },
  { z: 3.5, expected: 'moderate', desc: '3.5 (moderate middle)' },
  { z: 3.99, expected: 'moderate', desc: '3.99 (moderate end)' },
  { z: 4.0, expected: 'severe', desc: '4.0 (severe start)' },
  { z: 5.0, expected: 'severe', desc: '5.0 (severe)' },
  { z: -1.0, expected: 'normal', desc: '-1.0 (normal)' },
  { z: -1.64, expected: 'normal', desc: '-1.64 (normal)' },
  { z: -1.68, expected: 'borderline', desc: '-1.68 (borderline, note: original uses <= -1.67)' },
  { z: -1.67, expected: 'borderline', desc: '-1.67 (borderline end)' },
  { z: -1.96, expected: 'mild', desc: '-1.96 (mild start)' },
  { z: -2.5, expected: 'mild', desc: '-2.5 (mild)' },
  { z: -2.99, expected: 'mild', desc: '-2.99 (mild end)' },
  { z: -3.0, expected: 'moderate', desc: '-3.0 (moderate start)' },
  { z: -3.5, expected: 'moderate', desc: '-3.5 (moderate)' },
  { z: -3.99, expected: 'moderate', desc: '-3.99 (moderate end)' },
  { z: -4.0, expected: 'severe', desc: '-4.0 (severe start)' },
  { z: -5.0, expected: 'severe', desc: '-5.0 (severe)' },
];

let passed = 0;
let failed = 0;

testCases.forEach(({ z, expected, desc }) => {
  const original = ZscoreFlag_Original(z);
  const newResult = getZScoreClass_New(z);
  const match = original === expected && newResult === expected && original === newResult;

  if (match) {
    console.log(`✅ Z=${z.toFixed(2).padStart(6)}: ${expected.padEnd(10)} - ${desc}`);
    passed++;
  } else {
    console.log(`❌ Z=${z.toFixed(2).padStart(6)}: Expected=${expected}, Original=${original}, New=${newResult} - ${desc}`);
    failed++;
  }
});

console.log('\n' + '='.repeat(80));
console.log(`Total: ${testCases.length}, Passed: ${passed}, Failed: ${failed}`);

if (failed === 0) {
  console.log('✅ All Z-Score flag classifications match!');
  process.exit(0);
} else {
  console.log('❌ Some classifications do not match!');
  process.exit(1);
}

