import React from 'react'
import { Home, Scholarship } from './components/Pages';
import { Header } from './components/Layout';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const App = props => {
  
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/scholarships/:id" render={(props) => <Scholarship {...props} />} />
        </Switch>
      </BrowserRouter>
    </React.Fragment> 
  )
  }

export default App;