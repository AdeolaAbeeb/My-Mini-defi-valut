import { useState } from "react";
import { BrowserProvider, Contract, formatEther, parseEther } from "ethers";
import "./App.css";

const VAULT_ADDRESS = "0xb76a1BAa5d9b7809444C1D621f235aF46088E7b2";
const ABI = [
  "function deposit() payable",
  "function withdraw(uint256 amount)",
  "function balances(address) view returns (uint256)",
  "function totalDeposits() view returns (uint256)",
];

export default function App() {
  const [account, setAccount] = useState("");
  const [myBalance, setMyBalance] = useState("0");
  const [total, setTotal] = useState("0");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  async function getContract(withSigner) {
    const provider = new BrowserProvider(window.ethereum);
    const runner = withSigner ? await provider.getSigner() : provider;
    return new Contract(VAULT_ADDRESS, ABI, runner);
  }

  async function refresh(addr = account) {
    const c = await getContract(false);
    setMyBalance(formatEther(await c.balances(addr)));
    setTotal(formatEther(await c.totalDeposits()));
  }

  async function connect() {
    try {
      if (!window.ethereum) {
        setStatus("Open this page inside the MetaMask app browser.");
        return;
      }
      await window.ethereum.request({ method: "eth_requestAccounts" });
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);
      setStatus("Connected ✅");
      await refresh(addr);
    } catch (e) {
      setStatus(e.shortMessage || e.message);
    }
  }

  async function deposit() {
    try {
      setStatus("Confirm in MetaMask...");
      const c = await getContract(true);
      const tx = await c.deposit({ value: parseEther(amount) });
      setStatus("Waiting for confirmation...");
      await tx.wait();
      setStatus("Deposit successful ✅");
      setAmount("");
      refresh();
    } catch (e) {
      setStatus(e.shortMessage || e.message);
    }
  }

  async function withdraw() {
    try {
      setStatus("Confirm in MetaMask...");
      const c = await getContract(true);
      const tx = await c.withdraw(parseEther(amount));
      setStatus("Waiting for confirmation...");
      await tx.wait();
      setStatus("Withdrawal successful ✅");
      setAmount("");
      refresh();
    } catch (e) {
      setStatus(e.shortMessage || e.message);
    }
  }

  return (
    <div className="card">
      <h1>🏦 Mini DeFi Vault</h1>
      <p className="sub">Deposit and withdraw Sepolia ETH</p>

      {!account ? (
        <button onClick={connect}>Connect Wallet</button>
      ) : (
        <>
          <p className="addr">
            {account.slice(0, 6)}...{account.slice(-4)}
          </p>
          <div className="stats">
            <div>
              <span>Your balance</span>
              <b>{Number(myBalance).toFixed(4)} ETH</b>
            </div>
            <div>
              <span>Total in vault</span>
              <b>{Number(total).toFixed(4)} ETH</b>
            </div>
          </div>
          <input
            type="number"
            placeholder="Amount in ETH"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="row">
            <button onClick={deposit}>Deposit</button>
            <button className="alt" onClick={withdraw}>Withdraw</button>
          </div>
        </>
      )}
      <p className="status">{status}</p>
    </div>
  );
}
