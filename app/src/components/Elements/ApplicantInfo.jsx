import React from 'react';
import { LoadingRow } from './';
import ChooseWinner from './ChooseWinner';

const ApplicantInfo = ({ applicant, scholarshipId }) => {

    return applicant ? (
        <tr>
            <th scope="row">{applicant.firstName}</th>
            <td>{applicant.lastName}</td>
            <td>{applicant.email}</td>
            <td className="text-right">
                <ChooseWinner scholarshipId={scholarshipId} applicantId={applicant.id} />
            </td>
        </tr>
    ) : (<LoadingRow colSpan={4} />)

};

export default ApplicantInfo;