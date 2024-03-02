import {ethers} from "ethers";
import Web3Modal from 'web3modal';
import chatAppJson from "../ChatApp.sol/ChatApp.json";
const chatAppABI=chatAppJson.abi;
import Web3 from 'web3';



const chatAppAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask");
    const account = await window.ethereum.request({
      method: "eth_accounts",
    });
    const firstAccount = account[0];
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

const fetchContract = (signerOrProvider) =>
  new ethers.Contract( chatAppAddress,chatAppABI, signerOrProvider);



export const connectingWithContract = async () => {
 
  try {

    // const web3modal = new Web3Modal();
    const web3 = new Web3("ws://localhost:8545")
    // const connection = await web3modal.connect();

 
    // const provider = new ethers.BrowserProvider(connection);
    // const signer =await provider.getSigner();
    // const contract =  fetchContract(signer);
    const contract = new web3.eth.Contract(chatAppABI, chatAppAddress);
  

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
