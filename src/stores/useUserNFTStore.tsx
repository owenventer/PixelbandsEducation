import { Connection, GetProgramAccountsFilter,PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import create, { State } from "zustand";


interface UserNFTStore extends State {
  NFTList: string;
  getUserNFT: (publicKey: PublicKey, connection: Connection) => void
}

const useUserNFTStore = create<UserNFTStore>((set, _get) => ({
  NFTList: "",
  getUserNFT: async (publicKey, connection) => {
    let NFTList = "";
    try {
        const filters:GetProgramAccountsFilter[] = [
          {
            dataSize: 165,    //size of account (bytes)
          },
          {
            memcmp: {
              offset: 32,     //location of our query in the account (bytes)
              bytes: ""+publicKey.toBase58,  //our search criteria, a base58 encoded string
            }            
          }
       ];
       const accounts = await connection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID,   //SPL Token Program, new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
        {filters: filters}
      );
      console.log(`Found ${accounts.length} token account(s) for wallet ${publicKey}.`);
      //forLoop to go through all accounts 
      accounts.forEach((account, i) => {
        //Parse the account data
        const parsedAccountInfo:any = account.account.data;
        const mintAddress:string = parsedAccountInfo["parsed"]["info"]["mint"];
        //const tokenBalance: number = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
        //Log results
        //console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
        console.log(`--Token Mint: ${mintAddress}`);
        //console.log(`--Token Balance: ${tokenBalance}`);
        
        NFTList=NFTList+"Number:"+(i + 1)+" , "+mintAddress+"\n";
    });

    } catch (e) {
      console.log(`error getting NFTList: `, e);
    }
    set((s) => {
      s.NFTList = NFTList;
      console.log(`NFTList updated, `, NFTList);
    })
  },
}));

export default useUserNFTStore;















// const solanaConnection = new Connection(
//     //get mainnet RPC
//     process.env.NEXT_PUBLIC_RPC,
//     'confirmed',
//   );

//   const walletToQuery = PublicKey;

// //function to get token accounts 
// async function getTokenAccounts(wallet: PublicKey, solanaConnection: Connection) {
//   const filters:GetProgramAccountsFilter[] = [
//     {
//       dataSize: 165,    //size of account (bytes)
//     },
//     {
//       memcmp: {
//         offset: 32,     //location of our query in the account (bytes)
//         bytes: ""+wallet.toBase58,  //our search criteria, a base58 encoded string
//       }            
//     }
//  ];
//  const accounts = await solanaConnection.getParsedProgramAccounts(
//   TOKEN_PROGRAM_ID,   //SPL Token Program, new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
//   {filters: filters}
// );
// console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`);

// //loop through all tokens found 
// console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`);
// }

// getTokenAccounts(walletToQuery,solanaConnection);