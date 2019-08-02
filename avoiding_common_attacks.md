**Circuit Breaker Design Pattern**

Both the Users and Scholarships contracts have a private `close` function that will selfdestruct the contract. only the `admin` can call this contract

**Re-entracy Attacks**

I am making sure to make all updates to the state before any ETH is sent to scholarship winners or refunded to scholarship owners. 

**Fallback Payable Function**

Both the Users and Scholarships contracts have a fallback payable function that will revert if no other payable functions match.

**String Length**

Checking the length of strings for Scholarship creation to ensure that the string do not exceed a reasonable length.