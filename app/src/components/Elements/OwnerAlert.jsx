import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';

const OwnerAlert = ({ owner }) => {

    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
        ...drizzleState,
        account: drizzleState.accounts[0]
      }));
    
      const { account } = drizzleState;

    return owner === account ? (
        <div className="alert alert-primary" role="alert">
            You own this scholarship.
        </div>
    ) : (null)

}

export default OwnerAlert;