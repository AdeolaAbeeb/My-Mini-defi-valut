# Mini DeFi Vault

A full stack decentralized app where users deposit and withdraw Sepolia test ETH from a smart contract vault.

## Live links
- Live dApp: https://my-mini-defi-valut.vercel.app
- GitHub: https://github.com/AdeolaAbeeb/My-Mini-defi-valut
- Contract (Sepolia): 0xb76a1BAa5d9b7809444C1D621f235aF46088E7b2
- Etherscan: https://sepolia.etherscan.io/address/0xb76a1BAa5d9b7809444C1D621f235aF46088E7b2

## Features
- Connect a MetaMask wallet
- Deposit ETH into the vault
- Withdraw your own ETH from the vault
- See your balance and the total held in the vault

## Tech stack
- Solidity 0.8.24 (smart contract)
- Hardhat (compile, test, deploy)
- React + Vite (frontend)
- ethers.js (wallet and contract connection)
- Vercel (hosting)

## Project structure
- contracts/Vault.sol : the vault smart contract
- test/Vault.js : tests (deposit, withdraw, over-withdrawal)
- scripts/deploy.js : deploy script
- frontend/ : React app

## How to run
1. npm install
2. npx hardhat compile
3. npx hardhat test
4. Create a .env file with SEPOLIA_RPC_URL and PRIVATE_KEY (never commit it)
5. npx hardhat run scripts/deploy.js --network sepolia
6. cd frontend, npm install, npm run dev

## How to use the app
1. Open the live link inside the MetaMask app browser
2. Switch to the Sepolia network
3. Tap Connect Wallet
4. Enter an amount and tap Deposit or Withdraw
5. Confirm in MetaMask

## Author
Adeola Adekola