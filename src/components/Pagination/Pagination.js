import React from 'react';
import ReactPaginate from 'react-paginate';
import './pagination.css'

const Pagination = ({pageCount,setPage}) => {
    const handlePageClick=({selected:selectedPage})=>{
        console.log('selected page', selectedPage)
        setPage(selectedPage+1)
    }

    return (
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
    );
};

export default Pagination;