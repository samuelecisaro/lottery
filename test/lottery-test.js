const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", function () {
  it("Player can send ETH to the contract", async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    await lottery.deployed();

    const [owner, addr1] = await ethers.getSigners();

    const transactionHash = await addr1.sendTransaction({
      to: lottery.address,
      value: ethers.utils.parseEther("0.1"), // Sends exactly 0.1 ether
    });

    const balance = await lottery.getBalance();
    let formattedBalance = ethers.utils.formatEther(balance);


    expect(formattedBalance).to.equal('0.1');
  });

  it("Owner can't select the winner only if there are less than 3 players", async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    await lottery.deployed();

    const [owner, addr1, addr2] = await ethers.getSigners();

    const transactionHash1 = await addr1.sendTransaction({
      to: lottery.address,
      value: ethers.utils.parseEther("0.1"), // Sends exactly 0.1 ether
    });

    const transactionHash2 = await addr2.sendTransaction({
      to: lottery.address,
      value: ethers.utils.parseEther("0.1"), // Sends exactly 0.1 ether
    });

    await expect(lottery.connect(owner).selectWinner()).to.be.revertedWith("Not enough players");
  });

  it("Only owner can select the winner", async function () {
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    await lottery.deployed();

    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const transactionHash1 = await addr1.sendTransaction({
      to: lottery.address,
      value: ethers.utils.parseEther("0.1"), // Sends exactly 0.1 ether
    });

    const transactionHash2 = await addr2.sendTransaction({
      to: lottery.address,
      value: ethers.utils.parseEther("0.1"), // Sends exactly 0.1 ether
    });

    const transactionHash3 = await addr3.sendTransaction({
      to: lottery.address,
      value: ethers.utils.parseEther("0.1"), // Sends exactly 0.1 ether
    });

    await expect(lottery.connect(addr1).selectWinner()).to.be.revertedWith("Owner required");
  });
});
