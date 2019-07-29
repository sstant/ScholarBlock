const Applicants = artifacts.require("./Applicants.sol");
const { getScholarshipId, getUserId } = require('./helpers');
//var expectThrow = require('./helper.js');

contract('Applicants', function(accounts) {

    let applicantsInstance;
    let scholarshipId;
    let userId;

    beforeEach('setup contract for each test', async function () {
        applicantsInstance = await Applicants.deployed();
    });

    it("...applicantCount should return a count of 0 applicants", async () => {

        const count = await applicantsInstance.applicantCount.call();
        assert.equal(count.toNumber(), 0, 'should return 0 applicantCount');

    });

    it("...should get a scholarship id from helper", async () => {
        scholarshipId = await getScholarshipId(1);
        console.log(scholarshipId);
        assert.exists(scholarshipId, 'Should successfully get a scholarship ID.');
    });

    it("...should get a user id from helper", async () => {
        userId = await getUserId(1);
        console.log(userId, 'userId');
        assert.exists(userId, 'Should successfully get a user ID.');
    });

    /*
    it("...should create an applicant", async () => {
        const tx = await applicantsInstance.create(
            userId,
            scholarshipId,
            new Date().getTime(),
            {from: accounts[2]});
        
        assert.exists(tx, "Should successfully create transaction.");
        assert.equal(tx.logs[0].event, "CreatedApplicant", "Should emit a CreatedApplicant event.");
    });
    */
    


});