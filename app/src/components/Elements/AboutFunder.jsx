import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';

const AboutFunder = ({ userId }) => {

    console.log(userId);

    const { useCacheCall } = drizzleReactHooks.useDrizzle();
    const funder = useCacheCall('Scholarships', 'scholarships', userId);

    return (
        <div className="card mt-4">
            <div className="card-header">About the Funder</div>
            <div className="card-body text-center">
                <p className="mb-0">This scholarship was funded by.</p>
            </div>
        </div>
    )

}

export default AboutFunder;