// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFTCollection.sol";

contract NFTCollectionFactory {
    event CollectionCreated(address indexed collection, string name, string symbol);

    function createCollection(string memory name, string memory symbol) public {
        NFTCollection collection = new NFTCollection(name, symbol);
        collection.transferOwnership(msg.sender);
        emit CollectionCreated(address(collection), name, symbol);
    }
}
