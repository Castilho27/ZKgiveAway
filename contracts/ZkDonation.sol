// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ZkDonation is Ownable {
    mapping(address => uint256) public totalDonated;
    mapping(address => uint256) public proofsSubmitted;
    mapping(address => uint256) public lockedFunds;

    uint256 public baseFee = 500;        // 5%
    uint256 public minProofs = 3;
    uint256 public maxProofs = 10;
    uint256 public lockThreshold = 10 ether;

    event DonationMade(address indexed donor, uint256 amount, uint256 feeRate, bool locked);
    event ProofRegistered(address indexed donor, uint256 proofsCount);
    event FundsUnlocked(address indexed donor, uint256 amount);

    function donate() external payable {
        require(msg.value > 0, "Doacao zero");
        totalDonated[msg.sender] += msg.value;
        uint256 rate = getFeeRate(msg.sender);
        if (rate == 10000) {
            lockedFunds[msg.sender] += msg.value;
            emit DonationMade(msg.sender, msg.value, rate, true);
        } else {
            uint256 fee = msg.value * rate / 10000;
            payable(owner()).transfer(fee);
            emit DonationMade(msg.sender, msg.value, rate, false);
        }
    }

    function registerProof(address donor) external onlyOwner {
        proofsSubmitted[donor] += 1;
        emit ProofRegistered(donor, proofsSubmitted[donor]);
        if (lockedFunds[donor] > 0 && getFeeRate(donor) < 10000) {
            uint256 amt = lockedFunds[donor];
            lockedFunds[donor] = 0;
            payable(donor).transfer(amt);
            emit FundsUnlocked(donor, amt);
        }
    }

    function getFeeRate(address donor) public view returns (uint256) {
        uint256 proofs = proofsSubmitted[donor];
        uint256 donated = totalDonated[donor];
        if (donated >= lockThreshold && proofs < minProofs) {
            return 10000;
        }
        if (proofs >= maxProofs) {
            return 0;
        }
        return baseFee * (maxProofs - proofs) / maxProofs;
    }
}
