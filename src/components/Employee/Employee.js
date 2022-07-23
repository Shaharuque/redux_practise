import React, { useEffect, useState } from 'react';
import SingleEmployee from './SingleEmployee/SingleEmployee';
import './employee.css'

const Employee = ({ employees,pageCount,setPage,page }) => {
    
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
                {
                    [...Array(pageCount).keys()].map(number => 
                        <button className={page === number ? 'selected' : ''}
                        onClick={() => setPage(number+1)}>{number + 1}
                    </button>)
                }
            </div>
        </div>
    );
};

export default Employee;