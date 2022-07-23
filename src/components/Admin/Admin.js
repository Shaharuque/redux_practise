import React, { useEffect, useState } from 'react';
import SingleAdmin from './SingleAdmin/SingleAdmin';
import './admin.css'

const Admin = ({admins,pageCount_ad,setPage_ad,page_ad}) => {
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
            <div className='pagination'>
            {
                [...Array(pageCount_ad).keys()].map(number => 
                    <button className={page_ad === number ? 'selected' : ''}
                    onClick={() => setPage_ad(number+1)}>{number + 1}
                </button>)
            }
        </div>
        </div>
    );
};

export default Admin;