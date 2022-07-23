//Custom Tab component
import { useEffect, useState } from "react";
import Admin from "./Admin/Admin";
import Employee from "./Employee/Employee";
import Modal from "./Modal/Modal";
import Spinner from "./Spinner/Spinner";
import "./tabs.css"

function Tabs() {
    const [toggleState, setToggleState] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [employees, setEmployee] = useState([])
    const [admins, setAdmins] = useState([])
    //for employee pagination
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(1)
    //for admin pagination
    const [pageCount_ad, setPageCount_ad] = useState(0)
    const [page_ad, setPage_ad] = useState(1)
    //for spinner
    const [loading,setLoading]=useState(false)

    console.log(page_ad)
    //for employee pagination page count purpose
    useEffect(() => {
        fetch('https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=employee')
            .then(res => res.json())
            .then(data => {
                const count = data?.length   //db ar collection a jotogula product tar count pabo
                const pages = Math.ceil(count / 5)
                setPageCount(pages)
            })
    }, [])

    //for admin pagination page count purpose
    useEffect(() => {
        fetch('https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=admin')
            .then(res => res.json())
            .then(data => {
                const count = data?.length   //db ar collection a jotogula product tar count pabo
                const pages = Math.ceil(count / 5)
                setPageCount_ad(pages)
            })
    }, [])


    useEffect(() => {
        setLoading(true)
        fetch(`https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=employee&page=${page}&limit=5`)
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setEmployee(data)
            })
    }, [page])

    useEffect(() => {
        setLoading(true)
        fetch(`https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=admin&page=${page_ad}&limit=5`)
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setAdmins(data)
            })
    }, [page_ad])


    const toggleTab = (index) => {
        setToggleState(index);
    };

    //console.log(employees.length)
    return (
        <div style={{ padding: '10px' }}>
            <div className="container">
                <div className="bloc-tabs">
                    <button
                        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(1)}
                    >
                        ADMIN
                    </button>
                    <button
                        className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(2)}
                    >
                        EMPLOYEE
                    </button>

                </div>

                <div className="content-tabs">
                    <div
                        className={toggleState === 1 ? "content  active-content" : "content"}
                    >
                        {
                            loading ?
                            <Spinner></Spinner>
                            :
                            <Admin admins={admins} pageCount_ad={pageCount_ad} page_ad={page_ad} setPage_ad={setPage_ad}></Admin>
                        }
                    </div>

                    <div
                        className={toggleState === 2 ? "content  active-content" : "content"}
                    >
                        {
                            loading ?
                            <Spinner></Spinner>
                            :
                            <Employee employees={employees} pageCount={pageCount} page={page} setPage={setPage}></Employee>
                        }
                    </div>
                </div>
            </div>
            <button onClick={() => { setModalOpen(true) }} className="add-user">ADD NEW USER</button>
            {modalOpen &&
                <Modal
                    setOpenModal={setModalOpen}
                    setEmployee={setEmployee}
                    setAdmins={setAdmins}
                    page={page}
                    page_ad={page_ad} 
                    setPageCount={setPageCount}
                    setPageCount_ad={setPageCount_ad}/>
                }
        </div>
    );
}

export default Tabs;

