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
import { Connection,GetProgramAccountsFilter } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import create, { State } from "zustand";


export const HomeView: FC = ({ }) => {
  const wallet = useWallet();

  const rpcEndpoint = 'https://rpc.helius.xyz/?api-key=848e6147-3aae-4b26-af06-b1d4174f3cf9';
  const solanaConnection = new Connection(rpcEndpoint);
  
  const walletToQuery = ""+wallet.publicKey; //example: vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg
  
  async function getTokenAccounts(wallet: string, solanaConnection: Connection) {
      const filters:GetProgramAccountsFilter[] = [
          {
            dataSize: 165,    //size of account (bytes)
          },
          {
            memcmp: {
              offset: 32,     //location of our query in the account (bytes)
              bytes: wallet,  //our search criteria, a base58 encoded string
            },            
          }];
      const accounts = await solanaConnection.getParsedProgramAccounts(
          TOKEN_PROGRAM_ID, //new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
          {filters: filters}
      );
      console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`);
      accounts.forEach((account, i) => {
          //Parse the account data
          const parsedAccountInfo:any = account.account.data;
          const mintAddress:string = parsedAccountInfo["parsed"]["info"]["mint"];
          const tokenBalance: number = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
          //Log results
          console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
          console.log(`--Token Mint: ${mintAddress}`);
          console.log(`--Token Balance: ${tokenBalance}`);
      });
  }
  if(wallet){
    getTokenAccounts(walletToQuery,solanaConnection);
  }
  




  

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <div className='mt-6'>
        <div className='text-sm font-normal align-bottom text-right text-slate-600 mt-4'>v{pkg.version}</div>
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
          Solana Next
        </h1>
        </div>
        <h4 className="md:w-full text-2x1 md:text-4xl text-center text-slate-300 my-2">
          <p>Unleash the full power of blockchain with Solana and Next.js 13.</p>
          <p className='text-slate-500 text-2x1 leading-relaxed'>Full-stack Solana applications made easy.</p>
        </h4>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-indigo-500 rounded-lg blur opacity-40 animate-tilt"></div>
          <div className="max-w-md mx-auto mockup-code bg-primary border-2 border-[#5252529f] p-6 px-10 my-2">
            <pre data-prefix=">">
              <code className="truncate">{`npx create-solana-dapp <dapp-name>`} </code>
            </pre>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <RequestAirdrop />
          <h4 className="md:w-full text-2xl text-slate-300 my-2">
          {wallet &&
          <div className="flex flex-row justify-center">
            <div>
              {("test" || "noti")}
              </div>
              <div className='text-slate-600 ml-2'>
                SOL
              </div>
          </div>
          }
          </h4>
        </div>
      </div>
    </div>
  );
};
