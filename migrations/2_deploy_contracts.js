const Scholarships = artifacts.require("Scholarships");
const Applicants = artifacts.require("Applicants");
const Users = artifacts.require("Users");

module.exports = function(deployer) {

  deployer.deploy(Users).then(() => {
    return deployer.deploy(Applicants, Users.address);
  }).then(() => {
    return deployer.deploy(Scholarships, Applicants.address);
  }).then(() => {
    console.log('done deploying');
  });

  //deployer.deploy(Applicants);

  //deployer.deploy(Scholarships);
  
  
};
