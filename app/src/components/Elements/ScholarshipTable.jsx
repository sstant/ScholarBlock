import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { ScholarshipRow } from './';
import emptyPiggyBank from '../../images/emptyPiggyBank.png';

const ScholarshipTable = () => {

    const { useCacheCall } = drizzleReactHooks.useDrizzle();
    const count = useCacheCall('Scholarships', 'scholarshipCount');
    const results = Array.apply(null, {length: count}).map((el, i) => i + 1);

    return count > 0 ? (
        <div className="card">
            <div className="card-header">
                All Scholarships ({count})
            </div>
            <div className="card-body p-0">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Created</th>
                        <th scope="col" className="text-center">Applicants</th>
                        <th scope="col" className="text-center">Award (ETH)</th>
                        <th scope="col" className="text-right">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        results
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .map(id => <ScholarshipRow key={id} id={id} />)
                    }
                </tbody>
                </table>
            </div>
        </div>
    ) : (
        <div className="row mt-4">
            <div className="col-md-12 text-center">
                <h4 className="font-weight-light">There are currently no scholarships available at this address.</h4>
                <img src={emptyPiggyBank} alt="Empty Piggy Bank" width="240" />
            </div>
        </div>
    )

}

export default ScholarshipTable;