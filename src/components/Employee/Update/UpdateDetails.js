import React, { useEffect } from 'react';
import './updateDetails.css'
import { useParams } from "react-router-dom";
import Form from '../../Form/Form';
import { getDetails } from '../../../features/members/memberSlice';
import { useDispatch, useSelector } from "react-redux";

const UpdateDetails = () => {
    const { id } = useParams()

    const dispatch = useDispatch()
    //useSelector use korey [adminData reducer] extract kora hocchey to get admins data from api
    const result = useSelector((state) => state.detailsData);
    const details=result?.details
    const {first_name,last_name,division,district,user_type}=details
    
     //dispatch async action  
     useEffect(() => {
        dispatch(getDetails(id))
    }, [id]);

    return (
        <div className='main-container'>
            <h4>Please fill-up the form with valid informations to update your details</h4>
            <div className='form-container'>
                {/*Form component called */}
                <Form 
                id={id} 
                first_name={first_name} 
                last_name={last_name} 
                division={division} 
                district={district}
                user_type={user_type}></Form>
            </div>
        </div>
    );
};

export default UpdateDetails;