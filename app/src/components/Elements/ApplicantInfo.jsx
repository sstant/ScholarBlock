import React, { useCallback } from 'react';
import { LoadingRow } from './';
import { drizzleReactHooks } from 'drizzle-react';

const ApplicantInfo = ({ applicant, scholarshipId }) => {

    const { useCacheSend } = drizzleReactHooks.useDrizzle();
    const { send } = useCacheSend('Scholarships', 'selectWinner');

    console.log(applicant.id);
    console.log(scholarshipId);

    return applicant ? (
        <tr>
            <th scope="row">{applicant.firstName}</th>
            <td>{applicant.lastName}</td>
            <td>{applicant.email}</td>
            <td className="text-right">
                <button className="btn btn-success btn-sm" onClick={useCallback(() => send(applicant.id, scholarshipId))}>Choose as Winner</button>
            </td>
        </tr>
    ) : (<LoadingRow colSpan={4} />)

};

export default ApplicantInfo;