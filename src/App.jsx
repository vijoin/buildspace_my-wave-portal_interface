import React from "react";
import { ethers } from "ethers";
import './App.css';
import screen_mask from './img/hSGyubQ.gif';
import twitter from './img/Twitter-logo.svg.png';

export default function App() {

  const wave = () => {
    
  }
  
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
      </div>
    </div>
  );
}
