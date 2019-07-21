import React from 'react';

const LoadingRow = ({colSpan}) => {

    return (
        <tr>
        <td colSpan={colSpan} className="text-center">Loading...</td>
    </tr>
    )

}

export default LoadingRow;