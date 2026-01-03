#!/usr/bin/env node

/**
 * Test script to verify Next.js implementation matches original Coronaries01.js logic
 * This is critical for patient care, so we test thoroughly.
 */

// ============================================================================
// ORIGINAL LOGIC (from Coronaries01.js)
// ============================================================================

const MYECHO_ORIGINAL = {
  bsa: 0,
  LMCAmean: 0,
  LADmean: 0,
  RCAmean: 0,
  LMCAsd: 0,
  LADsd: 0,
  RCAsd: 0,
};

function calcBSA_Original(height, weight) {
  const heightNum = parseFloat(String(height).replace(',', '.'));
  const weightNum = parseFloat(String(weight).replace(',', '.'));

  let bsa = 0;
  if (!isNaN(heightNum) && !isNaN(weightNum)) {
    MYECHO_ORIGINAL.bsa = 0.024265 * Math.pow(heightNum, 0.3964) * Math.pow(weightNum, 0.5378);
  } else if (isNaN(heightNum) && !isNaN(weightNum)) {
    MYECHO_ORIGINAL.bsa = 0.1 * Math.pow(weightNum, 0.6667);
  } else {
    MYECHO_ORIGINAL.bsa = 0;
  }

  // Update means and SDs
  MYECHO_ORIGINAL.RCAmean = (0.26117 * Math.pow(MYECHO_ORIGINAL.bsa, 0.39992)) - 0.02756;
  MYECHO_ORIGINAL.RCAsd = 0.02407 + (0.01597 * MYECHO_ORIGINAL.bsa);
  MYECHO_ORIGINAL.LADmean = (0.26108 * Math.pow(MYECHO_ORIGINAL.bsa, 0.37893)) - 0.02852;
  MYECHO_ORIGINAL.LADsd = 0.01465 + (0.01996 * MYECHO_ORIGINAL.bsa);
  MYECHO_ORIGINAL.LMCAmean = (0.31747 * Math.pow(MYECHO_ORIGINAL.bsa, 0.36008)) - 0.02887;
  MYECHO_ORIGINAL.LMCAsd = 0.03040 + (0.01514 * MYECHO_ORIGINAL.bsa);

  return MYECHO_ORIGINAL.bsa;
}

function getRange_Original(site) {
  switch (site) {
    case 'RCA':
      return (
        lower_Original(MYECHO_ORIGINAL.RCAmean, MYECHO_ORIGINAL.RCAsd) +
        ' - ' +
        upper_Original(MYECHO_ORIGINAL.RCAmean, MYECHO_ORIGINAL.RCAsd)
      );
    case 'LAD':
      return (
        lower_Original(MYECHO_ORIGINAL.LADmean, MYECHO_ORIGINAL.LADsd) +
        ' - ' +
        upper_Original(MYECHO_ORIGINAL.LADmean, MYECHO_ORIGINAL.LADsd)
      );
    case 'LMCA':
      return (
        lower_Original(MYECHO_ORIGINAL.LMCAmean, MYECHO_ORIGINAL.LMCAsd) +
        ' - ' +
        upper_Original(MYECHO_ORIGINAL.LMCAmean, MYECHO_ORIGINAL.LMCAsd)
      );
  }
}

function upper_Original(mean, sd) {
  return (10 * (mean + 1.65 * sd)).toFixed(2);
}

function lower_Original(mean, sd) {
  return (10 * (mean - 1.65 * sd)).toFixed(2);
}

function getZScore_Original(site, score) {
  const scoreNum = parseFloat(String(score).replace(',', '.'));
  if (isNaN(scoreNum)) return null;

  switch (site) {
    case 'RCA':
      return parseFloat(((scoreNum / 10 - MYECHO_ORIGINAL.RCAmean) / MYECHO_ORIGINAL.RCAsd).toFixed(2));
    case 'LAD':
      return parseFloat(((scoreNum / 10 - MYECHO_ORIGINAL.LADmean) / MYECHO_ORIGINAL.LADsd).toFixed(2));
    case 'LMCA':
      return parseFloat(((scoreNum / 10 - MYECHO_ORIGINAL.LMCAmean) / MYECHO_ORIGINAL.LMCAsd).toFixed(2));
  }
}

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

// ============================================================================
// NEW LOGIC (from Next.js component)
// ============================================================================

const MYECHO_NEW = {
  bsa: 0,
  LMCAmean: 0,
  LADmean: 0,
  RCAmean: 0,
  LMCAsd: 0,
  LADsd: 0,
  RCAsd: 0,
};

function calcBSA_New(height, weight) {
  const heightNum = parseFloat(String(height).replace(',', '.'));
  const weightNum = parseFloat(String(weight).replace(',', '.'));

  let bsa = 0;
  if (!isNaN(heightNum) && !isNaN(weightNum)) {
    bsa = 0.024265 * Math.pow(heightNum, 0.3964) * Math.pow(weightNum, 0.5378);
  } else if (isNaN(heightNum) && !isNaN(weightNum)) {
    bsa = 0.1 * Math.pow(weightNum, 0.6667);
  }

  MYECHO_NEW.bsa = bsa;
  MYECHO_NEW.RCAmean = (0.26117 * Math.pow(bsa, 0.39992)) - 0.02756;
  MYECHO_NEW.RCAsd = 0.02407 + (0.01597 * bsa);
  MYECHO_NEW.LADmean = (0.26108 * Math.pow(bsa, 0.37893)) - 0.02852;
  MYECHO_NEW.LADsd = 0.01465 + (0.01996 * bsa);
  MYECHO_NEW.LMCAmean = (0.31747 * Math.pow(bsa, 0.36008)) - 0.02887;
  MYECHO_NEW.LMCAsd = 0.03040 + (0.01514 * bsa);

  return bsa;
}

function getRange_New(site) {
  let mean = 0;
  let sd = 0;
  switch (site) {
    case 'RCA':
      mean = MYECHO_NEW.RCAmean;
      sd = MYECHO_NEW.RCAsd;
      break;
    case 'LAD':
      mean = MYECHO_NEW.LADmean;
      sd = MYECHO_NEW.LADsd;
      break;
    case 'LMCA':
      mean = MYECHO_NEW.LMCAmean;
      sd = MYECHO_NEW.LMCAsd;
      break;
  }
  const lower = (10 * (mean - 1.65 * sd)).toFixed(2);
  const upper = (10 * (mean + 1.65 * sd)).toFixed(2);
  return `${lower} - ${upper}`;
}

function getZScore_New(site, score) {
  const scoreNum = parseFloat(String(score).replace(',', '.'));
  if (isNaN(scoreNum) || scoreNum <= 0) return null;

  let mean = 0;
  let sd = 0;
  switch (site) {
    case 'RCA':
      mean = MYECHO_NEW.RCAmean;
      sd = MYECHO_NEW.RCAsd;
      break;
    case 'LAD':
      mean = MYECHO_NEW.LADmean;
      sd = MYECHO_NEW.LADsd;
      break;
    case 'LMCA':
      mean = MYECHO_NEW.LMCAmean;
      sd = MYECHO_NEW.LMCAsd;
      break;
  }

  if (sd === 0) return null;

  return parseFloat(((scoreNum / 10 - mean) / sd).toFixed(2));
}

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

// ============================================================================
// TEST UTILITIES
// ============================================================================

function areEqual(a, b, tolerance = 0.01) {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  return Math.abs(a - b) < tolerance;
}

function testCase(name, height, weight, lmca, lad, rca) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`TEST: ${name}`);
  console.log(`Input: Height=${height}, Weight=${weight}, LMCA=${lmca}, LAD=${lad}, RCA=${rca}`);
  console.log('-'.repeat(80));

  // Reset state
  MYECHO_ORIGINAL.bsa = 0;
  MYECHO_NEW.bsa = 0;

  // Calculate BSA
  const bsaOriginal = calcBSA_Original(height, weight);
  const bsaNew = calcBSA_New(height, weight);

  let passed = true;
  const errors = [];

  // Test BSA
  if (!areEqual(bsaOriginal, bsaNew)) {
    passed = false;
    errors.push(`BSA mismatch: Original=${bsaOriginal.toFixed(4)}, New=${bsaNew.toFixed(4)}`);
  }

  // Test Means
  if (!areEqual(MYECHO_ORIGINAL.RCAmean, MYECHO_NEW.RCAmean)) {
    passed = false;
    errors.push(
      `RCA mean mismatch: Original=${MYECHO_ORIGINAL.RCAmean.toFixed(6)}, New=${MYECHO_NEW.RCAmean.toFixed(6)}`
    );
  }
  if (!areEqual(MYECHO_ORIGINAL.LADmean, MYECHO_NEW.LADmean)) {
    passed = false;
    errors.push(
      `LAD mean mismatch: Original=${MYECHO_ORIGINAL.LADmean.toFixed(6)}, New=${MYECHO_NEW.LADmean.toFixed(6)}`
    );
  }
  if (!areEqual(MYECHO_ORIGINAL.LMCAmean, MYECHO_NEW.LMCAmean)) {
    passed = false;
    errors.push(
      `LMCA mean mismatch: Original=${MYECHO_ORIGINAL.LMCAmean.toFixed(6)}, New=${MYECHO_NEW.LMCAmean.toFixed(6)}`
    );
  }

  // Test SDs
  if (!areEqual(MYECHO_ORIGINAL.RCAsd, MYECHO_NEW.RCAsd)) {
    passed = false;
    errors.push(
      `RCA SD mismatch: Original=${MYECHO_ORIGINAL.RCAsd.toFixed(6)}, New=${MYECHO_NEW.RCAsd.toFixed(6)}`
    );
  }
  if (!areEqual(MYECHO_ORIGINAL.LADsd, MYECHO_NEW.LADsd)) {
    passed = false;
    errors.push(
      `LAD SD mismatch: Original=${MYECHO_ORIGINAL.LADsd.toFixed(6)}, New=${MYECHO_NEW.LADsd.toFixed(6)}`
    );
  }
  if (!areEqual(MYECHO_ORIGINAL.LMCAsd, MYECHO_NEW.LMCAsd)) {
    passed = false;
    errors.push(
      `LMCA SD mismatch: Original=${MYECHO_ORIGINAL.LMCAsd.toFixed(6)}, New=${MYECHO_NEW.LMCAsd.toFixed(6)}`
    );
  }

  // Test Ranges
  const rangeRCA_Original = getRange_Original('RCA');
  const rangeRCA_New = getRange_New('RCA');
  if (rangeRCA_Original !== rangeRCA_New) {
    passed = false;
    errors.push(`RCA Range mismatch: Original="${rangeRCA_Original}", New="${rangeRCA_New}"`);
  }

  const rangeLAD_Original = getRange_Original('LAD');
  const rangeLAD_New = getRange_New('LAD');
  if (rangeLAD_Original !== rangeLAD_New) {
    passed = false;
    errors.push(`LAD Range mismatch: Original="${rangeLAD_Original}", New="${rangeLAD_New}"`);
  }

  const rangeLMCA_Original = getRange_Original('LMCA');
  const rangeLMCA_New = getRange_New('LMCA');
  if (rangeLMCA_Original !== rangeLMCA_New) {
    passed = false;
    errors.push(`LMCA Range mismatch: Original="${rangeLMCA_Original}", New="${rangeLMCA_New}"`);
  }

  // Test Z-Scores
  if (lmca !== null && lmca !== '') {
    const zOriginal = getZScore_Original('LMCA', lmca);
    const zNew = getZScore_New('LMCA', lmca);
    if (!areEqual(zOriginal, zNew)) {
      passed = false;
      errors.push(`LMCA Z-Score mismatch: Original=${zOriginal}, New=${zNew}`);
    }
    const flagOriginal = ZscoreFlag_Original(zOriginal);
    const flagNew = getZScoreClass_New(zNew);
    if (flagOriginal !== flagNew) {
      passed = false;
      errors.push(`LMCA Flag mismatch: Original="${flagOriginal}", New="${flagNew}" (Z=${zOriginal})`);
    }
  }

  if (lad !== null && lad !== '') {
    const zOriginal = getZScore_Original('LAD', lad);
    const zNew = getZScore_New('LAD', lad);
    if (!areEqual(zOriginal, zNew)) {
      passed = false;
      errors.push(`LAD Z-Score mismatch: Original=${zOriginal}, New=${zNew}`);
    }
    const flagOriginal = ZscoreFlag_Original(zOriginal);
    const flagNew = getZScoreClass_New(zNew);
    if (flagOriginal !== flagNew) {
      passed = false;
      errors.push(`LAD Flag mismatch: Original="${flagOriginal}", New="${flagNew}" (Z=${zOriginal})`);
    }
  }

  if (rca !== null && rca !== '') {
    const zOriginal = getZScore_Original('RCA', rca);
    const zNew = getZScore_New('RCA', rca);
    if (!areEqual(zOriginal, zNew)) {
      passed = false;
      errors.push(`RCA Z-Score mismatch: Original=${zOriginal}, New=${zNew}`);
    }
    const flagOriginal = ZscoreFlag_Original(zOriginal);
    const flagNew = getZScoreClass_New(zNew);
    if (flagOriginal !== flagNew) {
      passed = false;
      errors.push(`RCA Flag mismatch: Original="${flagOriginal}", New="${flagNew}" (Z=${zOriginal})`);
    }
  }

  // Print results
  if (passed) {
    console.log('✅ PASSED');
    console.log(`BSA: ${bsaOriginal.toFixed(4)}`);
    console.log(`RCA Mean: ${(10 * MYECHO_ORIGINAL.RCAmean).toFixed(2)} mm, SD: ${MYECHO_ORIGINAL.RCAsd.toFixed(6)}`);
    console.log(`LAD Mean: ${(10 * MYECHO_ORIGINAL.LADmean).toFixed(2)} mm, SD: ${MYECHO_ORIGINAL.LADsd.toFixed(6)}`);
    console.log(`LMCA Mean: ${(10 * MYECHO_ORIGINAL.LMCAmean).toFixed(2)} mm, SD: ${MYECHO_ORIGINAL.LMCAsd.toFixed(6)}`);
  } else {
    console.log('❌ FAILED');
    errors.forEach((err) => console.log(`  ERROR: ${err}`));
  }

  return passed;
}

// ============================================================================
// RUN TESTS
// ============================================================================

console.log('Coronary Artery Z-Score Calculator - Test Suite');
console.log('Comparing Original (Coronaries01.js) vs New (Next.js) Implementation');
console.log('='.repeat(80));

let totalTests = 0;
let passedTests = 0;

// Test Case 1: Normal child (height + weight)
totalTests++;
if (testCase('Normal child with height and weight', 120, 25, 2.5, 2.0, 2.3)) passedTests++;

// Test Case 2: Weight only (no height)
totalTests++;
if (testCase('Weight only (no height)', null, 30, 3.0, 2.5, 2.8)) passedTests++;

// Test Case 3: Empty inputs
totalTests++;
if (testCase('Empty inputs', null, null, null, null, null)) passedTests++;

// Test Case 4: Small child
totalTests++;
if (testCase('Small child', 80, 12, 1.8, 1.5, 1.7)) passedTests++;

// Test Case 5: Large child
totalTests++;
if (testCase('Large child', 150, 45, 4.0, 3.5, 3.8)) passedTests++;

// Test Case 6: Borderline z-scores
totalTests++;
if (testCase('Borderline z-scores', 100, 20, 3.0, 2.5, 2.8)) passedTests++;

// Test Case 7: High z-scores (severe)
totalTests++;
if (testCase('High z-scores (severe)', 110, 22, 5.5, 4.8, 5.2)) passedTests++;

// Test Case 8: Negative z-scores
totalTests++;
if (testCase('Negative z-scores', 130, 30, 1.0, 0.8, 0.9)) passedTests++;

// Test Case 9: Decimal inputs with comma
totalTests++;
if (testCase('Decimal inputs with comma', '125,5', '28,3', '3,2', '2,7', '3,0')) passedTests++;

// Test Case 10: Edge case - very small BSA
totalTests++;
if (testCase('Very small BSA', 50, 3, 1.0, 0.8, 0.9)) passedTests++;

// Summary
console.log(`\n${'='.repeat(80)}`);
console.log('TEST SUMMARY');
console.log('='.repeat(80));
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${totalTests - passedTests}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (passedTests === totalTests) {
  console.log('\n✅ ALL TESTS PASSED - Implementation matches original logic!');
  process.exit(0);
} else {
  console.log('\n❌ SOME TESTS FAILED - Please review the errors above!');
  process.exit(1);
}

