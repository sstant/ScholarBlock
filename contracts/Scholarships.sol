pragma solidity ^0.5.0;
import "./Applicants.sol";

contract Scholarships {

    Applicants applicantsContract;
    address applicantsAddress;

    uint public scholarshipCount = 0;

    struct Scholarship {
        uint id;
        string name;
        address owner;
        string description;
        bool active;
        //uint applicantCount;
        uint amount;
        uint createdAt;
        uint winner;
    }
    
    constructor(address _applicantsAddress) public {
        applicantsAddress = _applicantsAddress;
        applicantsContract = Applicants(applicantsAddress);
    }

    mapping(uint => Scholarship) public scholarships;

    event CreatedScholarship(uint id, string name, address owner, string description, bool active, uint amount);

    function create(string memory _name, string memory description, uint createdAt) public payable {
        bytes memory name = bytes(_name);
        require(name.length != 0, "please provide a name");
        // require sender has an account
        // require a minimum amount of wei
        scholarshipCount ++;
        scholarships[scholarshipCount] = Scholarship(scholarshipCount, _name, msg.sender, description, true, msg.value, createdAt, 0);
        emit CreatedScholarship(scholarshipCount, _name, msg.sender, description, true, msg.value);
    }
    
    function selectWinner(uint scholarshipId, uint applicantId) public {

        // check that you are owner of scholarship;
        Scholarship memory scholarship = scholarships[scholarshipId];
        require(msg.sender == scholarship.owner, "You are not the owner of this scholarship."); 
                
        scholarship.active = false;
        scholarship.winner = applicantId;

        //log0(scholarshipId);
        //log0(applicantId);
        
        // this will pay user;
        //return applicantsContract.selectWinner(applicantId, scholarship.amount);
        
    }

}