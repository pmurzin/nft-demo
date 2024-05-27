async function main() {
    const [deployer] = await ethers.getSigners()

    console.log("Deploying contracts with the account:", deployer.address)

    const Factory = await ethers.getContractFactory("NFTCollectionFactory")
    const factory = await Factory.deploy()

    console.log("NFTCollectionFactory deployed to:", factory.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
