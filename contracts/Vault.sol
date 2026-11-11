// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Vault {
        mapping(address => uint256) public balances;
            uint256 public totalDeposits;

                event Deposited(address indexed user, uint256 amount);
                    event Withdrawn(address indexed user, uint256 amount);

                        function deposit() external payable {
                                    require(msg.value > 0, "Send some ETH");
                                            balances[msg.sender] += msg.value;
                                                    totalDeposits += msg.value;
                                                            emit Deposited(msg.sender, msg.value);
                        }

                            function withdraw(uint256 amount) external {
                                        require(amount > 0, "Amount must be > 0");
                                                require(balances[msg.sender] >= amount, "Insufficient balance");
                                                        balances[msg.sender] -= amount;
                                                                totalDeposits -= amount;
                                                                        (bool ok, ) = payable(msg.sender).call{value: amount}("");
                                                                                require(ok, "Transfer failed");
                                                                                        emit Withdrawn(msg.sender, amount);
                            }
}
