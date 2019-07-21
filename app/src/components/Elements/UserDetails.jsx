import React from 'react';

const UserDetails = ({ user }) => {
    
    return user ? (
        <div className="row">
            <div className="col-md-12">
              <p className="mb-0">Hi there, {user.firstName}.</p>
            </div>
          </div>
    ) : (<p>Loading user details...</p>)

}

export default UserDetails;