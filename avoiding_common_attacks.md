**Circuit Breaker Design Pattern**

both the Users and Tasks contracts have a private `close` function that will selfdestruct the contract. only the `admin` can call this contract

**Re-entracy Attacks**

I am making sure to make all updates to the state before any ETH is sent to scholarship winners or refunded to scholarship owners. 

**Fallback Payable Function**

**String Length**

Checking the length of strings