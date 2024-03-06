import {ethers} from "ethers";
import Web3Modal from 'web3modal';
import chatAppJson from "../ChatApp.sol/ChatApp.json";
const chatAppABI=chatAppJson.abi;
import Web3 from 'web3';
// const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/xPbcdHmp0VScR3UZ--hxX3-s9RqQ1i6q";
// import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// const web3 = createAlchemyWeb3(alchemyKey);



// const chatAppAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";
const chatAppAddress="0x5A4C7810ea5AfCB52a004E5CcE6A80acE883cBe4";

export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask");
    const account = await window.ethereum.request({
      method: "eth_accounts",
    });
    const firstAccount = account[0];
    console.log('firs',firstAccount)
    return firstAccount;
  } catch (error) {}
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask");
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = account[0];
    return firstAccount;
  } catch (error) {}
};



export const connectingWithContract = async () => {
  connectWallet();
  try {

    // const web3modal = new Web3Modal();
    // const web3 = new Web3("ws://localhost:8545")
    // const web3=new Web3("https://polygon-mumbai.g.alchemy.com/v2/xPbcdHmp0VScR3UZ--hxX3-s9RqQ1i6q");
    // const provider = new ethers.providers.Web3Provider(ethereum);
    // console.log(provider);

    // const signer = provider.getSigner();
    // console.log(signer)
    // const contract = new ethers.Contract(
    //   chatAppAddress,
    //   chatAppABI,
    //   signer
    // );
    // const address = await signer.getAddress();   

      // Request user permission to connect MetaMask
      // await window.ethereum.request({ method: 'eth_requestAccounts' });

       // const web3 = new Web3("ws://localhost:8545")
      //  const web3=new Web3("https://polygon-mumbai.g.alchemy.com/v2/xPbcdHmp0VScR3UZ--hxX3-s9RqQ1i6q");
       // const provider = new ethers.providers.Web3Provider(ethereum);
      const  provider = new ethers.providers.Web3Provider( window.ethereum );
     const  signer = provider.getSigner();
      const contract = new ethers.Contract( chatAppAddress, chatAppABI, signer );


       // const contract = new web3.eth.Contract(chatAppABI, chatAppAddress);
       try {
        const msg = await contract.working();
        console.log(msg);
    } catch (error) {
        console.error("Error:", error);
    }
    
       
     
    
  
    // { jsonrpc : 2.0 , id : 4d540797-58c1-431d-811e-19d010b1b3d6 , error :{ code :-32600, message : Unsupported method: eth_sendTransaction. See available methods at https://docs.alchemy.com/alchemy/documentation/apis }}
    return contract;
  } catch (error) {
    console.log('error',error)
  }
};

export const convertTime = (time) => {
  const newTime = new Date(time.toNumber());
  const realTime =
    newTime.getHours() +
    "/" +
    newTime.getMinutes() +
    "/" +
    newTime.getSeconds() +
    " Date:" +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();
  return realTime;
};
