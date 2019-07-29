var Scholarships = artifacts.require("./Scholarships.sol");
//var expectThrow = require('./helper.js');

contract('Scholarships', function(accounts) {

    let scholarshipsInstance;

    beforeEach('setup contract for each test', async function () {
        scholarshipsInstance = await Scholarships.deployed();
    });

    it("...scholarshipCount should return a count of 0 users", async () => {

        const count = await scholarshipsInstance.scholarshipCount.call();
        assert.equal(count.toNumber(), 0, 'should return 0 scholarships');

    });

    it("...should create a scholarship", async () => {

        const tx = await scholarshipsInstance.create(
            'Test',
            'Test',
            new Date().getTime(),
            {from: accounts[1]});
        
        assert.exists(tx, "Should successfully create transaction.");
        assert.equal(tx.logs[0].event, "CreatedScholarship", "Should emit a CreatedScholarship event.");

    });

});