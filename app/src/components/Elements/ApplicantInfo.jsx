import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { LoadingRow } from './';
import ChooseWinner from './ChooseWinner';

const ApplicantInfo = ({ scholarshipId, applicantId, userId }) => {

    const { useCacheCall } = drizzleReactHooks.useDrizzle();
    const user = useCacheCall('Users', 'users', userId);

    return user ? (
        <tr>
            <th scope="row">{user.firstName}</th>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td className="text-right">
                <ChooseWinner scholarshipId={scholarshipId} applicantId={applicantId} />
            </td>
        </tr>
    ) : (<LoadingRow colSpan={4} />)

};

export default ApplicantInfo;