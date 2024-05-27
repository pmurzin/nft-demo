// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721URIStorage, Ownable {
    event TokenMinted(address indexed collection, address indexed recipient, uint256 tokenId, string tokenUri);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mintNFT(address recipient, uint256 tokenId, string memory tokenUri) external onlyOwner {
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenUri);
        emit TokenMinted(address(this), recipient, tokenId, tokenUri);
    }
}
