import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';

const Loading = ({ children }) => {

    const drizzleState = drizzleReactHooks.useDrizzleState(state => ({
        web3status: state.web3.status,
        initialized: state.drizzleStatus.initialized
    }));

    return drizzleState.web3status === 'failed' ? (
        <main>
              <p>This browser has no connection to the Ethereum network. Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.</p>
            </main>
    ) : !drizzleState.initialized ? (
        <main className="mt-4 text-center">
            <h3 className="mt-4">Loading ScholarBlock...</h3>
            <p>Please make sure you are logged into MetaMask.</p>
      </main>
    ) : (children);

};

export default Loading;