var Users = artifacts.require("./Users.sol");
var Scholarships = artifacts.require("./Scholarships.sol");

contract('Scholarships', function(accounts) {

    let usersInstance;
    let scholarshipsInstance;
    let funderId;
    let studentId;

    beforeEach('setup contract for each test', async function () {
        usersInstance = await Users.deployed();
        scholarshipsInstance = await Scholarships.deployed(usersInstance.address);
    });

    /** ACCOUNT SETUP */

    it("register of funder should be successful", async () => {

        const tx = await usersInstance.createFunder(
            'First Name',
            'Last Name',
            'sebastianstant@gmail.com',
            'Organization Name',
            {from: accounts[1]});

        funderId = tx.logs[0].args.id;
        
        assert.exists(tx, "Should successfully create transaction.");
        assert.equal(tx.logs[0].event, "CreatedAccount", "Should emit a CreatedAccount event.");
    
    });

    it("register of student should be successful", async () => {

        const tx = await usersInstance.createStudent(
            'First Name',
            'Last Name',
            'sebastianstant@gmail.com',
            {from: accounts[2]});
            
        studentId = tx.logs[0].args.id;

        assert.exists(tx, "Should successfully create transaction.");
        assert.equal(tx.logs[0].event, "CreatedAccount", "Should emit a CreatedAccount event.");
    
    });

    /** ACCOUNT SETUP ENDS */




    it("scholarshipCount should return a count of 0 scholarships", async () => {

        const count = await scholarshipsInstance.scholarshipCount.call();
        assert.equal(count.toNumber(), 0, 'should return 0 scholarships');

    });

    // should error if no user
    // should error if no funder
    // should error if no/long title
    // should error if no/long description
    // should error with no/low amount

    it("should create a scholarship", async () => {

        const tx = await scholarshipsInstance.create(
            'Test Name',
            'This is a test description',
            {from: accounts[1]});

        scholarshipId = tx.logs[0].args.id;
        
        assert.exists(tx, "Should successfully create transaction.");
        assert.equal(tx.logs[0].event, "CreatedScholarship", "Should emit a CreatedScholarship event.");

    });

    it("scholarshipCount should return a count of 1 scholarships", async () => {

        const count = await scholarshipsInstance.scholarshipCount.call();
        assert.equal(count.toNumber(), 1, 'should return 0 scholarships');

    });

    // should error if no user
    // should error if no student

    it("should apply for a scholarship", async () => {

        const tx = await scholarshipsInstance.applyForScholarship(
            scholarshipId,
            {from: accounts[2]});
        
        assert.exists(tx, "Should successfully create transaction.");
        assert.equal(tx.logs[0].event, "ApplyForScholarship", "Should emit a ApplyForScholarship event.");

    });

    it("should return a list of applicants", async () => {

        const applicants = await scholarshipsInstance.listApplicants(
            scholarshipId,
            {from: accounts[1]});
                
        assert.equal(applicants.length, 1, "Should return 1 applicant");

    });

    it("should select a winner", async () => {

        const tx = await scholarshipsInstance.selectWinner(
            studentId,
            scholarshipId,
            {from: accounts[1]});
        
        assert.exists(tx, "Should successfully create transaction.");
        assert.equal(tx.logs[0].event, "SelectedWinner", "Should emit a SelectedWinnner event.");

    });

    it("should throw error disabling inactive scholarship", async () => {

        try {
            await scholarshipsInstance.disableScholarship(
                scholarshipId,
                {from: accounts[1]});
        } catch(err) {
            assert.exists(err, "Should throw error.");
        }
        
    });

    describe("should throw error", () => {

        it("if not scholarship owner", async () => {

            try {
                await scholarshipsInstance.selectWinner(
                    studentId,
                    scholarshipId,
                    {from: accounts[2]});
            } catch(err) {
                //console.error(err.reason);
                assert.exists(err, "Should throw error.");
            };
            
        });

    });

    

    // fetch updated info on scholarship

    /*

    it("should get applicant information", async () => {

        const applicant = await scholarshipsInstance.getApplicant(
            scholarshipId,
            studentId,
            {from: accounts[1]});
        
        console.log(applicant);
        
        assert.exists(applicant, "Should return applicant info.");

    });
    */

    // scholarship details should be updated
    // hasApplied
    // should fetch list of scholarship applicants
    // should should individual user

});