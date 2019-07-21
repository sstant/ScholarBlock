import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { LoadingRow } from './';

const ApplicantInfo = ({ userId }) => {

    const { useCacheCall } = drizzleReactHooks.useDrizzle();
    const user = useCacheCall('Users', 'users', userId);

    return user ? (
        <tr>
            <th scope="row">{user.firstName}</th>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td className="text-right">
                <button className="btn btn-success btn-sm">Choose as Winner</button>
            </td>
        </tr>
    ) : (<LoadingRow colSpan={4} />)

};

export default ApplicantInfo;