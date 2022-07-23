import React from 'react';
import './singleAdmin.css'

const SingleAdmin = ({ admin }) => {
    const { first_name, last_name, user_type, division, district } = admin
    return (
        <div className='admin-list'>
            <li>{first_name} {last_name}</li>
            {/*<button className='details-btn'>Details</button>
    <button className='edit-btn'>Edit</button>*/}
        </div>
    );
};

export default SingleAdmin;