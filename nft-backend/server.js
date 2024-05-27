const express = require("express")
const { ethers } = require("ethers")
require("dotenv").config()

const app = express()
const port = 3000

const RPC_URL = process.env.RPC_URL
const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS

// In-memory storage for events
let collections = []
let tokens = []

const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

// ABI of the NFTCollectionFactory contract
const factoryAbi = [
    "event CollectionCreated(address indexed collection, string name, string symbol)",
]

// ABI of the NFTCollection contract
const collectionAbi = [
    "event TokenMinted(address indexed collection, address indexed recipient, uint256 tokenId, string tokenUri)",
]

// Address of the deployed NFTCollectionFactory contract
const factoryAddress = FACTORY_CONTRACT_ADDRESS
const factoryContract = new ethers.Contract(
    factoryAddress,
    factoryAbi,
    provider,
)

// Listen for CollectionCreated events from the factory
factoryContract.on("CollectionCreated", (collection, name, symbol) => {
    collections.push({ collection, name, symbol })
    console.log("Collection Created:", { collection, name, symbol })

    // Listen for TokenMinted events from the newly created collection
    const nftContract = new ethers.Contract(collection, collectionAbi, provider)
    nftContract.on(
        "TokenMinted",
        (collection, recipient, tokenId, tokenUri) => {
            tokens.push({ collection, recipient, tokenId, tokenUri })
            console.log("Token Minted:", {
                collection,
                recipient,
                tokenId,
                tokenUri,
            })
        },
    )
})

// Routes
app.get("/collections", (req, res) => {
    res.json(collections)
})

app.get("/tokens", (req, res) => {
    res.json(tokens)
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
