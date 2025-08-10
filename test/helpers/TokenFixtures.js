async function deployTokenFixtue() {
    const Token = await ethers.getContractFactory("Token")
    const token = await Token.deploy("Kbessan Coin", "KBC", 1000000)
    
    return { token }
}

module.exports = {
    deployTokenFixtue
}