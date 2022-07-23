import React from 'react';
import './updateDetails.css'
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { City, State } from 'country-state-city';
import { useFormik } from 'formik';

const UpdateDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    //console.log(id)
    let updatedStates = State.getStatesOfCountry('BD');
    let cities = City.getCitiesOfCountry('BD');

    const validate = (values) => {
        const errors = {};

        if (!values.first_name) {
            errors.first_name = "Input Required";
        }
        else if (values.first_name.length > 20) {
            errors.first_name = "Must be 20 characters or less";
        }
        else if (!isNaN(values.first_name)) {
            errors.first_name = "Must be String";
        }
        // else if (values.firstName !== 'employee') {
        //     errors.firstName = "Must be employee";
        // }

        if (!values.last_name) {
            errors.last_name = "Input Required";
        }
        else if (values.last_name.length > 20) {
            errors.last_name = "Must be 20 characters or less";
        }
        else if (!isNaN(values.last_name)) {
            errors.last_name = "Must be String";
        }

        if (!values.user_type) {
            errors.user_type = "Select User Type Required";
        }

        if (!values.division) {
            errors.division = "Select a Division Required";
        }

        if (!values.district) {
            errors.district = "Select a District Required";
        }


        return errors;
    };

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            user_type: '',
            division: '',
            district: '',
        },
        validate,
        onSubmit: (values) => {
            fetch("https://60f2479f6d44f300177885e6.mockapi.io/users/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),    //object k stringify korey server side a send kore lagey tai JSON.stringify korey
            })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success("Employee Details Updated Successfully")
                        navigate('/details/' + id)
                    }
                    else {
                        toast.error("Cann't Update")
                    }
                    return res.json()
                })
                .then((data) => {
                    console.log("Success:", data);
                    //form ta k reset korbey
                })
        },
    });



    return (
        <div className='main-container'>
            <h4>Please fill-up the form with valid informations to update your details</h4>
            <div className='form-container'>
                <form className='form-style' onSubmit={formik.handleSubmit}>
                    <div style={{ paddingBottom: '10px' }}>
                        <label>First Name: </label>
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            placeholder="First Name"
                            /*two way binding data onChange event plus inputed value set */
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.first_name}
                            required
                        />
                        {formik.touched.first_name && formik.errors.first_name ? (
                            <p style={{ color: "red", fontWeight: '500', textAlign: 'center' }}>
                                {formik.errors.first_name}
                            </p>
                        ) : null}
                    </div>

                    <div style={{ paddingBottom: '10px' }}>
                        <label>Last Name: </label>
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            placeholder="Last Name"
                            /*two way binding data onChange event plus inputed value set */
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.last_name}
                            required
                        />
                        {formik.touched.last_name && formik.errors.last_name ? (
                            <p style={{ color: "red", fontWeight: '500', textAlign: 'center' }}>
                                {formik.errors.last_name}
                            </p>
                        ) : null}
                    </div>

                    <div className='selection-div'>
                        <select
                            label="User Type"
                            name="user_type"
                            value={formik.values.user_type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}>
                            <option value="">Select User Type</option>
                            <option value='employee'>employee</option>
                        </select>
                        {formik.touched.user_type && formik.errors.user_type ? (
                            <p style={{ color: "red", marginTop: '.25rem', fontWeight: '500' }}>
                                {formik.errors.user_type}
                            </p>
                        ) : null}
                    </div>

                    <div className='selection-div'>
                        <select
                            label="Division"
                            name="division"
                            value={formik.values.division}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}>
                            <option value="">Select Division</option>
                            {updatedStates.map((state) =>
                                state.isoCode === "A" || state.isoCode === "B"
                                    || state.isoCode === "C" || state.isoCode === "D"
                                    || state.isoCode === "E" || state.isoCode === "F"
                                    || state.isoCode === "G" || state.isoCode === "H" ?
                                    <option key={state.isoCode} value={state.name}>{state.name}</option> : null)}
                        </select>
                        {formik.touched.division && formik.errors.division ? (
                            <p style={{ color: "red", marginTop: '.25rem', fontWeight: '500' }}>
                                {formik.errors.division}
                            </p>
                        ) : null}
                    </div>

                    <div className='selection-div'>
                        <select
                            label="District"
                            name="district"
                            value={formik.values.district}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}>
                            <option value="">Select District</option>
                            {updatedStates.map((city) => (
                                <option key={city.latitude + city.longitude} value={city.name}>{city.name}</option>))}
                        </select>
                        {formik.touched.district && formik.errors.district ? (
                            <p style={{ color: "red", marginTop: '.25rem', fontWeight: '500' }}>
                                {formik.errors.district}
                            </p>
                        ) : null}
                    </div>

                    <button className='submit-btn' type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateDetails;