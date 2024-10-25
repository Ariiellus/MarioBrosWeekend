'use client';
import dynamic from 'next/dynamic';
import { useAccount } from 'wagmi';
import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';
import { useEffect } from 'react';
import { initializePhaserGame } from '../../game.js';

const TransactionWrapper = dynamic(() => import('src/components/TransactionWrapper'), { ssr: false });
const WalletWrapper = dynamic(() => import('src/components/WalletWrapper'), { ssr: false });
const Footer = dynamic(() => import('src/components/Footer'), { ssr: false });

const PageComponent = () => {
  const { address } = useAccount();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(navigator.userAgent); 
      initializePhaserGame();
    }
  }, []);

  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 md:w-[1008px]">
      <section className="mt-6 mb-6 flex w-full flex-col md:flex-row">
        <div className="flex w-full flex-row items-center justify-between gap-2 md:gap-0">
          <a title="SuperMarioWeb3" target="_blank" rel="noreferrer">
            {/* SVG Component */}
          </a>
          <div className="flex items-center gap-3">
            <SignupButton />
            {!address && <LoginButton />}
          </div>
        </div>
      </section>
      <section className="templateSection flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-100 px-2 py-4 md:grow">
        <div className="flex h-[450px] w-[450px] max-w-full items-center justify-center rounded-xl bg-[#030712]">
          <div id="game"></div>
        </div>
        {address ? (
          <TransactionWrapper address={address} />
        ) : (
          <WalletWrapper className="w-[450px] max-w-full" text="Sign in to transact" />
        )}
      </section>
      <Footer />
    </div>
  );
};

// Disable SSR for this page
const Page = dynamic(() => Promise.resolve(PageComponent), { ssr: false });

export default Page;
