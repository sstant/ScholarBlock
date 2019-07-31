pragma solidity ^0.5.0;
import "./Users.sol";

contract Scholarships is Users {

    Users usersContract;
    address usersAddress;

    struct Scholarship {
        uint id;
        string name;
        address owner;
        string description;
        bool active;
        uint applicantCount;
        uint amount;
        uint createdAt;
        uint winner;
    }


    uint public scholarshipCount = 0;
    mapping(uint => Scholarship) public scholarships;
    mapping(uint => uint[]) public applicants;
    
    constructor(address _usersAddress) public {
        usersAddress = _usersAddress;
        usersContract = Users(usersAddress);
    }

    /* EVENTS */

    event CreatedScholarship(uint id, string name, address owner, string description, uint amount);
    event ApplyForScholarship(uint userId, uint scholarshipId);
    event SelectedWinner(uint userId, uint scholarshipId, uint amount);

    /** MODIFIERS */

    modifier onlyStudent(uint scholarshipId) {
        uint userId = usersContract.addressBook(msg.sender);
        require(userId != 0, "Could not find a user at this address.");

        uint userLevel = usersContract.getUserLevel(userId);
        require(userLevel == 0, "Must apply from a student account");

        bool applied = hasApplied(userId, scholarshipId);
        require(applied == false, "You have already applied to this scholarship.");
        _;
    }

    modifier onlyFunder(address _address) {
        uint userId = usersContract.addressBook(_address);
        require(userId > 0, "Could not find a user at this address.");

        uint userLevel = usersContract.getUserLevel(userId);
        require(userLevel == 1, "Must be a funder account.");
        _;
    }

    /** FUNCTIONS */

    function create(string memory _name, string memory _description) 
        public payable
        onlyFunder(msg.sender) {

        bytes memory name = bytes(_name);
        require(name.length != 0, "please provide a name");
        // require sender has an account
        // require a minimum amount of wei
        // enforce max string size for name/description
        scholarshipCount ++;

        scholarships[scholarshipCount] = Scholarship({
            id: scholarshipCount,
            name: _name,
            owner: msg.sender,
            description: _description,
            active: true,
            applicantCount: 0,
            amount: msg.value,
            createdAt: now,
            winner: 0
        });

        emit CreatedScholarship(scholarshipCount, _name, msg.sender, _description, msg.value);
    }

    function applyForScholarship(uint scholarshipId)
        public
        onlyStudent(scholarshipId) {

            // require scholarship is active

        uint userId = usersContract.addressBook(msg.sender);

        applicants[scholarshipId].push(userId);
        scholarships[scholarshipId].applicantCount ++;

        emit ApplyForScholarship(userId, scholarshipId);
    }

    function hasApplied(uint userId, uint scholarshipId) public view returns (bool) {
        uint[] memory _userIds = applicants[scholarshipId];
        for (uint i = 0; i < _userIds.length; i++) {
            if (_userIds[i] == userId) {
                return true;
            }
        }
        return false;
    }

    // make sure owner of 
    // only owner of scholarship
    function listApplicants(uint scholarshipId) public view returns(uint[] memory) {
        return applicants[scholarshipId];
    }

    // make sure owner of 
    // only owner of scholarship
    function getApplicant(uint scholarshipId, uint userId) public view returns (string memory firstName, string memory lastName, string memory email) {
        // potential issue with looping
        require(hasApplied(userId, scholarshipId), "User has not applied to this scholarship.");
        usersContract.getUser(userId);
    }

    function selectWinner(uint userId, uint scholarshipId) public {

        // require scholarship is active

        scholarships[scholarshipId].active = false;
        scholarships[scholarshipId].winner = userId;

        address payable wallet = usersContract.getUserWallet(userId);

        wallet.transfer(scholarships[scholarshipId].amount);

        emit SelectedWinner(userId, scholarshipId, scholarships[scholarshipId].amount);

    }
    
    /*
    function selectWinner(uint scholarshipId, uint applicantId) public {

        // check that you are owner of scholarship;
        Scholarship memory scholarship = scholarships[scholarshipId];
        require(msg.sender == scholarship.owner, "You are not the owner of this scholarship."); 
                
        scholarship.active = false;
        scholarship.winner = applicantId;
        
    }
    */

}