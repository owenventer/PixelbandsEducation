// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserNFTStore from '../../stores/useUserNFTStore';
import { Connection } from '@solana/web3.js';


export const HomeView: FC = ({ }) => {


  const wallet = useWallet();
  const solanaConnection = new Connection("https://rpc.helius.xyz/?api-key=848e6147-3aae-4b26-af06-b1d4174f3cf9");


  const NFTList = useUserNFTStore((s) => s.NFTList)
  const { getUserNFT } = useUserNFTStore()

  function getNFTs(){
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserNFT(wallet.publicKey, solanaConnection)
    }
  };

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <div className='m-6'>
        <div className='text-sm font-normal align-bottom text-right text-slate-600 mt-4'>beta</div>
        <h1 className="text-center text-5xl md:pl-12 font-bold  mb-4">
         PixelBands <span className="text-accent">Education</span>
        </h1>
        </div>
        <h4 className="md:w-full text-x1 md:text-4xl text-center my-10">
          <p>Sign in to access the learning material.</p>
          <p className=' text-xl leading-relaxed'>Only holders of PixelBands NFTs will be granted access</p>
        </h4>
        
        <div className="flex flex-col mt-2">
        <button
                            className="px-8 m-2 btn animate-pulse bg-gradient-to-br from-indigo-700 to-accent hover:from-indigo-500 hover:to-accent text-white"
                            onClick={getNFTs}
                            >
                                <span>Sign In</span>
                
                        </button>
          <h4 className="md:w-full text-2xl text-slate-300 my-2">
          {wallet &&
          <div className="flex flex-row justify-center">
            <div>
              {(NFTList || "NFTs")}
              </div>
              
          </div>
          }
          </h4>
        </div>
      </div>
    </div>
  );
};
