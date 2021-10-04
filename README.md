# Lottery with Hardhat and React

This project used React with Hardhat to build a lottery Dapp.

Rules:
- Every player must send 0.1 ether to the contract
- Winner is selected when there are at least 3 players
- Winner cannot play
- Winner get 10% fee when winner is selected

Clone the repo or download it, then:

```bash
  npm install
```
To test contracts with Hardhat:

```bash
  npx hardhat test
```
To deploy contracts:

```bash
  npx hardhat run --network localhost scripts/deploy.js
```

To run local environment with Hardhat:

```bash
  npx hardhat node
```

To run app in local:

```bash
  npm start
```

