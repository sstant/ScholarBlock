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

    modifier onlyStudent {
        uint userId = usersContract.addressBook(msg.sender);
        require(userId != 0, "Could not find a user at this address.");

        string memory userLevel = usersContract.getUserLevel(userId);
        require(userLevel == "student", "Must apply from a student account");
        _;
    }

    function create(uint scholarshipId, uint createdAt) public onlyStudent {

        uint userId = usersContract.addressBook(msg.sender);
        require(userId != 0, "Could not find a user at this address.");

        string memory userLevel = usersContract.getUserLevel(userId);
        require(userLevel == "student", "Must apply from a student account");
        
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
    
    function selectWinner(uint applicantId, uint amount) public {
        Applicant storage applicant = applicants[applicantId];
        applicant.winner = true;
        return usersContract.sendAmount(applicant.userId, amount);
    }

}