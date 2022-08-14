import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { State } from 'country-state-city';
import { useFormik } from 'formik';
//for redux-thunk
import { getAdmins, getDetails, getEmployees } from "../../features/members/memberSlice";

import { useDispatch, useSelector } from "react-redux";
import './form.css'
import { useNavigate } from 'react-router-dom';
import { mergedList } from '../../features/members/addSlice';

const Form = ({
    page,
    setPageCount,
    page_ad,
    setPageCount_ad,
    id, first_name,
    last_name,
    district,
    division,
    user_type }) => {
    //console.log(id)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let updatedStates = State.getStatesOfCountry('BD');
    //new person data add to old data
    const localData = localStorage.getItem('data')
    const final = [JSON.parse(localData)]

    const result_employee = useSelector(state => state.employeeData)
    const employees = result_employee.employees
    //console.log(employees)  //employee data of particular page from where modal component is called 

    // const merged=[...employees,...final]
    // useEffect(() => {
    //     dispatch(getEmployees(page))
    //     dispatch(mergedList(merged))
    // }, [page]);

    // const merged=([...employees,...final])
    // console.log(merged)

    //particular id employee
    const employee = useSelector(state => state.detailsData)
    const employee_division = employee?.details?.division
    console.log(employee_division)

    useEffect(() => {
        dispatch(getDetails(id))
    }, [])

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
            first_name: first_name,
            last_name: last_name,
            user_type: user_type,
            division: division,
            district: district,
        },
        validate,
        onSubmit: (values , { resetForm }) => {
            //user details update corresponding id wise
            console.log(values)
            
            // formikApi.resetForm({values:{...values, first_name:""}})
            if (id) {
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
            }
            else {
                fetch("https://60f2479f6d44f300177885e6.mockapi.io/users/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),    //object k stringify korey server side a send kore lagey tai JSON.stringify korey
                })
                    .then((res) => {
                        //console.log(res)
                        if (res.status === 201) {
                            toast.success("New User Added Successfully")
                        }
                        else {
                            toast.error("Cann't perform the action")
                        }
                        return res.json()
                    })
                    .then((data) => {
                        //console.log("Success:", data);
                        //data refetching from API
                        if (data.user_type === 'employee') {
                            //dispatching action(refetching data)
                            dispatch(getEmployees(page)) //data refetching from API off 

                            //newly added person data is set to local storage
                            //localStorage.setItem('data', JSON.stringify(values))

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
                            dispatch(getAdmins(page_ad))

                            ////New page without reloading rendering ar jnno data refetch
                            fetch('https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=admin')
                                .then(res => res.json())
                                .then(data => {
                                    const count = data?.length   //db ar collection a jotogula product tar count pabo
                                    const pages = Math.ceil(count / 5)
                                    setPageCount_ad(pages)
                                })
                        }
                        //form reset korbe
                        resetForm({ values: { first_name: "", last_name: "", user_type: "", division: "", district: "" } })

                    })
            }
        },
    });
    return (
        <div >
            <form id="create-course-form" className='form-style' onSubmit={formik.handleSubmit}>
                <div style={{ paddingBottom: '10px' }}>
                    <div style={{ marginBottom: '7px' }}>
                        <label>First-Name: </label>
                    </div>
                    {
                        !id ?
                            <div>
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
                            :
                            <div>
                                <input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    placeholder="First Name"
                                    /*two way binding data onChange event plus inputed value set */
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.first_name}
                                    defaultValue={first_name}
                                    required
                                />
                                {formik.touched.first_name && formik.errors.first_name ? (
                                    <p style={{ color: "#e91640", marginTop: "0", fontWeight: '500' }}>
                                        {formik.errors.first_name}
                                    </p>
                                ) : null}
                            </div>
                    }
                </div>

                <div style={{ paddingBottom: '10px' }}>
                    <div style={{ marginBottom: '7px' }}>
                        <label>Last-Name: </label>
                    </div>
                    {
                        !id ?
                            <div>
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
                            :
                            <div>
                                <input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    placeholder="Last Name"
                                    /*two way binding data onChange event plus inputed value set */
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.last_name}
                                    defaultValue={last_name}
                                    required
                                />
                                {formik.touched.last_name && formik.errors.last_name ? (
                                    <p style={{ color: "#e91640", margin: "0px", fontWeight: '500' }}>
                                        {formik.errors.last_name}
                                    </p>
                                ) : null}
                            </div>
                    }
                </div>

                <div className='selection-div'>
                    <div style={{ marginBottom: '7px' }}>
                        <label>Select Type: </label>
                    </div>
                    <select
                        label="User Type"
                        name="user_type"
                        value={formik.values.user_type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        {
                            !id ?
                                <>  <option value="">Select</option>
                                    <option value='employee'>employee</option>
                                    <option value='admin'>admin</option>
                                </>
                                :
                                <>
                                    <option value='employee'>employee</option>
                                </>

                        }
                    </select>
                    {formik.touched.user_type && formik.errors.user_type ? (
                        <p style={{ color: "#e91640", marginTop: '.25rem', fontWeight: '500' }}>
                            {formik.errors.user_type}
                        </p>
                    ) : null}
                </div>

                <div className='selection-div'>
                    <div style={{ marginBottom: '7px' }}>
                        <label>Division: </label>
                    </div>
                    {
                        !id ?
                            <div>
                                <select
                                    label="Division"
                                    name="division"
                                    value={formik.values.division}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}>

                                    <option value=''>Select One</option>
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
                            :
                            <div>
                                <select
                                    label="Division"
                                    name="division"
                                    value={formik.values.division}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}>
                                    defaultValue={division}

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
                    }
                </div>

                <div className='selection-div'>
                    <div style={{ marginBottom: '7px' }}>
                        <label>District: </label>
                    </div>
                    {
                        !id ?
                            <div>
                                <select
                                    label="District"
                                    name="district"
                                    value={formik.values.district}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value=''>Select One</option>
                                    {updatedStates.map((city) => (
                                        <option key={city.latitude + city.longitude} value={city.name}>{city.name}</option>))}
                                </select>
                                {formik.touched.district && formik.errors.district ? (
                                    <p style={{ color: "#e91640", marginTop: '.25rem', fontWeight: '500' }}>
                                        {formik.errors.district}
                                    </p>
                                ) : null}
                            </div>
                            :
                            <div>
                                <select
                                    label="District"
                                    name="district"
                                    value={formik.values.district}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    defaultValue={district}>
                                    {updatedStates.map((city) => (
                                        <option key={city.latitude + city.longitude} value={city.name}>{city.name}</option>))}
                                </select>
                                {formik.touched.district && formik.errors.district ? (
                                    <p style={{ color: "#e91640", marginTop: '.25rem', fontWeight: '500' }}>
                                        {formik.errors.district}
                                    </p>
                                ) : null}
                            </div>
                    }
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <button className='submit-btn' type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Form;