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
    }

    constructor() public {
        //create("Norfolk Athletes");
    }

    mapping(uint => Scholarship) public scholarships;

    function create(string memory _name, string memory description, string memory essay) public payable {
        bytes memory name = bytes(_name);
        require(name.length != 0, "please provide a name");
        // require a minimum amount of wei
        scholarshipCount ++;
        scholarships[scholarshipCount] = Scholarship(scholarshipCount, _name, msg.sender, description, true, 0, msg.value, essay);
    }

}