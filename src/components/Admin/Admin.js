import React, { useEffect, useState } from 'react';
import SingleAdmin from './SingleAdmin/SingleAdmin';
import './admin.css'
import ReactPaginate from 'react-paginate';

const Admin = ({admins,pageCount_ad,setPage_ad}) => {

    const handlePageClick=({selected:selectedPage})=>{
        console.log('selected page', selectedPage)
        setPage_ad(selectedPage+1)
    }

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
            <ReactPaginate
                    previousLabel={"< Previous"}
                    nextLabel={"Next >"}
                    pageCount={pageCount_ad}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    previousLinkClassName={"pagination_Link"}
                    nextLinkClassName={"pagination_Link"}
                    activeClassName={"pagination_Link-active"}
                    disabledClassName={"pagination_Link-disabled"}
                >
            </ReactPaginate>
        </div>
        </div>
    );
};

export default Admin;