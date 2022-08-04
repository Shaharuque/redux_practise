import React, { useEffect, useState } from 'react';
import SingleEmployee from './SingleEmployee/SingleEmployee';
import './employee.css'
import Pagination from '../Pagination/Pagination';


const Employee = ({ employees, pageCount, setPage}) => {

    
    return (
        <div className='employee-style'>
            <h2 style={{ color: 'teal', marginBottom: '10px' }}>Employee list</h2>
            <ul>
                {
                    employees?.map(employee => <SingleEmployee employee={employee} key={employee.id}></SingleEmployee>)
                }
            </ul>
            <Pagination pageCount={pageCount} setPage={setPage}></Pagination>
        </div>
    );
};

export default Employee;