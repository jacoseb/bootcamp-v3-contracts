const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TokenModule", (m) => {
  const TOTAL_SUPPLY = 1000000
  const DEPLOYER = m.getAccount(0)

  const KBC = m.contract(
    "Token",
    ["KBessan Coin", "KBC", TOTAL_SUPPLY],
    { from: DEPLOYER, id: "KBC" }
  )

  const mUSDC = m.contract(
    "Token",
    ["Mock USDC", "mUSDC", TOTAL_SUPPLY],
    { from: DEPLOYER, id: "mUSDC" }
  )

  const mLINK = m.contract(
    "Token",
    ["Mock LINK", "mLINK", TOTAL_SUPPLY],
    { from: DEPLOYER, id: "mLINK" }
  )
    
  return { KBC, mUSDC, mLINK };
});
