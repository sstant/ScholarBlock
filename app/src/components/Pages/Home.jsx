import React from 'react';
import { ScholarshipTable, YourAccount, CreateScholarship } from '../Elements/';

const Home = ({ account }) => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <ScholarshipTable />
                </div>
                <div className="col-md-4">
                    <YourAccount account={account} />
                    <CreateScholarship />
                </div>
            </div> 
        </div>
    )
}

export default Home;