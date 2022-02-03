import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import screen_mask from './img/hSGyubQ.gif';
import twitter from './img/Twitter-logo.svg.png';
import abi from './utils/WavePortal.json';

export default function App() {

  const contractAddress = "0x6290C9b4aF058501Dd6f44d92Fe67667D1541599";
  const contractABI = abi.abi;
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
      } else {
        console.log("We have the ethereum object", ethereum)
      };

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }

    } catch (error) {
      console.log(error)
      }
  }

    /**
    * Implement your connectWallet method here
    */

    
    const connectWallet = async () => {
      try {
        const { ethereum } = window;

        if (!ethereum) {
          alert("Get Metamask!");
          return;
        }

        const accounts = await ethereum.request({ method: "eth_requestAccounts"});

        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);

      } catch (error) {
        console.log(error)
      }
    };


    const wave = async () => {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

          let count = await wavePortalContract.getTotalWaves();
          console.log("Retrieve total wave count...", count.toNumber());

          /*
        * Execute the actual wave from your smart contract
        */

        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined --", waveTxn.hash)

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        } else {
          console.log("Ethereum object doesn't exist!");
        }

      } catch (error) {
        console.log(error);
      };
    };


  useEffect(() => {
    checkIfWalletConnected();
  }, []);
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Wazaaap!
        <img src={screen_mask} alt="screen movie mask"/>
        </div>
        

        <div className="bio">
        I'm Victor (a.k.a <a href="https://twitter.com/vijoin" target="_blank">vijoin <img src={twitter}/></a>) and I play the harmonica 🎶. I live in a tiny beautiful country in South America called Uruguay 🇺🇾. Come and visit sometime! ✈️😉 ... Connect your Ethereum wallet on Rinkeby network and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

      </div>
    </div>
  );
}
