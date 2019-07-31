import React from 'react';
import { LoadingRow } from './';
import { drizzleReactHooks } from 'drizzle-react';

const ApplicantInfo = ({ applicant, scholarship }) => {

    const { useCacheSend } = drizzleReactHooks.useDrizzle();
    const { send } = useCacheSend('Scholarships', 'selectWinner');

    const chooseWinner = () => {
        send(applicant.id, scholarship.id);
    }

    return applicant ? (
        <tr>
            <th scope="row">{applicant.firstName}</th>
            <td>{applicant.lastName}</td>
            <td>{applicant.email}</td>
            {
                scholarship.active ? (
                    <td className="text-right">
                        <button className="btn btn-success btn-sm" onClick={chooseWinner}>Choose as Winner</button>
                    </td>
                ) : scholarship.winner === applicant.id ? (
                    <td className="text-right">
                        <span className="badge badge-success">Winner</span>
                    </td>
                ) : (null)
            }
        </tr>
    ) : (<LoadingRow colSpan={4} />)

};

export default ApplicantInfo;