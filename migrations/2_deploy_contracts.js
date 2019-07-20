const Scholarships = artifacts.require("Scholarships");
const Applicants = artifacts.require("Applicants");

module.exports = function(deployer) {
  deployer.deploy(Scholarships);
  deployer.deploy(Applicants);
};
