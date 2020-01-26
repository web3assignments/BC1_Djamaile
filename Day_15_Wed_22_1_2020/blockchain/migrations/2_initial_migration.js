const Calorie = artifacts.require("Calorie");

module.exports = function(deployer) {
  deployer.deploy(Calorie);
};
