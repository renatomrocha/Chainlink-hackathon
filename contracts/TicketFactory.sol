pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract TicketFactory is ERC1155 {

    constructor() ERC1155("test_uri") {

    }

    function test() public view returns (string memory){
        return "Test";
    }
}