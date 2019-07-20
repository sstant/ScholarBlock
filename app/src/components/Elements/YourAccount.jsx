import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';

const YourAccount = props => {

    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
        ...drizzleState,
        account: drizzleState.accounts[0]
      }));
    
      const { account } = drizzleState;

      return (
        <div className="card">
            <div className="card-header">Your Account</div>
            <div className="card-body">
              <p>{account}</p>
            </div>
          </div>
    )

}

export default YourAccount;