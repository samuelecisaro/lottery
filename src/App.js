import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import { ethers } from 'ethers'
import Lottery from './artifacts/contracts/Lottery.sol/Lottery.json'

export default function App() {
  const lotteryContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contract = useRef();
  const [balance, setBalance] = useState(0);

  const getLotteryBalance = async () => {
    const balance = await contract.current.getBalance();
    setBalance(balance.toString());
  };

  const sendToken =  async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    await signer.sendTransaction({
      to: lotteryContract,
      value: ethers.utils.parseEther("0.1")
    });
  };

  const selectWinner = async () => {
    await contract.current.selectWinner();
  };

  useEffect(() => {
    const setup = async () => {
      const provider = new ethers.providers.JsonRpcProvider();
      const network = await provider.getNetwork();
      
      contract.current = new ethers.Contract(
        lotteryContract,
        Lottery.abi,
        provider.getSigner(),
      );

      getLotteryBalance();
    }
    setup();
  }, [balance]);

  return (
    <div>
        <div>
          <p>Lottery contract: {lotteryContract}</p>
          <p>Balance: {balance}</p>
        </div>
        <br></br>
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4">
            <button className="btn btn-primary btn-purple" onClick={sendToken}>Send Tokens</button>
          </div>
          <div className="col-12 col-md-4 col-lg-4">
            <button className="btn btn-primary btn-purple" onClick={getLotteryBalance}>Update balance</button>
          </div>
          <div className="col-12 col-md-4 col-lg-4">
            <button className="btn btn-primary btn-purple" onClick={selectWinner}>Select winner</button>
          </div>
        </div>
    </div>
  );


}