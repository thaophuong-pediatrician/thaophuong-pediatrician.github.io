import CNMCCalculator from '@/components/CNMCCalculator';
import Link from 'next/link';
import '../globals.css';

export default function CNMCPage() {
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
                  Coronary Artery Z-Scores - Washington, D.C. (JASE, 2008)
                </h3>
                <div className="post-body entry-content">
                  <p>
                    This calculator uses the Children's National Medical Center (CNMC) equations
                    published in 2008. It provides z-scores and percentiles for the left main
                    coronary artery (LMCA), left anterior descending (LAD), and right main coronary
                    artery (RCA).
                  </p>
                  <p>
                    <strong>Note:</strong> This method uses a different statistical model than the
                    Boston (2007) calculator. See the{' '}
                    <Link href="/comparison">comparison page</Link> for details on the differences.
                  </p>
                  <CNMCCalculator />
                  <h4>References:</h4>
                  <p>
                    [CNMC 2008 reference - please add full citation when available]
                    <br />
                    <small>
                      This calculator is based on the CNMC Coronary Artery Z-Score methodology
                      published in the Journal of the American Society of Echocardiography (2008).
                    </small>
                  </p>
                  <div style={{ marginTop: '2em' }}>
                    <h4>Other Calculators:</h4>
                    <ul>
                      <li>
                        <Link href="/">Boston (Circ., 2007) Calculator</Link>
                      </li>
                      <li>
                        <Link href="/comparison">Comparison: Boston vs Washington, D.C.</Link>
                      </li>
                    </ul>
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

