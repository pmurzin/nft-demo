import { ethers } from "ethers"

import NFT_COLLECTION_FACTORY_ABI from './abi/NFTCollectionFactory.json'
import NFT_COLLECTION_ABI from './abi/NFTCollection.json'

// Check if MetaMask is installed
if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!")
} else {
    alert("Please install MetaMask to use this DApp.")
}

// Initialize the provider
const provider = new ethers.providers.Web3Provider(window.ethereum)

const factoryAddress = process.env.FACTORY_CONTRACT_ADDRESS

async function requestAccount() {
    try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
    } catch (error) {
        console.error("User rejected account access:", error)
    }
}

window.createCollection = async () => {
    await requestAccount()
    const signer = provider.getSigner()
    const factory = new ethers.Contract(factoryAddress, NFT_COLLECTION_FACTORY_ABI, signer)

    const name = document.getElementById("collectionName").value
    const symbol = document.getElementById("collectionSymbol").value

    const tx = await factory.createCollection(name, symbol)
    const receipt = await tx.wait()
    const event = receipt.events.find(
        (event) => event.event === "CollectionCreated",
    )
    const [collectionAddress] = event.args

    console.log("Collection Created at:", collectionAddress)
}

window.mintNFT = async () => {
    await requestAccount()
    const signer = provider.getSigner()
    const collectionAddress = document.getElementById("collectionAddress").value
    const recipientAddress = document.getElementById("recipientAddress").value
    const tokenId = document.getElementById("tokenId").value
    const tokenUri = document.getElementById("tokenUri").value

    const collection = new ethers.Contract(
        collectionAddress,
        NFT_COLLECTION_ABI,
        signer,
    )
    const tx = await collection.mintNFT(recipientAddress, tokenId, tokenUri)
    await tx.wait()
    console.log("Minted Token:", tx)
}
