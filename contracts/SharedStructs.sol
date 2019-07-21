pragma solidity >=0.4.21 <0.6.0;

library SharedStructs {
    struct Applicant {
        uint id;
        uint userId;
        uint scholarshipId;
        uint createdAt;
        bool winner;
    }

    struct Scholarship {
        uint id;
        string name;
        address owner;
        string description;
        bool active;
        uint applicantCount;
        uint amount;
        string essay;
        uint[] applicants;
    }

    struct User {
        uint id;
        address wallet;
        string firstName;
        string lastName;
        string email;
        string level;
        string organization;
    }
    
}