import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { ApplicantInfo, LoadingRow } from './';

const ApplicantRow = ({ id, scholarshipId }) => {

    const { useCacheCall } = drizzleReactHooks.useDrizzle();
    const applicant = useCacheCall('Applicants', 'applicants', id);

    return applicant ? (<ApplicantInfo userId={applicant.userId} applicantId={id} scholarsahipId={scholarshipId} />) : (<LoadingRow colSpan={4} />)

}

export default ApplicantRow;