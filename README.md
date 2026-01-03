# Coronary Artery Z-Scores Calculator

A Next.js implementation of the Coronary Artery Z-Scores calculator, originally from [parameterz.blogspot.com](https://parameterz.blogspot.com/2008/09/coronary-artery-z-scores.html).

This calculator is primarily useful for patients with Kawasaki Disease and returns z-scores for:
- Left Main Coronary Artery (LMCA)
- Left Anterior Descending (LAD)
- Right Main Coronary Artery (RCA)

## Features

- Calculate BSA (Body Surface Area) from height and weight
- Calculate z-scores for coronary artery measurements
- Color-coded z-score indicators (normal, borderline, mild, moderate, severe)
- Uses the McCrindle et al. (2007) regression equations from Circulation

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates a static export in the `out` directory, ready for GitHub Pages deployment.

### Deploying to GitHub Pages

The repository is configured for automatic deployment via GitHub Actions. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick setup:**
1. Enable GitHub Pages in repository Settings → Pages
2. Select "GitHub Actions" as the source
3. Push to `main` branch - deployment happens automatically!

Your site will be available at: `https://thaophuong-pediatrician.github.io/`

## Reference

Coronary artery involvement in children with Kawasaki disease: risk factors from analysis of serial normalized measurements. McCrindle BW, Li JS, Minich LL, Colan SD, Atz AM, Takahashi M, Vetter VL, Gersony WM, Mitchell PD, Newburger JW; Pediatric Heart Network Investigators. Circulation. 2007 Jul 10;116(2):174-9.

## License

The original JavaScript code (Coronaries01.js) is copyright (c) 2008: Dan Dyar and is provided under a permissive license (see the original file for details).

