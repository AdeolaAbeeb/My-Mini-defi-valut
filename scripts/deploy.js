const hre = require("hardhat");

async function main() {
  const vault = await hre.ethers.deployContract("Vault");
  await vault.waitForDeployment();
  console.log("Vault deployed to:", await vault.getAddress());
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
