"use client";

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Dinámicamente importamos OnchainProviders sin SSR
const OnchainProviders = dynamic(() => import('./OnchainProviders'), { ssr: false });

export default function OnchainProvidersWrapper({ children }: { children: ReactNode }) {
  return <OnchainProviders>{children}</OnchainProviders>;
}