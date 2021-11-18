// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "OpenZeppelin/openzeppelin-contracts@4.3.0/contracts/token/ERC1155/ERC1155.sol";

contract TicketFactory is ERC1155 {
    uint256 private _currentEventId = 0;


    mapping(address => uint256) private sales;
    mapping(uint256 => address) public owners;
    mapping(uint256 => uint256) public ownerTokenSalePrices;

    constructor() ERC1155("https://localhost/NFTickets/{id}.json") {}

    event TicketCreation(
        uint256 _tokenId,
        uint256 _unitPrice,
        string _eventDesc
    );

    function createEventTickets(
        uint256 _maxSupply,
        uint256 _unitPrice,
        string memory _eventDesc
    ) public {
        owners[_currentEventId] = msg.sender;
        ownerTokenSalePrices[_currentEventId] = _unitPrice;
        _mint(msg.sender, _currentEventId, _maxSupply, "");

        emit TicketCreation(_currentEventId, _unitPrice, _eventDesc);

        _currentEventId += 1;
    }

    function buyFromOwner(uint256 _tokenId, uint256 _numberOfTickets)
        public
        payable
    {
        address _owner = owners[_tokenId];
        uint256 _balanceOfOwner = balanceOf(_owner, _tokenId);
        require(
            _balanceOfOwner >= _numberOfTickets,
            "The owner does not have enough tickets to sell"
        );

        uint256 _unitPrice = ownerTokenSalePrices[_tokenId];
        uint256 _totalRequestedTicketValue = _unitPrice * _numberOfTickets;
        require(
            msg.value >= _totalRequestedTicketValue,
            "Not enough funds sent to buy the tickets"
        );

        sales[_owner] += msg.value;
        _safeTransferFrom(_owner, msg.sender, _tokenId, _numberOfTickets, "");
    }

    function numTicketsOwned(uint256 _tokenId) public view returns (uint256) {
        uint256 _num = balanceOf(msg.sender, _tokenId);

        return _num;
    }
}
