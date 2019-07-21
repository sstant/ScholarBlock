pragma solidity >=0.4.21 <0.6.0;
import * as Scholarships from "./Scholarships.sol";
import * as Users from "./Users.sol";
import "./SharedStructs.sol";

contract Applicants {

    address scholarshipsAddress;
    address usersAddress;

    uint public applicantCount = 0;

    struct Applicant {
        uint id;
        uint userId;
        uint scholarshipId;
        uint createdAt;
        bool winner;
    }

    mapping(uint => Applicant) public applicants;
    mapping(uint => Applicant[]) public listApplicants;
    mapping(uint => uint[]) public userIds;

    function getAllApplications(uint scholarshipId) public view returns (uint[] memory) {
        uint length = listApplicants[scholarshipId].length;
        uint[] memory payload = new uint[](length);

        for (uint i = 0; i < listApplicants[scholarshipId].length; i++) {
            payload[i] = listApplicants[scholarshipId][i].id;
        }

        return payload;
    }

    function create(uint userId, uint scholarshipId, uint createdAt) public {
        applicantCount ++;
        applicants[applicantCount] = Applicant(applicantCount, userId, scholarshipId, createdAt, false);
        Applicant[] storage list = listApplicants[scholarshipId];
        list.push(applicants[applicantCount]);

        uint[] storage _userIds = userIds[scholarshipId];
        _userIds.push(userId);
        //scholarshipsContract.addApplicant(scholarshipId, applicantCount);
    }

    /*
    function selectWinner(uint applicantId) public returns (bool) {
        
        // check that you are owner of scholarship;

        Applicant storage applicant = applicants[applicantId];



        Scholarships.Scholarship storage scholarship = Scholarships.scholarships(applicant.scholarshipId);
        Users.User storage user = Users.users(applicant.userId);

        address wallet = user.wallet;
        wallet.trasnfer(scholarship.amount);

        applicant.winner = true;
        return true;
    }
    */


}