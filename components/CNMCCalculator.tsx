'use client';

import { useState, useEffect, useCallback } from 'react';

interface CNMCCoronaryArtery {
  beta1: number;
  beta2: number;
  mse: number;
  mean: number;
  zscore: number | null;
}

interface CNMCPatient {
  height: number;
  weight: number;
  bsa: number;
}

export default function CNMCCalculator() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [lmca, setLmca] = useState<string>('');
  const [lad, setLad] = useState<string>('');
  const [rca, setRca] = useState<string>('');

  // CNMC coefficients from publication
  const [lmcaData] = useState<CNMCCoronaryArtery>({
    beta1: -1.31625,
    beta2: 0.37442,
    mse: 0.028467,
    mean: 0,
    zscore: null,
  });

  const [ladData] = useState<CNMCCoronaryArtery>({
    beta1: -1.50927,
    beta2: 0.41164,
    mse: 0.033031,
    mean: 0,
    zscore: null,
  });

  const [rcaData] = useState<CNMCCoronaryArtery>({
    beta1: -1.46115,
    beta2: 0.37870,
    mse: 0.040172,
    mean: 0,
    zscore: null,
  });

  const [patient, setPatient] = useState<CNMCPatient>({
    height: 0,
    weight: 0,
    bsa: 0,
  });

  // Calculate BSA using DuBois formula (CNMC method)
  const calcCNMCBSA = useCallback(() => {
    const heightNum = parseFloat(height.replace(',', '.'));
    const weightNum = parseFloat(weight.replace(',', '.'));

    let bsa = 0;
    if (isNaN(heightNum) || heightNum === 0) {
      if (!isNaN(weightNum) && weightNum > 0) {
        bsa = 0.1 * Math.pow(weightNum, 2 / 3);
      }
    } else if (!isNaN(heightNum) && !isNaN(weightNum)) {
      // DuBois formula
      bsa = 0.007184 * Math.pow(heightNum, 0.725) * Math.pow(weightNum, 0.425);
    }

    return bsa;
  }, [height, weight]);

  // Calculate mean for a coronary artery
  const calcCAMean = useCallback(
    (coronary: CNMCCoronaryArtery, bsa: number): number => {
      return coronary.beta1 + coronary.beta2 * Math.log(bsa);
    },
    []
  );

  // Calculate range
  const calcCARange = useCallback(
    (coronary: CNMCCoronaryArtery, mean: number): string => {
      const lower = mean - 1.65 * Math.sqrt(coronary.mse);
      const upper = mean + 1.65 * Math.sqrt(coronary.mse);
      const lowerMm = Math.exp(lower) * 10;
      const upperMm = Math.exp(upper) * 10;
      return `${lowerMm.toFixed(2)} - ${upperMm.toFixed(2)}`;
    },
    []
  );

  // Calculate Z-score
  const calcCAZ = useCallback(
    (coronary: CNMCCoronaryArtery, score: number, mean: number): number => {
      const logScore = Math.log(score);
      const zscore = (logScore - mean) / Math.sqrt(coronary.mse);
      return zscore;
    },
    []
  );

  // Calculate percentile from z-score
  const calcPercentile = (z: number | null): string => {
    if (z === null || isNaN(z)) return '';
    if (z === 0) return '50.00';
    if (z > -6 && z < 6) {
      const qz = poz(z);
      return (qz * 100).toFixed(2);
    }
    return '*';
  };

  // Probability of normal z value (adapted from CNMC code)
  const poz = (z: number): number => {
    const Z_MAX = 6;
    let y = 0.5 * Math.abs(z);
    let x: number;

    if (z === 0.0) {
      x = 0.0;
    } else if (y > Z_MAX * 0.5) {
      x = 1.0;
    } else if (y < 1.0) {
      const w = y * y;
      x =
        ((((((((0.000124818987 * w - 0.001075204047) * w + 0.005198775019) * w -
          0.019198292004) *
          w +
          0.059054035642) *
          w -
          0.151968751364) *
          w +
          0.319152932694) *
          w -
          0.531923007300) *
          w +
        0.797884560593) *
        y *
        2.0;
    } else {
      y -= 2.0;
      x =
        (((((((((((((-0.000045255659 * y + 0.000152529290) * y -
          0.000019538132) *
          y -
          0.000676904986) *
          y +
          0.001390604284) *
          y -
          0.000794620820) *
          y -
          0.002034254874) *
          y +
          0.006549791214) *
          y -
          0.010557625006) *
          y +
          0.011630447319) *
          y -
          0.009279453341) *
          y +
          0.005353579108) *
          y -
          0.002141268741) *
          y +
        0.000535310849) *
        y +
        0.999936657524;
    }
    return z > 0.0 ? (x + 1.0) * 0.5 : (1.0 - x) * 0.5;
  };

  // Z-score flag classification (CNMC version - uses -1.65 instead of -1.67)
  const getZScoreClass = (zScore: number | null): string => {
    if (zScore === null || isNaN(zScore)) return '';
    if (
      (zScore >= 1.65 && zScore < 1.96) ||
      (zScore > -1.96 && zScore <= -1.65)
    ) {
      return 'borderline';
    } else if (
      (zScore >= 1.96 && zScore < 3) ||
      (zScore > -3 && zScore <= -1.96)
    ) {
      return 'mild';
    } else if (
      (zScore >= 3 && zScore < 4) ||
      (zScore > -4 && zScore <= -3)
    ) {
      return 'moderate';
    } else if (zScore >= 4 || zScore <= -4) {
      return 'severe';
    }
    return 'normal';
  };

  // Recalculate when height/weight changes
  useEffect(() => {
    const bsa = calcCNMCBSA();
    if (bsa > 0) {
      const lmcaMean = calcCAMean(lmcaData, bsa);
      const ladMean = calcCAMean(ladData, bsa);
      const rcaMean = calcCAMean(rcaData, bsa);

      setPatient({
        height: parseFloat(height.replace(',', '.')) || 0,
        weight: parseFloat(weight.replace(',', '.')) || 0,
        bsa,
      });

      // Update means
      lmcaData.mean = lmcaMean;
      ladData.mean = ladMean;
      rcaData.mean = rcaMean;
    } else {
      setPatient({ height: 0, weight: 0, bsa: 0 });
      lmcaData.mean = 0;
      ladData.mean = 0;
      rcaData.mean = 0;
    }
  }, [height, weight, calcCNMCBSA, calcCAMean, lmcaData, ladData, rcaData]);

  // Calculate z-scores when measurements change
  const lmcaNum = lmca ? parseFloat(lmca.replace(',', '.')) / 10 : NaN;
  const ladNum = lad ? parseFloat(lad.replace(',', '.')) / 10 : NaN;
  const rcaNum = rca ? parseFloat(rca.replace(',', '.')) / 10 : NaN;

  const lmcaZ =
    !isNaN(lmcaNum) && lmcaNum > 0 && patient.bsa > 0
      ? calcCAZ(lmcaData, lmcaNum, lmcaData.mean)
      : null;
  const ladZ =
    !isNaN(ladNum) && ladNum > 0 && patient.bsa > 0
      ? calcCAZ(ladData, ladNum, ladData.mean)
      : null;
  const rcaZ =
    !isNaN(rcaNum) && rcaNum > 0 && patient.bsa > 0
      ? calcCAZ(rcaData, rcaNum, rcaData.mean)
      : null;

  // Update zscores in data objects
  lmcaData.zscore = lmcaZ;
  ladData.zscore = ladZ;
  rcaData.zscore = rcaZ;

  return (
    <div className="calculator">
      <table id="ZScores" summary="CNMC coronary artery z-score calculator">
        <tbody>
          <tr>
            <td className="label">
              <label htmlFor="cnmc-txtHT">Height (cm):</label>
            </td>
            <td>
              <input
                id="cnmc-txtHT"
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="label">
              <label htmlFor="cnmc-txtWT">Weight (kg):</label>
            </td>
            <td>
              <input
                id="cnmc-txtWT"
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="label">BSA:</td>
            <td className="results">{patient.bsa.toFixed(2)}</td>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <th>Site</th>
            <th>Measurement</th>
            <th>Mean</th>
            <th>Range</th>
            <th>Z-Score</th>
            <th>Percentile</th>
          </tr>
          <tr>
            <td className="label">
              <label htmlFor="cnmc-txtLMCA">LMCA (mm):</label>
            </td>
            <td>
              <input
                id="cnmc-txtLMCA"
                type="text"
                value={lmca}
                onChange={(e) => setLmca(e.target.value)}
              />
            </td>
            <td className="results">
              {patient.bsa > 0
                ? (10 * Math.exp(lmcaData.mean)).toFixed(2)
                : ''}
            </td>
            <td className="results">
              {patient.bsa > 0 ? calcCARange(lmcaData, lmcaData.mean) : ''}
            </td>
            <td
              className={`results ${lmcaZ !== null ? getZScoreClass(lmcaZ) : ''}`}
            >
              {lmcaZ !== null ? lmcaZ.toFixed(2) : ''}
            </td>
            <td className="results">
              {lmcaZ !== null ? calcPercentile(lmcaZ) : ''}
            </td>
          </tr>
          <tr>
            <td className="label">
              <label htmlFor="cnmc-txtLAD">LAD (mm):</label>
            </td>
            <td>
              <input
                id="cnmc-txtLAD"
                type="text"
                value={lad}
                onChange={(e) => setLad(e.target.value)}
              />
            </td>
            <td className="results">
              {patient.bsa > 0
                ? (10 * Math.exp(ladData.mean)).toFixed(2)
                : ''}
            </td>
            <td className="results">
              {patient.bsa > 0 ? calcCARange(ladData, ladData.mean) : ''}
            </td>
            <td
              className={`results ${ladZ !== null ? getZScoreClass(ladZ) : ''}`}
            >
              {ladZ !== null ? ladZ.toFixed(2) : ''}
            </td>
            <td className="results">
              {ladZ !== null ? calcPercentile(ladZ) : ''}
            </td>
          </tr>
          <tr>
            <td className="label">
              <label htmlFor="cnmc-txtRCA">RCA (mm):</label>
            </td>
            <td>
              <input
                id="cnmc-txtRCA"
                type="text"
                value={rca}
                onChange={(e) => setRca(e.target.value)}
              />
            </td>
            <td className="results">
              {patient.bsa > 0
                ? (10 * Math.exp(rcaData.mean)).toFixed(2)
                : ''}
            </td>
            <td className="results">
              {patient.bsa > 0 ? calcCARange(rcaData, rcaData.mean) : ''}
            </td>
            <td
              className={`results ${rcaZ !== null ? getZScoreClass(rcaZ) : ''}`}
            >
              {rcaZ !== null ? rcaZ.toFixed(2) : ''}
            </td>
            <td className="results">
              {rcaZ !== null ? calcPercentile(rcaZ) : ''}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

