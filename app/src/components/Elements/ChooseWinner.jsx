import React, { useCallback } from 'react';
import { drizzleReactHooks } from 'drizzle-react';

const ChooseWinner = ({ scholarshipId, applicantId }) => {

    const { useCacheSend } = drizzleReactHooks.useDrizzle();
    const { send } = useCacheSend('Scholarships', 'selectWinner');

    return (
        
        <button className="btn btn-success btn-sm" onClick={useCallback(() => send(scholarshipId, applicantId))}>Choose as Winner</button>
    )


}

export default ChooseWinner;