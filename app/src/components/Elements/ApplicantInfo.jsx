import React, { useCallback } from 'react';
import { LoadingRow } from './';
import { drizzleReactHooks } from 'drizzle-react';

const ApplicantInfo = ({ applicant, scholarship }) => {

    const { useCacheSend } = drizzleReactHooks.useDrizzle();
    const { send } = useCacheSend('Scholarships', 'selectWinner');

    return applicant ? (
        <tr>
            <th scope="row">{applicant.firstName}</th>
            <td>{applicant.lastName}</td>
            <td>{applicant.email}</td>
            {
                scholarship.active ? (
                    <td className="text-right">
                        <button className="btn btn-success btn-sm" onClick={useCallback(() => send(applicant.id, scholarship.id))}>Choose as Winner</button>
                    </td>
                ) : scholarship.winner === applicant.id ? (
                    <span className="badge badge-success mt-3">Winner</span>
                ) : (null)
            }
        </tr>
    ) : (<LoadingRow colSpan={4} />)

};

export default ApplicantInfo;