import CoronaryCalculator from '@/components/CoronaryCalculator';
import './globals.css';

export default function Home() {
  return (
    <div id="outer-wrapper">
      <div id="wrap2">
        <div id="header-wrapper">
          <div className="header section" id="header">
            <div id="header-inner">
              <div className="titlewrapper">
                <h1 className="title">
                  <a href="/">Parameter(z)</a>
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
                <h3 className="post-title entry-title">Coronary Artery Z-Scores</h3>
                <div className="post-body entry-content">
                  <p>
                    Primarily useful for patients with Kawasaki Disease, this calculator will
                    return a z-score for the left main coronary artery (LMCA), left anterior
                    descending (LAD), and right main coronary artery (RCA).
                  </p>
                  <CoronaryCalculator />
                  <h4>References:</h4>
                  <p>
                    <a
                      href="https://www.ncbi.nlm.nih.gov/pubmed/17576863"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Coronary artery involvement in children with Kawasaki disease: risk factors
                      from analysis of serial normalized measurements
                    </a>
                    . McCrindle BW, Li JS, Minich LL, Colan SD, Atz AM, Takahashi M, Vetter VL,
                    Gersony WM, Mitchell PD, Newburger JW; Pediatric Heart Network Investigators.
                    Circulation. 2007 Jul 10;116(2):174-9.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

