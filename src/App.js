import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import { ethers } from 'ethers'
import Lottery from './artifacts/contracts/Lottery.sol/Lottery.json'

export default function App() {
  const lotteryContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const provider = new ethers.providers.JsonRpcProvider();
  const contract = useRef();
  const [balance, setBalance] = useState();

  const getLotteryBalance = async () => {
    const balance = await contract.current.getBalance();
    setBalance(balance.toString());
  };

  useEffect(() => {
    const setup = async () => {
      const network = await provider.getNetwork();

      // instantiate contract instance and assign to component ref variable
      contract.current = new ethers.Contract(
        lotteryContract,
        Lottery.abi,
        provider.getSigner(),
      );

      getLotteryBalance();
    }
    setup();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Balance: {balance}</h1>
        </div>
        <br></br>
        <button onClick={getLotteryBalance}>Update balance</button>
      </header>
    </div>
  );


}