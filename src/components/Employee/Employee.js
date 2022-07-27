import React, { useEffect, useState } from 'react';
import SingleEmployee from './SingleEmployee/SingleEmployee';
import './employee.css'
import ReactPaginate from 'react-paginate';

const Employee = ({ employees, pageCount, setPage}) => {

    const handlePageClick=({selected:selectedPage})=>{
        console.log('selected page', selectedPage)
        setPage(selectedPage+1)
    }

    // const [employees,setEmployee]=useState([])
    // useEffect(()=>{
    //     fetch('https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=employee')
    //     .then(res=>res.json())
    //     .then(data=>setEmployee(data))
    // },[])

    return (
        <div className='employee-style'>
            <h2 style={{ color: 'teal', marginBottom: '10px' }}>Employee list</h2>
            <ul>
                {
                    employees?.map(employee => <SingleEmployee employee={employee} key={employee.id}></SingleEmployee>)
                }
            </ul>

            <div className='pagination'>
                <ReactPaginate
                    previousLabel={"< Previous"}
                    nextLabel={"Next >"}
                    pageCount={pageCount}
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

export default Employee;