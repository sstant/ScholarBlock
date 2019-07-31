import React from 'react'
import { Home, Scholarship } from './components/Pages';
import { Header } from './components/Layout';
import { drizzleReactHooks } from 'drizzle-react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = props => {

  let user = null;
  
  const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
    account: drizzleState.accounts[0]
  }));

  const { account } = drizzleState;

  const { useCacheCall } = drizzleReactHooks.useDrizzle();
  const userId = useCacheCall('Users', 'addressBook', account);

  const userCall = useCacheCall('Users', 'users', userId || 0);
  if (userCall && userCall.id !== '0') user = userCall;
  
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} account={account} user={user} />} />
          <Route exact path="/scholarships/:id" render={(props) => <Scholarship {...props} account={account} user={user} />} />
        </Switch>
      </BrowserRouter>
    </React.Fragment> 
  )
  }

export default App;