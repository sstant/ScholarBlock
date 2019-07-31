const Scholarships = artifacts.require("Scholarships");
const Users = artifacts.require("Users");

module.exports = function(deployer) {

  deployer.deploy(Users).then(() => {
    return deployer.deploy(Scholarships, Users.address);
  }).then(() => {
    console.log('done deploying');
  });
  
};
