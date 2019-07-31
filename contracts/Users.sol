pragma solidity ^0.5.0;

/// @title Accounts for ScholarBlock
/// @author Sebastian Stant
/// @notice Anyone can create a student or funder account
/// @dev Account data is not currently protected or verified

contract Users {

    address payable private admin;

    enum UserLevel {
        Student,
        Funder
    }

    struct User {
        uint id;
        address payable wallet;
        string firstName;
        string lastName;
        string email;
        UserLevel level;
        string organization;
        uint earnings;
    }

    uint public userCount = 0;

    mapping(uint => User) public users;
    mapping(address => uint) public addressBook;

    constructor() public {
        admin = msg.sender;
    }

    event CreatedAccount(address wallet, uint id, UserLevel level);

    modifier isAdmin() {
        require(msg.sender == admin);
        _;
    }

    modifier checkUserInfo(
        string memory firstName,
        string memory lastName,
        string memory email
    ) {
        bytes memory _firstName = bytes(firstName);
        bytes memory _lastName = bytes(lastName);
        bytes memory _email = bytes(email);
        require(_firstName.length != 0, "please provide a first name");
        require(_lastName.length != 0, "please provide a last name");
        require(_email.length != 0, "please provide an email address");
        _;
    }

    function() external payable {
        revert();
    }

    function createFunder(
        string memory firstName, 
        string memory lastName, 
        string memory email,
        string memory organization
    ) public payable checkUserInfo(firstName, lastName, email) {
        bytes memory _organization = bytes(organization);
        require(_organization.length != 0, "please provide an organization name");
        userCount ++;
        addressBook[msg.sender] = userCount;
        users[userCount] = User(userCount, msg.sender, firstName, lastName, email, UserLevel.Funder, organization, 0);
        emit CreatedAccount(msg.sender, userCount, UserLevel.Funder);
    }

    function createStudent(
        string memory firstName, 
        string memory lastName, 
        string memory email
    ) public payable checkUserInfo(firstName, lastName, email) {
        userCount ++;
        addressBook[msg.sender] = userCount;
        users[userCount] = User(userCount, msg.sender, firstName, lastName, email, UserLevel.Student, '', 0);
        emit CreatedAccount(msg.sender, userCount, UserLevel.Student);
    }

    function getUser(uint userId) view public returns (uint id, string memory firstName, string memory lastName, string memory email) {
        firstName = users[userId].firstName;
        lastName = users[userId].lastName;
        email = users[userId].email;
        return (userId, firstName, lastName, email);
    }

    function getUserWallet(uint userId) view public returns (address payable) {
        User memory user = users[userId];
        return user.wallet;
    }

    function getUserLevel(uint userId) view public returns(uint level) {
        User memory user = users[userId];
        return uint(user.level);
    }

    function close() public isAdmin {
        selfdestruct(admin);
    }
    
}