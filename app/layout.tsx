import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Parameter(z): Coronary Artery Z-Scores',
  description:
    'Primarily useful for patients with Kawasaki Disease, this calculator will return a z-score for the left main coronary artery (LMCA), left anterior descending (LAD), and right main coronary artery (RCA).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

