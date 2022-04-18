var ECom = artifacts.require("./ecom.sol");

module.exports = function (deployer) {
  deployer.deploy(ECom)
  .then(()=> console.log("Deployed Market"));
};
