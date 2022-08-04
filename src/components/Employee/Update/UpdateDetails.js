import React from 'react';
import './updateDetails.css'
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { City, State } from 'country-state-city';
import { useFormik } from 'formik';
import Form from '../../Form/Form';

const UpdateDetails = () => {
    const { id } = useParams()

    return (
        <div className='main-container'>
            <h4>Please fill-up the form with valid informations to update your details</h4>
            <div className='form-container'>
                {/*Form component called */}
                <Form id={id}></Form>
            </div>
        </div>
    );
};

export default UpdateDetails;