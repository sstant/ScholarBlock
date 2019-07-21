const Scholarships = artifacts.require("Scholarships");
const Applicants = artifacts.require("Applicants");
const Users = artifacts.require("Users");

module.exports = function(deployer) {
  deployer.deploy(Scholarships);
  deployer.deploy(Applicants);
  deployer.deploy(Users);
};
