pragma solidity >=0.4.21 <0.6.0;

contract Users {

    struct User {
        uint id;
        address wallet;
        string firstName;
        string lastName;
        string email;
        string level;
        string organization;
    }

    uint public userCount = 0;

    mapping(uint => User) public users;
    mapping(address => uint) public addressBook;

    constructor() public {
        //create("Sebastian","Stant","sebastianstant@gmail.com","funder","ETH Edu");
    }

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
        users[userCount] = User(userCount, msg.sender, firstName, lastName, email, level, organization);
        addressBook[msg.sender] = userCount;
    }
    
}