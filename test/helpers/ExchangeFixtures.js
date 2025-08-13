const { ethers } = require("hardhat")

async function deployExchangeFixture() {
    // Get contracts
    const Exchange = await ethers.getContractFactory("Exchange")
    const Token = await ethers.getContractFactory("Token")

    // Deploy token contracts
    const token0 = await Token.deploy("Kbessan Coin", "KBC", 1000000)
    const token1 = await Token.deploy("Mock DAI", "mDAI", 1000000)

    // Get accounts
    const accounts = await ethers.getSigners()
    const deployer = accounts[0]
    const feeAccount = accounts[1]
    const user1 = accounts[2]
    const user2 = accounts[3]

    const AMOUNT = ethers.parseUnits("100", 18)

    // Transfer some tokens to user1 for testing
    await (await token0.connect(deployer).transfer(user1.address, AMOUNT)).wait()

    // Transfer some tokens to user2 for testing
    await (await token1.connect(deployer).transfer(user2.address, AMOUNT)).wait()

    // Set the fee and deploy exchange
    const FEE_PERCENT = 10
    const exchange = await Exchange.deploy(feeAccount, FEE_PERCENT)
    
    return { tokens: { token0, token1 }, exchange, accounts: { deployer, feeAccount, user1, user2 } }
}

async function depositExchangeFixture() {
    const { tokens, exchange, accounts } = await deployExchangeFixture()

    const AMOUNT = ethers.parseUnits("100", 18)

    // Approve token0 for user1
    await (await tokens.token0.connect(accounts.user1).approve( await exchange.getAddress(), AMOUNT)).wait()
    // Deposit token0 into the exchange for user1
    // We need the transaction variable to test in our unit test
    const transaction = await exchange.connect(accounts.user1).depositToken(await tokens.token0.getAddress(), AMOUNT)
    await transaction.wait()

    // Approve & deposit token1 for user2
    // We do not need the transaction variable for our tests, so we can 
    // just do the transaction and await it
    await (await tokens.token1.connect(accounts.user2).approve(await exchange.getAddress(), AMOUNT)).wait()
    await (await exchange.connect(accounts.user2).depositToken(await tokens.token1.getAddress(), AMOUNT)).wait()

    return { tokens, exchange, accounts, transaction }

}

module.exports = {
    deployExchangeFixture,
    depositExchangeFixture

}
