import React from 'react';
import moment from 'moment';
//import { drizzleReactHooks } from 'drizzle-react';

const AboutFunder = ({ scholarship }) => {

    //const { useCacheCall } = drizzleReactHooks.useDrizzle();
    //const funder = useCacheCall('Scholarships', 'scholarships', userId);

    return (
        <div className="card mt-4">
            <div className="card-header">About the Funder</div>
            <div className="card-body text-center">
                <p className="mb-0">This scholarship was funded by {scholarship.owner} on {moment(scholarship.createdAt * 1000).format('MM/DD/YYYY')}.</p>
            </div>
        </div>
    )

}

export default AboutFunder;