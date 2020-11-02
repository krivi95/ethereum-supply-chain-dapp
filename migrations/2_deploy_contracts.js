var ProductManager = artifacts.require("./ProductManager.sol");

module.exports = function(deployer) {
  deployer.deploy(ProductManager);
};
