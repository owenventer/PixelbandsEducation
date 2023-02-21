import { FC } from 'react';
import Link from "next/link";
import dynamic from 'next/dynamic';
import React, { useState } from "react";
import { useAutoConnect } from '../contexts/AutoConnectProvider';
import NetworkSwitcher from './NetworkSwitcher';
import NavElement from './nav-element';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export const AppBar: React.FC = () => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div>
      {/* NavBar / Header */}
      <div className="navbar flex h-20 flex-row md:mb-2 shadow-lg bg-[#221d51] text-neutral-content border-b border-[#c2226d7d] bg-opacity-66">
        <div className="navbar-start align-items-center">
          <div className="hidden sm:inline w-22 h-22 md:p-2 ml-10">
            <Link href="./"  rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
              {/* <p className="md:w-full text-lg md:text-3xl text-center font-bold my-2">Pixelbands</p> */}
              <svg width="32" height="32" viewBox="0 0 216 229" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer z-10"><g id="speaker">
              <path id="outline" d="M51.3125 15.3197C53.4755 6.33352 61.5144 0 70.7572 0H145.243C154.486 0 162.524 6.33351 164.687 15.3197L210.059 203.82C213.087 216.399 203.554 228.5 190.615 228.5H25.3852C12.4461 228.5 2.91259 216.399 5.94056 203.82L51.3125 15.3197Z" fill="white"></path><circle id="large_p" cx="108.4" cy="154.9" r="54.4" fill="#221D51"></circle>
              <circle id="small_p" cx="107.5" cy="54.5" r="26.5" fill="#221D51"></circle>
              <circle id="large_w" cx="108" cy="154.5" r="17" fill="white"></circle>
              <circle id="small_w" cx="108" cy="54.5" r="8" fill="white"></circle></g>
              </svg>
            </Link>
          </div>
          <WalletMultiButtonDynamic className="btn-ghost btn-sm relative flex md:hidden text-lg " />
        </div>

        {/* Nav Links */}
        {/* Wallet & Settings */}
        <div className="navbar-end">
          <div className="hidden md:inline-flex align-items-center justify-items gap-6">
          
          <WalletMultiButtonDynamic className="btn-ghost btn-sm rounded-btn text-lg mr-6 " />
        </div>
          <label
              htmlFor="my-drawer"
              className="btn-gh items-center justify-between md:hidden mr-5"
              onClick={() => setIsNavOpen(!isNavOpen)}>
              <div className="HAMBURGER-ICON space-y-2.5 ml-5">
              <div className={`h-0.5 w-8 bg-purple-600 ${isNavOpen ? 'hidden' : ''}`} />
              <div className={`h-0.5 w-8 bg-purple-600 ${isNavOpen ? 'hidden' : ''}`} />
              <div className={`h-0.5 w-8 bg-purple-600 ${isNavOpen ? 'hidden' : ''}`} />
            </div>
            <div className={`absolute block h-0.5 w-8 animate-pulse bg-purple-600 ${isNavOpen ? "" : "hidden"}`}
              style={{ transform: "rotate(45deg)" }}>
            </div>
            <div className={`absolute block h-0.5 w-8 animate-pulse bg-purple-600 ${isNavOpen ? "" : "hidden"}`}
              style={{ transform: "rotate(135deg)" }}>
            </div>
        </label>
      <div>
        
      </div>
        
        </div>
      </div>
    </div>
  );
};
