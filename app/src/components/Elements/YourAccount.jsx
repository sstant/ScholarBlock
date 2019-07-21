import React from 'react';
import { CreateAccount, UserDetails, AddressFooter } from '../Elements';

const YourAccount = ({ account, user }) => {

  return (
    <div className="card">
    <div className="card-header">Your Account</div>
    <div className="card-body">
      {
        user ? (<UserDetails user={user} />) : (
          <div className="row">
            <div className="col-md-12">
              <p>Howdy, stranger. Create an account:</p>
              <CreateAccount address={account} />
            </div>
          </div>
        )
      }
    </div>
    <AddressFooter account={account} />
    </div>
    )
    
  }
  
  export default YourAccount;