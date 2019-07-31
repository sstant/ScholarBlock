import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { ApplicantInfo, LoadingRow } from './';

const ApplicantRow = ({ id, scholarshipId }) => {

    const { useCacheCall } = drizzleReactHooks.useDrizzle();
    const applicant = useCacheCall('Scholarships', 'getApplicant', scholarshipId, id);

    console.log(applicant);

    return applicant ? (<ApplicantInfo applicant={{
        ...applicant,
        id: id
    }} scholarsahipId={scholarshipId} />) : (<LoadingRow colSpan={4} />)

}

export default ApplicantRow;