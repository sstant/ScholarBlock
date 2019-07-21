pragma solidity >=0.4.21 <0.6.0;

contract Scholarships {

    uint public scholarshipCount = 0;

    struct Scholarship {
        uint id;
        string name;
        address owner;
        string description;
        bool active;
        uint applicantCount;
        uint amount;
        string essay;
        uint createdAt;
    }

    constructor() public {
        //create("Norfolk Athletes");
    }

    mapping(uint => Scholarship) public scholarships;
    mapping(uint => uint[]) public applicants;

    function create(string memory _name, string memory description, string memory essay, uint createdAt) public payable {
        bytes memory name = bytes(_name);
        require(name.length != 0, "please provide a name");
        // require a minimum amount of wei
        scholarshipCount ++;
        scholarships[scholarshipCount] = Scholarship(scholarshipCount, _name, msg.sender, description, true, 0, msg.value, essay, createdAt);
    }

    function addApplicant(uint id, uint applicantId) public returns (uint) {
        Scholarship storage scholarship = scholarships[id];
        scholarship.applicantCount ++;
        //uint[] storage current = applicants[id];
        //current.push(applicantId);
        //applicants[id] = current;
        return scholarship.applicantCount;
    }

}