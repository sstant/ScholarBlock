var Scholarships = artifacts.require("./Scholarships.sol");
var Users = artifacts.require("./Users.sol");

const getScholarshipId = async id => {
    scholarshipsInstance = await Scholarships.deployed();
    const scholarship = await scholarshipsInstance.scholarships.call(id);
    const count = await scholarshipsInstance.scholarshipCount.call();
    console.log(count, 'scholarship count');
    return scholarship.id;
}

const getUserId = async id => {
    console.log(id);
    usersInstance = await Users.deployed();
    const user = await usersInstance.users.call(id);
    const count = await usersInstance.userCount.call();
    console.log(count, 'user count');
    console.log(user);
    return user.id;
}

module.exports = {
    getScholarshipId,
    getUserId
};