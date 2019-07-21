import React from 'react';
import { ScholarshipTable, YourAccount, CreateScholarship, CreateAccount } from '../Elements/';

const Home = ({ account, user }) => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <ScholarshipTable />
                </div>
                <div className="col-md-4">
                    {
                        user ? (<YourAccount account={account} user={user} />) : (<CreateAccount account={account} />)
                    }
                    {
                        user && user.level === 'funder' && (<CreateScholarship />)
                    }
                    
                </div>
            </div> 
        </div>
    )
}

export default Home;