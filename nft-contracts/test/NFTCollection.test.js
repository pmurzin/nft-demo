const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("NFTCollection", function () {
    it("Should deploy the NFTCollection contract", async function () {
        const NFTCollection = await ethers.getContractFactory("NFTCollection")
        const nftCollection = await NFTCollection.deploy(
            "TestCollection",
            "TST",
        )
        await nftCollection.deployed()

        expect(await nftCollection.name()).to.equal("TestCollection")
        expect(await nftCollection.symbol()).to.equal("TST")
    })

    it("Should mint an NFT", async function () {
        const [owner, addr1] = await ethers.getSigners()
        const NFTCollection = await ethers.getContractFactory("NFTCollection")
        const nftCollection = await NFTCollection.deploy(
            "TestCollection",
            "TST",
        )
        await nftCollection.deployed()

        const mintTx = await nftCollection.mintNFT(
            addr1.address,
            1,
            "https://test.uri",
        )
        await mintTx.wait()

        expect(await nftCollection.ownerOf(1)).to.equal(addr1.address)
        expect(await nftCollection.tokenURI(1)).to.equal("https://test.uri")
    })
})
