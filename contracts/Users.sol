pragma solidity ^0.5.0;

contract Users {

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

    event CreatedAccount(address wallet, uint id);
    event SentAmount(uint userId, uint amount);

    function create(
        string memory firstName, 
        string memory lastName, 
        string memory email, 
        string memory level, 
        string memory organization) public payable {
        bytes memory _firstName = bytes(firstName);
        bytes memory _lastName = bytes(lastName);
        bytes memory _email = bytes(email);
        require(_firstName.length != 0, "please provide a first name");
        require(_lastName.length != 0, "please provide a last name");
        require(_email.length != 0, "please provide an email address");
        userCount ++;
        users[userCount] = User(userCount, msg.sender, firstName, lastName, email, level, organization, 0);
        addressBook[msg.sender] = userCount;
        //wallets[userCount] = msg.sender;
        emit CreatedAccount(msg.sender, userCount);
    }
    
    function sendAmount(uint userId, uint amount) public payable {
        User storage user = users[userId];
        //uint earnings = user.earnings;
        //user.earnings += earnings + amount;
        emit SentAmount(userId, amount);
        return user.wallet.transfer(amount);
    }

    function getUserLevel(uint userId) public returns(string memory level) {
        User memory user = users[userId];
        return user.level;
    }
    
}