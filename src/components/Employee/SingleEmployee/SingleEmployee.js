import React from 'react';
import { useNavigate } from 'react-router-dom';
import './singleEmployee.css'

const SingleEmployee = ({employee}) => {
    const {first_name,last_name,id}=employee
    const navigate=useNavigate()
    const detailsPage=()=>{
        navigate(`/details/${id}`)
    }
    return (
        <div className='employee-list'>
            <li>{first_name} {last_name}</li>
            <button onClick={detailsPage} className='details-btn'>Details</button>
        </div>
    );
};

export default SingleEmployee;