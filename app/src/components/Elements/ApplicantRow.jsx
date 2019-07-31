import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { ApplicantInfo, LoadingRow } from './';

const ApplicantRow = ({ id, scholarship }) => {

    const { useCacheCall } = drizzleReactHooks.useDrizzle();
    const applicant = useCacheCall('Scholarships', 'getApplicant', scholarship.id, id);

    return applicant ? (<ApplicantInfo applicant={applicant} scholarship={scholarship} />) : (<LoadingRow colSpan={4} />)

}

export default ApplicantRow;