// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/DonationManager.sol";

contract DonationManagerTest is Test {
    DonationManager manager;
    address owner = address(0x1);
    address payable recipient = payable(address(0x2));
    address donor = address(0x3);

    function setUp() public {
        vm.prank(owner);
        manager = new DonationManager();
    }

    function testCreateDonation() public {
        vm.prank(owner);
        uint256 id = manager.createDonation(recipient, "Campanha A", "Ajude A", 1 ether);
        (address rec,, string memory desc, uint256 suggested,) = manager.getDonation(id);
        assertEq(rec, recipient);
        assertEq(suggested, 1 ether);
        assertEq(desc, "Ajude A");
    }

    function testEditDonation() public {
        vm.startPrank(owner);
        uint256 id = manager.createDonation(recipient, "Campanha A", "Ajude A", 1 ether);
        manager.editDonation(id, "Novo Titulo", "Nova Desc", 2 ether);
        (, string memory title, string memory desc, uint256 suggested,) = manager.getDonation(id);
        assertEq(title, "Novo Titulo");
        assertEq(desc, "Nova Desc");
        assertEq(suggested, 2 ether);
        vm.stopPrank();
    }

    function testDonate() public {
        vm.startPrank(owner);
        uint256 id = manager.createDonation(recipient, "Campanha A", "Ajude A", 1 ether);
        vm.stopPrank();
        vm.deal(donor, 5 ether);
        vm.prank(donor);
        manager.donate{value: 1 ether}(id);
        (, , , , uint256 totalReceived) = manager.getDonation(id);
        assertEq(totalReceived, 1 ether);
    }
}
