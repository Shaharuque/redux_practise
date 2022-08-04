import React, { useEffect, useState } from 'react';
import SingleAdmin from './SingleAdmin/SingleAdmin';
import './admin.css'
import ReactPaginate from 'react-paginate';
import Pagination from '../Pagination/Pagination';

const Admin = ({admins,pageCount_ad,setPage_ad}) => {



    // const [admins, setAdmins] = useState([])
    // useEffect(() => {
    //     fetch('https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=admin')
    //         .then(res => res.json())
    //         .then(data => setAdmins(data))
    // }, [])
    // console.log(admins)
    return (
        <div className='admin-style'>
            <h2 style={{color:'teal',marginBottom:'10px'}}>Admin List</h2>
            <ul>
                {
                    admins?.map(admin=><SingleAdmin admin={admin} key={admin.id}></SingleAdmin>)
                }
            </ul>
            {/*Pagination component is called */}
            <Pagination pageCount={pageCount_ad} setPage={setPage_ad}></Pagination>
        </div>
    );
};

export default Admin;