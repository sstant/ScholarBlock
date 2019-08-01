pragma solidity ^0.5.0;

/// @title Account storage for ScholarBlock
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

    /** @dev Fallback function.
      */
    function() external payable {
        revert();
    }

    /** @dev Creates an account at the Funder level.
      * @param firstName First name of the funder.
      * @param lastName Last name of the funder.
      * @param email Email address of the funder.
      * @param organization Name of the funder's organization
      */
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

    /** @dev Creates an account at the Student level.
      * @param firstName First name of the student.
      * @param lastName Last name of the student.
      * @param email Email address of the student.
      */
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

    /** @dev Fetches information about the user.
      * @notice This should eventually be a private/internal function.
      * @param userId The unique ID of the user to fetch.
      * @return id The unique ID of the user.
      * @return firstName The first name of the user.
      * @return lastName The last name of the user.
      * @return email The email address of the user.
      */
    function getUser(uint userId) view public returns (uint id, string memory firstName, string memory lastName, string memory email) {
        firstName = users[userId].firstName;
        lastName = users[userId].lastName;
        email = users[userId].email;
        return (userId, firstName, lastName, email);
    }

    /** @dev Fetches the wallet address of a user.
      * @notice This should eventually be a private/internal function.
      * @param userId The unique ID of the user to fetch.
      * @return address The wallet address of the user.
      */
    function getUserWallet(uint userId) view public returns (address payable) {
        User memory user = users[userId];
        return user.wallet;
    }

    /** @dev Fetches the level of a user.
      * @notice This should eventually be a private/internal function.
      * @param userId The unique ID of the user to fetch.
      * @return level Returns either 0 or 1 for Funder or Student.
      */
    function getUserLevel(uint userId) view public returns(uint level) {
        User memory user = users[userId];
        return uint(user.level);
    }

    /** @dev Destroys the contract & sends balance to admin.
      */
    function close() public isAdmin {
        selfdestruct(admin);
    }
    
}