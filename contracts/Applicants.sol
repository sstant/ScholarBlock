pragma solidity ^0.5.0;
import "./Users.sol";

contract Applicants {

    Users usersContract;
    address usersAddress;

    uint public applicantCount = 0;

    struct Applicant {
        uint id;
        uint userId;
        uint scholarshipId;
        uint createdAt;
        bool winner;
    }

    event CreatedApplicant(uint id);
    //event UserLevel(uint level);

    mapping(uint => Applicant) public applicants;
    mapping(uint => Applicant[]) public listApplicants;
    mapping(uint => uint[]) public userIds;
    
    constructor(address _usersAddress) public {
        usersAddress = _usersAddress;
        usersContract = Users(usersAddress);
    }

    function getAllApplications(uint scholarshipId) public view returns (uint[] memory) {
        uint length = listApplicants[scholarshipId].length;
        uint[] memory payload = new uint[](length);

        for (uint i = 0; i < listApplicants[scholarshipId].length; i++) {
            payload[i] = listApplicants[scholarshipId][i].id;
        }

        return payload;
    }

    modifier onlyStudent(uint scholarshipId) {
        uint userId = usersContract.addressBook(msg.sender);
        require(userId != 0, "Could not find a user at this address.");

        uint userLevel = usersContract.getUserLevel(userId);
        require(userLevel == 0, "Must apply from a student account");

        bool applied = hasApplied(userId, scholarshipId);
        require(applied == false, "You have already applied to this scholarship.");
        _;
    }

    function create(uint scholarshipId) public onlyStudent(scholarshipId) {

        uint userId = usersContract.addressBook(msg.sender);

        uint createdAt = now;
        
        applicantCount ++;
        applicants[applicantCount] = Applicant(applicantCount, userId, scholarshipId, createdAt, false);
        Applicant[] storage list = listApplicants[scholarshipId];
        list.push(applicants[applicantCount]);

        uint[] storage _userIds = userIds[scholarshipId];
        _userIds.push(userId);
        emit CreatedApplicant(applicantCount);
    }
    
    function getUserId(uint applicantId) public view returns (uint) {
        return applicants[applicantId].userId;
    }

    function hasApplied(uint userId, uint scholarshipId) public view returns (bool applied) {
        //bool applied = false;
        uint[] memory _userIds = userIds[scholarshipId];
        for (uint i = 0; i < _userIds.length; i++) {
            uint id = _userIds[i];
            if (id == userId) {
                applied = true;
            }
        }
    }
    
    function selectWinner(uint applicantId, uint amount) public {


        // does msg.sender equal scholarship owner?
        // has winner already been selected?

        Applicant storage applicant = applicants[applicantId];
        applicant.winner = true;
        
        uint userId = applicant.userId;

        // get wallet
        address payable wallet = usersContract.getUserWallet(userId);

        // send scholarship amount;
        wallet.transfer(amount);

        // get scholarship
        /*
        Scholarship storage scholarship = scholarships[scholarshipId];
        scholarship.active = false;
        scholarship.winner = applicantId;




        return usersContract.sendAmount(applicant.userId, amount);
        */
    }

}