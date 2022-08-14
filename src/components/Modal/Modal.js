import React from 'react';
import './modal.css'
import { toast } from 'react-toastify';
import { City, State } from 'country-state-city';
import { useFormik } from 'formik';
//for redux-thunk
import { getAdmins, getEmployees } from "../../features/members/memberSlice";
import { useDispatch, useSelector } from "react-redux";
import Form from '../Form/Form';


const Modal = ({ setOpenModal, page, setPageCount, page_ad, setPageCount_ad,employees }) => {
    
    const modalHandler = () => {
        setOpenModal(false);
    }


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
                {/*Form component called */}
                <Form employees={employees} page={page} setPageCount={setPageCount} page_ad={page_ad} setPageCount_ad={setPageCount_ad} id={null}></Form>
            </div>
        </div>
    );
};

export default Modal;