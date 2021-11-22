pragma solidity ^0.8.0;

import "OpenZeppelin/openzeppelin-contracts@4.3.0/contracts/token/ERC1155/ERC1155.sol";
import "smartcontractkit/chainlink-brownie-contracts@0.2.2/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";


contract NFTickets is ERC1155, KeeperCompatibleInterface {

    uint256 private _currentEventId = 0;
    // Keeper variables
    uint public immutable interval;
    uint public lastTimeStamp;





    struct CustomTicket {
        address owner;
        uint256 tokenSalePrice;
        uint256 revenue;
        CustomTicketMetadata metadata;
    }

    struct CustomTicketInputStruct {
        uint256 unitPrice;
        uint256 maxSupply;
        string eventDesc;
        CustomTicketMetadata metadata;
    }

     struct CustomTicketMetadata {
        uint eventDate; // Needs conversion from input date to UNIX timestamp
        string ticketType;
        string imageUrl;
        CustomTicketState state;
        // Add metadata...
    }

    struct CustomTicketState {
        bool expired;
    }


    mapping(uint256=>CustomTicket) public nfTickets;

    // Figure out how to work with custom URI and if possible IPFS
    constructor(uint updateInterval) ERC1155("https://localhost/NFTickets/{id}.json") {
        interval = updateInterval;
        lastTimeStamp = block.timestamp;
    }

    event TicketCreation(
        uint256 _tokenId,
        uint256 _unitPrice,
        string _eventDesc
    );

    // Event for tickets updated
    event TicketsUpdated(
        uint256[] _tokenIds
    );

    function batchCreateEventTickets(
        CustomTicketInputStruct[] memory customTicketsInput
    ) public {
        for (uint i; i<customTicketsInput.length;i++){
            createEventTickets(customTicketsInput[i]);
        }
    }

    function createEventTickets(
        CustomTicketInputStruct memory customTicketInput
    ) public {
        CustomTicketMetadata memory _metadata = CustomTicketMetadata(customTicketInput.metadata.eventDate,customTicketInput.metadata.ticketType, customTicketInput.metadata.imageUrl, CustomTicketState(false));
        nfTickets[_currentEventId] = CustomTicket(msg.sender, customTicketInput.unitPrice, 0, _metadata);
        //Here we can try to use VRF and _mint a few "special tokens"??
        _mint(msg.sender, _currentEventId, customTicketInput.maxSupply, "");

        emit TicketCreation(_currentEventId, customTicketInput.unitPrice, customTicketInput.eventDesc);
        _currentEventId += 1;
    }

    function buyFromOwner(uint256 _tokenId, uint256 _numberOfTickets)
        public
        payable
    {
        address _owner = nfTickets[_tokenId].owner;
        uint256 _balanceOfOwner = balanceOf(_owner, _tokenId);
        require(
            _balanceOfOwner >= _numberOfTickets,
            "The owner does not have enough tickets to sell"
        );

        uint256 _unitPrice = nfTickets[_tokenId].tokenSalePrice;
        uint256 _totalRequestedTicketValue = _unitPrice * _numberOfTickets;
        require(
            msg.value >= _totalRequestedTicketValue,
            "Not enough funds sent to buy the tickets"
        );

        // Don't we need to transfer the eth to the owner's account?
        nfTickets[_tokenId].revenue += msg.value;
        _safeTransferFrom(_owner, msg.sender, _tokenId, _numberOfTickets, "");
    }

    function numTicketsOwned(uint256 _tokenId) public view returns (uint256) {
        uint256 _num = balanceOf(msg.sender, _tokenId);

        return _num;
    }

    // -------- Integrate token URI

    function setTokenUri(uint256 tokenId, string memory _tokenURI) public {
        require(msg.sender == nfTickets[tokenId].owner,
        "Transfer caller is not owner nor approved");
        nfTickets[tokenId].metadata.imageUrl = _tokenURI;
    }




    // -------- Keepers integration ------ Work in progress ... (TODO: Migrate ticket processing functions to own library)

    function _getTicketsToUpdate(bytes memory performData) private view returns (uint256[] memory) {
        // Map tickets
        // Verify which tickets eventDate < Keeper injected date
        // return tickets
        uint256[] memory tickets = new uint256[](0);
        return tickets;
    }

    function _updateTickets(uint256[] memory ticketsToUpdate) private {
        // Iterate over ticketsToUpdate
        // Change required state
    }


     function checkUpkeep(bytes calldata /* checkData */) external override returns (bool upkeepNeeded, bytes memory  performData ) {
         upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
        // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
    }

    function performUpkeep(bytes calldata performData) external override {
        lastTimeStamp = block.timestamp;
//        uint256 _externalTimestamp = performData; // Change this to get timestamp from performData
        uint256[] memory _nfTicketsToUpdate = _getTicketsToUpdate(performData);

        // We don't use the performData in this example. The performData is generated by the Keeper's call to your checkUpkeep function
    }





}
