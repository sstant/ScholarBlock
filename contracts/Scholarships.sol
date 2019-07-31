pragma solidity ^0.5.0;
import "./Users.sol";

contract Scholarships {

    address payable private admin;

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

    Users usersContract;
    address payable usersAddress;
    
    constructor(address payable _usersAddress) public {
        admin = msg.sender;
        usersAddress = _usersAddress;
        usersContract = Users(usersAddress);
    }

    event CreatedScholarship(uint id, string name, address owner, string description, uint amount);
    event ApplyForScholarship(uint userId, uint scholarshipId);
    event SelectedWinner(uint userId, uint scholarshipId, uint amount);
    event DisabledScholarship(uint scholarshipId, uint amount);

    modifier isAdmin() {
        require(msg.sender == admin);
        _;
    }

    modifier isStudent() {
        uint userId = usersContract.addressBook(msg.sender);
        require(userId != 0, "Could not find a user at this address.");

        uint userLevel = usersContract.getUserLevel(userId);
        require(userLevel == 0, "Must apply from a student account");
        _;
    }

    modifier isFunder() {
        uint userId = usersContract.addressBook(msg.sender);
        require(userId > 0, "Could not find a user at this address.");

        uint userLevel = usersContract.getUserLevel(userId);
        require(userLevel == 1, "Must be a funder account.");
        _;
    }

    modifier ownsScholarship(uint scholarshipId) {
        require(scholarships[scholarshipId].owner == msg.sender, "You must be the scholarship owner.");
        _;
    }

    function() external payable {
        revert();
    }

    function create(string memory _name, string memory _description) 
        public payable
        isFunder() {

        bytes memory name = bytes(_name);
        bytes memory description = bytes(_description);
        require(name.length != 0, "Please provide a scholarship name.");
        require(description.length != 0, "Please provide a scholarship description.");
        require(name.length < 60, "Please limit your scholarship name to 60 characters.");
        require(description.length < 500, "Please limit your scholarship description to 500 characters.");
        
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
        isStudent() {

        uint userId = usersContract.addressBook(msg.sender);
        require(hasApplied(userId, scholarshipId) == false, "You have already applied to this scholarship.");
        require(scholarships[scholarshipId].active, "This scholarship is not active.");
       
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

    function listApplicants(uint scholarshipId) 
        public view 
        ownsScholarship(scholarshipId)
        returns(uint[] memory) {
        return applicants[scholarshipId];
    }

    function getApplicant(uint scholarshipId, uint userId) 
        public view 
        ownsScholarship(scholarshipId)
        returns (uint id, string memory firstName, string memory lastName, string memory email) {
        // potential issue with looping
        require(hasApplied(userId, scholarshipId), "User has not applied to this scholarship.");
        return usersContract.getUser(userId);
    }

    function selectWinner(uint userId, uint scholarshipId) 
        public 
        ownsScholarship(scholarshipId) {

        require(scholarships[scholarshipId].active, "This scholarship is not currently active.");

        scholarships[scholarshipId].active = false;
        scholarships[scholarshipId].winner = userId;

        address payable wallet = usersContract.getUserWallet(userId);

        wallet.transfer(scholarships[scholarshipId].amount);

        emit SelectedWinner(userId, scholarshipId, scholarships[scholarshipId].amount);

    }

    function disableScholarship(uint scholarshipId) 
        public payable 
        ownsScholarship(scholarshipId) {
        
        require(scholarships[scholarshipId].active, "This scholarship is already inactive.");
        scholarships[scholarshipId].active = false;
        msg.sender.transfer(scholarships[scholarshipId].amount);
        emit DisabledScholarship(scholarshipId, scholarships[scholarshipId].amount);
    }

    function close() public isAdmin {
        selfdestruct(admin);
    }

}