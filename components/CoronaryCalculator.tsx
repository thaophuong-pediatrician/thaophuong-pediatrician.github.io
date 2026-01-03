'use client';

import { useState, useEffect, useCallback } from 'react';

interface EchoData {
  bsa: number;
  LMCAmean: number;
  LADmean: number;
  RCAmean: number;
  LMCAsd: number;
  LADsd: number;
  RCAsd: number;
}

export default function CoronaryCalculator() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [lmca, setLmca] = useState<string>('');
  const [lad, setLad] = useState<string>('');
  const [rca, setRca] = useState<string>('');

  const [echoData, setEchoData] = useState<EchoData>({
    bsa: 0,
    LMCAmean: 0,
    LADmean: 0,
    RCAmean: 0,
    LMCAsd: 0,
    LADsd: 0,
    RCAsd: 0,
  });

  // Calculate BSA and update means/SDs
  const calcBSA = useCallback(() => {
    const heightNum = parseFloat(height.replace(',', '.'));
    const weightNum = parseFloat(weight.replace(',', '.'));

    let bsa = 0;
    if (!isNaN(heightNum) && !isNaN(weightNum)) {
      bsa = 0.024265 * Math.pow(heightNum, 0.3964) * Math.pow(weightNum, 0.5378);
    } else if (isNaN(heightNum) && !isNaN(weightNum)) {
      bsa = 0.1 * Math.pow(weightNum, 0.6667);
    }

    const RCAmean = (0.26117 * Math.pow(bsa, 0.39992)) - 0.02756;
    const RCAsd = 0.02407 + (0.01597 * bsa);
    const LADmean = (0.26108 * Math.pow(bsa, 0.37893)) - 0.02852;
    const LADsd = 0.01465 + (0.01996 * bsa);
    const LMCAmean = (0.31747 * Math.pow(bsa, 0.36008)) - 0.02887;
    const LMCAsd = 0.03040 + (0.01514 * bsa);

    setEchoData({
      bsa,
      LMCAmean,
      LADmean,
      RCAmean,
      LMCAsd,
      LADsd,
      RCAsd,
    });
  }, [height, weight]);

  useEffect(() => {
    calcBSA();
  }, [calcBSA]);

  const getRange = (site: 'RCA' | 'LAD' | 'LMCA') => {
    let mean = 0;
    let sd = 0;
    switch (site) {
      case 'RCA':
        mean = echoData.RCAmean;
        sd = echoData.RCAsd;
        break;
      case 'LAD':
        mean = echoData.LADmean;
        sd = echoData.LADsd;
        break;
      case 'LMCA':
        mean = echoData.LMCAmean;
        sd = echoData.LMCAsd;
        break;
    }
    const lower = (10 * (mean - 1.65 * sd)).toFixed(2);
    const upper = (10 * (mean + 1.65 * sd)).toFixed(2);
    return `${lower} - ${upper}`;
  };

  const getZScore = (site: 'RCA' | 'LAD' | 'LMCA', score: number): number | null => {
    if (isNaN(score) || score <= 0) return null;
    
    let mean = 0;
    let sd = 0;
    switch (site) {
      case 'RCA':
        mean = echoData.RCAmean;
        sd = echoData.RCAsd;
        break;
      case 'LAD':
        mean = echoData.LADmean;
        sd = echoData.LADsd;
        break;
      case 'LMCA':
        mean = echoData.LMCAmean;
        sd = echoData.LMCAsd;
        break;
    }
    
    if (sd === 0) return null;
    
    return parseFloat(((score / 10 - mean) / sd).toFixed(2));
  };

  const getZScoreClass = (zScore: number | null): string => {
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
  };

  const lmcaNum = lmca ? parseFloat(lmca.replace(',', '.')) : NaN;
  const ladNum = lad ? parseFloat(lad.replace(',', '.')) : NaN;
  const rcaNum = rca ? parseFloat(rca.replace(',', '.')) : NaN;
  
  const lmcaZ = !isNaN(lmcaNum) ? getZScore('LMCA', lmcaNum) : null;
  const ladZ = !isNaN(ladNum) ? getZScore('LAD', ladNum) : null;
  const rcaZ = !isNaN(rcaNum) ? getZScore('RCA', rcaNum) : null;

  return (
    <div className="calculator">
      <table id="ZScores" summary="coronary artery z-score calculator">
        <tbody>
          <tr>
            <td className="label">
              <label htmlFor="txtHT">Height (cm):</label>
            </td>
            <td>
              <input
                id="txtHT"
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="label">
              <label htmlFor="txtWT">Weight (kg):</label>
            </td>
            <td>
              <input
                id="txtWT"
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="label">BSA:</td>
            <td id="BSA">{echoData.bsa.toFixed(2)}</td>
            <td colSpan={3}></td>
          </tr>
          <tr>
            <th>Site</th>
            <th>Measurement</th>
            <th>Mean</th>
            <th>Range</th>
            <th>Z-Score</th>
          </tr>
          <tr>
            <td className="label">
              <label htmlFor="txtLMCA">LMCA (mm):</label>
            </td>
            <td>
              <input
                id="txtLMCA"
                type="text"
                value={lmca}
                onChange={(e) => setLmca(e.target.value)}
              />
            </td>
            <td className="results">{(10 * echoData.LMCAmean).toFixed(2)}</td>
            <td className="results">{getRange('LMCA')}</td>
            <td
              id="LMCAZ"
              className={`results ${lmcaZ !== null ? getZScoreClass(lmcaZ) : ''}`}
            >
              {lmcaZ !== null ? lmcaZ.toFixed(2) : ''}
            </td>
          </tr>
          <tr>
            <td className="label">
              <label htmlFor="txtLAD">LAD (mm):</label>
            </td>
            <td>
              <input
                id="txtLAD"
                type="text"
                value={lad}
                onChange={(e) => setLad(e.target.value)}
              />
            </td>
            <td className="results">{(10 * echoData.LADmean).toFixed(2)}</td>
            <td className="results">{getRange('LAD')}</td>
            <td
              id="LADZ"
              className={`results ${ladZ !== null ? getZScoreClass(ladZ) : ''}`}
            >
              {ladZ !== null ? ladZ.toFixed(2) : ''}
            </td>
          </tr>
          <tr>
            <td className="label">
              <label htmlFor="txtRCA">RCA (mm):</label>
            </td>
            <td>
              <input
                id="txtRCA"
                type="text"
                value={rca}
                onChange={(e) => setRca(e.target.value)}
              />
            </td>
            <td className="results">{(10 * echoData.RCAmean).toFixed(2)}</td>
            <td className="results">{getRange('RCA')}</td>
            <td
              id="RCAZ"
              className={`results ${rcaZ !== null ? getZScoreClass(rcaZ) : ''}`}
            >
              {rcaZ !== null ? rcaZ.toFixed(2) : ''}
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input
                id="CalcCoronaries"
                type="button"
                value="Update"
                onClick={calcBSA}
              />
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

