**Account Types**

There is a User struct with a UserLevel enum that categorizes the user as a funder or student. This is used to display different elements on the frontend, as well as restrict certain actions in the contracts.

**Funding Scholarships**

We are holding the ETH so that any applicants know that the funds are currently available when applying for a scholarship. A funder can deactivate a scholarship if they haven't selected a winner yet, which will refund the ETH to their accounts. 

This could potentially cause issues, with users setting high award amounts, collecting names + email addresses of applicants, and then de-activating the scholarship.

**Permissions**

There are several functions that only the owner of a scholarship can access. This is the first step towards protecting user information, starting with their interest in scholarships. This will become even more important once essay prompts are added to the application process.

**Roadmap**

KYC will obviously be a huge part of this project. Specifically, we will want to verify students, and eventually their academic history.