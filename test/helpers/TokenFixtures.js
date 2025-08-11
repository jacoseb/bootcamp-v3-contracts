async function deployTokenFixtue() {
    const Token = await ethers.getContractFactory("Token")
    const token = await Token.deploy("Kbessan Coin", "KBC", 1000000)

    const accounts = await ethers.getSigners()
    const deployer = accounts[0]
    const receiver = accounts[1]

    return { token, deployer, receiver }
}

module.exports = {
    deployTokenFixtue
}