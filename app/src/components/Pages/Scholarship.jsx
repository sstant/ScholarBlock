import React from 'react';
import { Redirect } from 'react-router-dom';
import { drizzleReactHooks } from 'drizzle-react';
import { OwnerAlert, ApplyForm, CreateAccount, ApplicantTable, OwnerActions, AboutFunder } from '../Elements';
import web3 from 'web3';

const Scholarship = props => {

    const { account, user } = props;
    const { id } = props.match.params;
    let owner = false;

    const { useCacheCall } = drizzleReactHooks.useDrizzle();
    const scholarship = useCacheCall('Scholarships', 'scholarships', id);

    if (scholarship && scholarship.owner === account) owner = true;

    return scholarship && scholarship.id !== '0' ? (
        <div className="container">
            <div className="row">
                <div className="col-md-8">

                    {
                        owner && (<OwnerAlert />)
                    }

                    <div className="jumbotron">
                        <h1 style={{'float':'right'}}><span className="badge badge-success">{web3.utils.fromWei(scholarship.amount)} ETH</span></h1>
                        <h1 className="display-4">{scholarship.name}</h1>
                        <p className="lead">{scholarship.description}</p>
                        {
                            /*
                            <p>This scholarship doesn't have any account requirements.</p>
                            */
                        }
                    </div>

                    {
                        owner && (<ApplicantTable scholarship={scholarship} />)
                    }

                </div>
                <div className="col-md-4">
                    {
                        scholarship.owner === account ? (
                            <OwnerActions scholarship={scholarship} />
                        ) : !user ? (
                            <CreateAccount account={account} />
                        ) : (
                            <ApplyForm user={user} scholarship={scholarship} />
                        )
                    }
                    <AboutFunder scholarship={scholarship} />
                </div>
            </div>
        </div>
    ) : scholarship && scholarship.id === '0' ? (
        <Redirect to="/" />
    ) : (<h4 className="text-center mt-4">Loading scholarship...</h4>)

};

export default Scholarship;