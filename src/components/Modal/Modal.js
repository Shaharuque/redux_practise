import React from 'react';
import './modal.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Employee from '../Employee/Employee';
import { City, State } from 'country-state-city';
import { useFormik } from 'formik';

const Modal = ({ setOpenModal, setEmployee, setAdmins, page, setPageCount, page_ad, setPageCount_ad }) => {

    const navigate = useNavigate()
    const modalHandler = () => {
        setOpenModal(false);
        navigate('/')
    }

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
            fetch("https://60f2479f6d44f300177885e6.mockapi.io/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),    //object k stringify korey server side a send kore lagey tai JSON.stringify korey
            })
                .then((res) => {
                    console.log(res)
                    if (res.status === 201) {
                        toast.success("New User Added Successfully")
                    }
                    else {
                        toast.error("Cann't perform the action")
                    }
                    return res.json()
                })
                .then((data) => {
                    console.log("Success:", data);
                    //data refetching
                    if (data.user_type === 'employee') {
                        fetch(`https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=employee&page=${page}&limit=5`)
                            .then(res => res.json())
                            .then(data => setEmployee(data))

                        //New page without reloading rendering ar jnno data refetch
                        fetch('https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=employee')
                            .then(res => res.json())
                            .then(data => {
                                const count = data?.length   //db ar collection a jotogula product tar count pabo
                                const pages = Math.ceil(count / 5)
                                setPageCount(pages)
                            })
                    }
                    else {
                        fetch(`https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=admin&page=${page_ad}&limit=5`)
                            .then(res => res.json())
                            .then(data => setAdmins(data))

                        ////New page without reloading rendering ar jnno data refetch
                        fetch('https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=admin')
                            .then(res => res.json())
                            .then(data => {
                                const count = data?.length   //db ar collection a jotogula product tar count pabo
                                const pages = Math.ceil(count / 5)
                                setPageCount_ad(pages)
                            })
                    }

                })
        },
    });

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button style={{ borderRadius: '5px', backgroundColor: 'rgb(245,199,26)', color: 'white', padding: '5px' }}
                        onClick={modalHandler}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h3>Put Information's to add new user</h3>
                </div>
                <div className="body">
                    <form className='form-style' onSubmit={formik.handleSubmit}>
                        <div style={{ paddingBottom: '10px' }}>
                            <label>First-Name: </label>
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
                                <p style={{ color: "#e91640", marginTop: "0", fontWeight: '500' }}>
                                    {formik.errors.first_name}
                                </p>
                            ) : null}
                        </div>

                        <div style={{ paddingBottom: '10px' }}>
                            <label>Last-Name: </label>
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
                                <p style={{ color: "#e91640", margin: "0px", fontWeight: '500' }}>
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
                                <option value='admin'>admin</option>
                            </select>
                            {formik.touched.user_type && formik.errors.user_type ? (
                                <p style={{ color: "#e91640", marginTop: '.25rem', fontWeight: '500' }}>
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
                                <p style={{ color: "#e91640", marginTop: '.25rem', fontWeight: '500' }}>
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
                                <p style={{ color: "#e91640", marginTop: '.25rem', fontWeight: '500' }}>
                                    {formik.errors.district}
                                </p>
                            ) : null}
                        </div>
                        <button className='submit-btn' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;