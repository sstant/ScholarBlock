import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import web3 from 'web3';
import { withRouter } from 'react-router-dom';

const ScholarshipRow = props => {

    const { useCacheCall } = drizzleReactHooks.useDrizzle();
    const scholarship = useCacheCall('Scholarships', 'scholarships', props.id);

    return scholarship ? (
        <tr onClick={() => props.history.push(`/scholarships/${props.id}`)}>
            <th scope="row">{scholarship.name}</th>
            <td>{scholarship.applicantCount}</td>
            <td>{web3.utils.fromWei(scholarship.amount)} ETH</td>
        </tr>
    ) : (<tr>
        <td colSpan="3" className="text-center">Loading...</td>
    </tr>)
}

export default withRouter(ScholarshipRow);