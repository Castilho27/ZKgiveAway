// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {DonationManager} from "../src/DonationManager.sol";

contract DonationManagerScript is Script {
    DonationManager public manager;

    function setUp() public pure {}

    function run() public {
        vm.startBroadcast();
        manager = new DonationManager();
        console.log("DonationManager deployed at:", address(manager));
        vm.stopBroadcast();
    }
}
