import Link from 'next/link';
import '../globals.css';

export default function ComparisonPage() {
  return (
    <div id="outer-wrapper">
      <div id="wrap2">
        <div id="header-wrapper">
          <div className="header section" id="header">
            <div id="header-inner">
              <div className="titlewrapper">
                <h1 className="title">
                  <Link href="/">Parameter(z)</Link>
                </h1>
              </div>
              <div className="descriptionwrapper">
                <p className="description">
                  <span>echo z-score calculators</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="content-wrapper">
          <div id="main-wrapper">
            <div className="main section" id="main">
              <div className="post hentry">
                <h3 className="post-title entry-title">
                  Comparison: Boston (Circ., 2007) vs Washington, D.C. (JASE, 2008)
                </h3>
                <div className="post-body entry-content">
                  <div
                    style={{
                      maxWidth: '100%',
                      overflowX: 'auto',
                      marginTop: '1em',
                      marginBottom: '2em',
                    }}
                  >
                    <h4>Overview</h4>
                    <p>
                      Two major studies have published z-score equations for coronary artery
                      dimensions in children. This document compares the methodologies and
                      differences between the Boston (McCrindle et al., 2007) and Washington, D.C.
                      (CNMC, 2008) approaches.
                    </p>

                    <h4>Key Differences</h4>

                    <table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        marginTop: '1em',
                        marginBottom: '1em',
                      }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                          <th
                            style={{
                              padding: '10px',
                              border: '1px solid #ccc',
                              textAlign: 'left',
                            }}
                          >
                            Aspect
                          </th>
                          <th
                            style={{
                              padding: '10px',
                              border: '1px solid #ccc',
                              textAlign: 'left',
                            }}
                          >
                            Boston (Circ., 2007)
                          </th>
                          <th
                            style={{
                              padding: '10px',
                              border: '1px solid #ccc',
                              textAlign: 'left',
                            }}
                          >
                            Washington, D.C. (JASE, 2008)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            <strong>BSA Formula</strong>
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            Haycock formula
                            <br />
                            <code>
                              0.024265 × H<sup>0.3964</sup> × W<sup>0.5378</sup>
                            </code>
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            DuBois formula
                            <br />
                            <code>
                              0.007184 × H<sup>0.725</sup> × W<sup>0.425</sup>
                            </code>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            <strong>Regression Model</strong>
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            Power regression
                            <br />
                            <code>Mean = a × BSA<sup>b</sup> + c</code>
                            <br />
                            <small>Linear SD: SD = d + e × BSA</small>
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            Log-linear regression
                            <br />
                            <code>log(Mean) = β₁ + β₂ × log(BSA)</code>
                            <br />
                            <small>Constant MSE (variance)</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            <strong>Mean Calculation</strong>
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            Direct calculation in mm
                            <br />
                            <code>Mean = (coefficient × BSA<sup>power</sup>) - offset</code>
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            Log-transformed, then exponentiated
                            <br />
                            <code>Mean = exp(β₁ + β₂ × log(BSA))</code>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            <strong>Standard Deviation</strong>
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            Variable (depends on BSA)
                            <br />
                            <code>SD = intercept + slope × BSA</code>
                            <br />
                            <small>Allows for heteroscedasticity</small>
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            Constant (MSE)
                            <br />
                            <code>SD = √MSE</code>
                            <br />
                            <small>Assumes homoscedasticity</small>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            <strong>Z-Score Calculation</strong>
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            Linear
                            <br />
                            <code>Z = (measurement/10 - mean) / SD</code>
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            Log-transformed
                            <br />
                            <code>Z = (log(measurement/10) - log(mean)) / √MSE</code>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            <strong>Additional Features</strong>
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            Z-score only
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            Z-score + Percentile
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            <strong>Z-Score Thresholds</strong>
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            Borderline: -1.96 &lt; z ≤ -1.67
                            <br />
                            (asymmetric for negative values)
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                            Borderline: -1.96 &lt; z ≤ -1.65
                            <br />
                            (symmetric for negative values)
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <h4>Mathematical Models</h4>

                    <h5>Boston (McCrindle et al., 2007)</h5>
                    <p>
                      Uses a power regression model with variable standard deviation to account for
                      heteroscedasticity (non-constant variance):
                    </p>
                    <ul>
                      <li>
                        <strong>Mean:</strong> Mean = a × BSA<sup>b</sup> - c (in cm, converted to
                        mm)
                      </li>
                      <li>
                        <strong>SD:</strong> SD = d + e × BSA (allows SD to vary with BSA)
                      </li>
                      <li>
                        <strong>Z-score:</strong> Z = (measurement/10 - mean) / SD
                      </li>
                    </ul>

                    <h5>Washington, D.C. (CNMC, 2008)</h5>
                    <p>
                      Uses a log-linear regression model with constant variance (homoscedasticity):
                    </p>
                    <ul>
                      <li>
                        <strong>Mean:</strong> log(Mean) = β₁ + β₂ × log(BSA), then Mean = exp(log(Mean))
                      </li>
                      <li>
                        <strong>SD:</strong> SD = √MSE (constant for all BSA values)
                      </li>
                      <li>
                        <strong>Z-score:</strong> Z = (log(measurement/10) - log(mean)) / √MSE
                      </li>
                    </ul>

                    <h4>Clinical Implications</h4>

                    <h5>When to Use Boston (2007)</h5>
                    <ul>
                      <li>
                        More recent methodology accounting for heteroscedasticity
                        <ul>
                          <li>
                            Recognizes that variability increases with body size (more realistic)
                          </li>
                        </ul>
                      </li>
                      <li>
                        Larger, multi-center study (Pediatric Heart Network)
                        <ul>
                          <li>More generalizable results</li>
                        </ul>
                      </li>
                      <li>
                        Published in high-impact journal (Circulation)
                        <ul>
                          <li>Widely accepted in the field</li>
                        </ul>
                      </li>
                    </ul>

                    <h5>When to Use Washington, D.C. (2008)</h5>
                    <ul>
                      <li>
                        Provides percentile information
                        <ul>
                          <li>May be more intuitive for some clinicians</li>
                        </ul>
                      </li>
                      <li>
                        Simpler model (constant variance)
                        <ul>
                          <li>Easier to implement and understand</li>
                        </ul>
                      </li>
                      <li>
                        Single-center study from Children's National Medical Center
                        <ul>
                          <li>May be useful for comparison with local data</li>
                        </ul>
                      </li>
                    </ul>

                    <h4>Practical Differences</h4>

                    <h5>BSA Calculation</h5>
                    <p>
                      The Haycock formula (Boston) and DuBois formula (Washington) will produce
                      slightly different BSA values for the same patient:
                    </p>
                    <ul>
                      <li>
                        <strong>Haycock:</strong> Generally produces slightly higher BSA values,
                        especially in smaller children
                      </li>
                      <li>
                        <strong>DuBois:</strong> Older formula, may underestimate BSA in very small
                        children
                      </li>
                    </ul>
                    <p>
                      <em>
                        Note: The difference is usually small (&lt;5%) but can be significant in
                        extreme cases.
                      </em>
                    </p>

                    <h5>Z-Score Values</h5>
                    <p>
                      Due to different regression models and variance assumptions, the same
                      measurement may yield different z-scores:
                    </p>
                    <ul>
                      <li>
                        <strong>Boston:</strong> Accounts for increasing variability with size
                        (heteroscedasticity)
                      </li>
                      <li>
                        <strong>Washington:</strong> Assumes constant variability (homoscedasticity)
                      </li>
                    </ul>
                    <p>
                      <em>
                        In practice, z-scores are usually within 0.2-0.5 of each other, but can
                        differ more in extreme cases.
                      </em>
                    </p>

                    <h4>Recommendations</h4>
                    <ol>
                      <li>
                        <strong>Primary use:</strong> Boston (2007) is generally preferred due to:
                        <ul>
                          <li>More sophisticated statistical modeling</li>
                          <li>Larger, multi-center study population</li>
                          <li>Wider acceptance in the field</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Comparison:</strong> Use Washington (2008) when:
                        <ul>
                          <li>Percentile information is desired</li>
                          <li>Comparing with local CNMC data</li>
                          <li>Need for simpler model interpretation</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Consistency:</strong> Always use the same method for serial
                        follow-up of the same patient
                      </li>
                    </ol>

                    <h4>References</h4>
                    <ol>
                      <li>
                        McCrindle BW, Li JS, Minich LL, Colan SD, Atz AM, Takahashi M, Vetter VL,
                        Gersony WM, Mitchell PD, Newburger JW; Pediatric Heart Network
                        Investigators.{' '}
                        <a
                          href="https://www.ncbi.nlm.nih.gov/pubmed/17576863"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Coronary artery involvement in children with Kawasaki disease: risk
                          factors from analysis of serial normalized measurements
                        </a>
                        . <em>Circulation</em>. 2007 Jul 10;116(2):174-9.
                      </li>
                      <li>
                        de Zorzi A, Colan SD, Gauvreau K, Baker AL, Sundel RP, Newburger JW.{' '}
                        <a
                          href="https://www.ncbi.nlm.nih.gov/pubmed/9709715"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Coronary artery dimensions may be misclassified as normal in Kawasaki
                          disease
                        </a>
                        . <em>J Pediatr</em>. 1998 Oct;133(4):254-8.
                      </li>
                      <li>
                        [CNMC 2008 reference - please add full citation when available]
                      </li>
                    </ol>

                    <div style={{ marginTop: '2em', padding: '1em', backgroundColor: '#f9f9f9' }}>
                      <p>
                        <strong>Note:</strong> This comparison is for educational purposes. Clinical
                        decisions should be made in consultation with experienced pediatric
                        cardiologists familiar with both methodologies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

