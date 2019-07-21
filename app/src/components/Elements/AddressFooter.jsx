import React from 'react';

const AddressFooter = ({ account }) => (
    <div className="card-footer text-center">
      <p style={{'fontSize': '70%'}} className="mb-0">{account}</p>
    </div>
)

export default AddressFooter;