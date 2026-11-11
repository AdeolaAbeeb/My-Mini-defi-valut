const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault", function () {
  let vault, user;

  beforeEach(async () => {
    [, user] = await ethers.getSigners();
    const Vault = await ethers.getContractFactory("Vault");
    vault = await Vault.deploy();
  });

  it("deposits ETH", async () => {
    await vault.connect(user).deposit({ value: ethers.parseEther("1") });
    expect(await vault.balances(user.address)).to.equal(ethers.parseEther("1"));
  });

  it("withdraws ETH", async () => {
    await vault.connect(user).deposit({ value: ethers.parseEther("1") });
    await vault.connect(user).withdraw(ethers.parseEther("0.4"));
    expect(await vault.balances(user.address)).to.equal(ethers.parseEther("0.6"));
  });

  it("blocks over-withdrawal", async () => {
    await expect(vault.connect(user).withdraw(1)).to.be.revertedWith("Insufficient balance");
  });
});
