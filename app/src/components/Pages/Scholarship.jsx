import React from 'react';
import { Redirect } from 'react-router-dom';
import { drizzleReactHooks } from 'drizzle-react';
import { OwnerAlert, ApplyForm, CreateAccount, ApplicantTable, OwnerActions } from '../Elements';
import web3 from 'web3';

const Scholarship = props => {

    const { account, user } = props;
    const { id } = props.match.params;
    let owner = false;

    const { useCacheCall } = drizzleReactHooks.useDrizzle();
    const scholarship = useCacheCall('Scholarships', 'scholarships', id);

    if (scholarship && scholarship.owner === account) owner = true;

    console.log(scholarship);

    return scholarship && scholarship.id !== '0' ? (
        <div className="container">
        {
            owner && (<OwnerAlert />)
        }
            
            <div className="row">
                <div className="col-md-8">

                    <div className="jumbotron">
                        <h1 style={{'float':'right'}}><span className="badge badge-success">{web3.utils.fromWei(scholarship.amount)} ETH</span></h1>
                        <h1 className="display-4">{scholarship.name}</h1>
                        <p className="lead">{scholarship.description}</p>
                        <hr className="my-4" />
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
                    <div className="card mt-4">
                        <div className="card-header">About the Funder</div>
                        <div className="card-body text-center">
                            <p className="mb-0">This scholarship was funded by.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : scholarship && scholarship.id === '0' ? (
        <Redirect to="/" />
    ) : (<h4 className="text-center mt-4">Loading scholarship...</h4>)

};

export default Scholarship;