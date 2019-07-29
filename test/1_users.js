var Users = artifacts.require("./Users.sol");
//var expectThrow = require('./helper.js');

contract('Users', function(accounts) {

    let usersInstance;

    beforeEach('setup contract for each test', async function () {
        usersInstance = await Users.deployed();
    });

    it("...countUsers should return a count of 0 users", async () => {

        const count = await usersInstance.userCount.call();
        assert.equal(count.toNumber(), 0, 'should return 0 users');

    });

    it("...register of funder should be successful", async () => {

        const tx = await usersInstance.create(
            'First Name',
            'Last Name',
            'sebastianstant@gmail.com',
            'funder',
            'Organization Name',
            {from: accounts[1]});
        
        assert.exists(tx, "Should successfully create transaction.");
        assert.equal(tx.logs[0].event, "CreatedAccount", "Should emit a CreatedAccount event.");
    
    });

    it("...register of student should be successful", async () => {

        const tx = await usersInstance.create(
            'First Name',
            'Last Name',
            'sebastianstant@gmail.com',
            'student',
            '',
            {from: accounts[2]});
        
        assert.exists(tx, "Should successfully create transaction.");
        assert.equal(tx.logs[0].event, "CreatedAccount", "Should emit a CreatedAccount event.");
    
    });

    it("...countUsers should return a count of 2 users", async () => {

        const count = await usersInstance.userCount.call();
        assert.equal(count.toNumber(), 2, 'should return 2 users');

    });

});