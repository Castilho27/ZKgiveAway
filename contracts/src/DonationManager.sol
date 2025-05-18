// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DonationManager {
    address public owner;
    uint256 public donationCount;
    uint256 public totalFee; 
    struct Donation {
        address author;
        string title;
        string description;
        uint256 suggestedAmount;
        uint256 totalReceived;
        bool exists;
    }

    mapping(uint256 => Donation) public donations;

    event DonationCreated(uint256 indexed donationId, string title, uint256 suggestedAmount);
    event DonationEdited(uint256 indexed donationId, string newTitle, string newDescription, uint256 newSuggestedAmount);
    event DonationReceived(uint256 indexed donationId, address indexed donor, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier donationExists(uint256 donationId) {
        require(donations[donationId].exists, "Donation does not exist");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createDonation(string memory title, string memory description, uint256 suggestedAmount) external onlyOwner returns (uint256) {
        donationCount++;
        donations[donationCount] = Donation({
            author: msg.sender,
            title: title,
            description: description,
            suggestedAmount: suggestedAmount,
            totalReceived: 0,
            exists: true
        });
        emit DonationCreated(donationCount, title, suggestedAmount);
        return donationCount;
    }

    function editDonation(uint256 donationId, string memory newTitle, string memory newDescription, uint256 newSuggestedAmount) external onlyOwner donationExists(donationId) {
        Donation storage d = donations[donationId];
        d.title = newTitle;
        d.description = newDescription;
        d.suggestedAmount = newSuggestedAmount;
        emit DonationEdited(donationId, newTitle, newDescription, newSuggestedAmount);
    }

    function donate(uint256 donationId) external payable donationExists(donationId) {
        require(msg.value > 0, "No ETH sent");
        Donation storage d = donations[donationId];
        d.totalReceived += msg.value;
        emit DonationReceived(donationId, msg.sender, msg.value);
    }

    function withdraw(uint256 donationId) public donationExists(donationId) {
        Donation storage d = donations[donationId];
        require(d.totalReceived > 0, "No funds to withdraw");
        uint256 amount = d.totalReceived - ((d.totalReceived * 5) / 100);// 5% fee
        totalFee += (d.totalReceived * 5) / 100;
        d.totalReceived = 0;
        d.exists = false;
        payable(d.author).transfer(amount);
    }
}