import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { ApplicantRow } from './';

const ApplicantTable = ({ scholarshipId }) => {

    const { useCacheCall } = drizzleReactHooks.useDrizzle();
    
   const applicants = useCacheCall('Scholarships', 'listApplicants', scholarshipId);

   console.log(applicants);

    return (applicants || []).length > 0 ? (
        <div className="card">
            <div className="card-header">
                {applicants.length} Applicants
            </div>
            <div className="card-body p-0">
            <table className="table mb-0">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        applicants.map(id => (<ApplicantRow key={id} id={id} scholarshipId={scholarshipId} />))
                    }
                </tbody>
                </table>
            </div>
        </div>
    ) : (
        <div className="row mt-4">
            <div className="col-md-12 text-center">
                <h3 className="font-weight-light">There are currently no applicants.</h3>
            </div>
        </div>
    )

}

export default ApplicantTable;