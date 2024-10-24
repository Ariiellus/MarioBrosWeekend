// layout.tsx
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';

import './global.css';
import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import OnchainProvidersWrapper from '../components/OnchainProvidersWrapper';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'Super Mario Web3',
  description: 'A Web3 Mario Game',
  openGraph: {
    title: 'Super Mario Web3',
    description: 'A Web3 Mario Game',
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center">
        <OnchainProvidersWrapper>{children}</OnchainProvidersWrapper>
      </body>
    </html>
  );
}
