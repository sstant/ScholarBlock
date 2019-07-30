var Users = artifacts.require("./Users.sol");
var Scholarships = artifacts.require("./Scholarships.sol");
const Applicants = artifacts.require("./Applicants.sol");
//var expectThrow = require('./helper.js');

let funderId;
let studentId;
let applicantId;
let scholarshipId;

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

        const tx = await usersInstance.createFunder(
            'First Name',
            'Last Name',
            'sebastianstant@gmail.com',
            'Organization Name',
            {from: accounts[1]});

        console.log(tx.logs[0].args.id);
        funderId = tx.logs[0].args.id;
        
        assert.exists(tx, "Should successfully create transaction.");
        assert.equal(tx.logs[0].event, "CreatedAccount", "Should emit a CreatedAccount event.");
    
    });

    it("...register of student should be successful", async () => {

        const tx = await usersInstance.createStudent(
            'First Name',
            'Last Name',
            'sebastianstant@gmail.com',
            {from: accounts[2]});
            
        console.log(tx.logs[0].args.id);
        studentId = tx.logs[0].args.id;

        assert.exists(tx, "Should successfully create transaction.");
        assert.equal(tx.logs[0].event, "CreatedAccount", "Should emit a CreatedAccount event.");
    
    });

    it("...countUsers should return a count of 2 users", async () => {

        const count = await usersInstance.userCount.call();
        assert.equal(count.toNumber(), 2, 'should return 2 users');

    });

});

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

        console.log(tx.logs[0].args.id);
        scholarshipId = tx.logs[0].args.id;
        
        assert.exists(tx, "Should successfully create transaction.");
        assert.equal(tx.logs[0].event, "CreatedScholarship", "Should emit a CreatedScholarship event.");

    });

});

contract('Applicants', function(accounts) {

    let applicantsInstance;

    beforeEach('setup contract for each test', async function () {
        applicantsInstance = await Applicants.deployed();
    });

    it("...applicantCount should return a count of 0 applicants", async () => {

        const count = await applicantsInstance.applicantCount.call();
        assert.equal(count.toNumber(), 0, 'should return 0 applicantCount');

    });

    it("...should store vars", async () => {
        console.log(studentId, 'student id');
        console.log(funderId, 'funder id');
        console.log(scholarshipId, 'scholarship id');
    });

    /*
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
    */

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