//Custom Tab component
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Admin from "../Admin/Admin";
import Employee from "../Employee/Employee";
import { getAdmins, getEmployees } from "../../features/members/memberSlice";
import Modal from "../Modal/Modal";
import Spinner from '../Spinner/Spinner'
import "./tabs.css";
import { useDispatch, useSelector } from "react-redux";


function Tabs() {
    const [toggleState, setToggleState] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    //for employee pagination
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(1)
    //for admin pagination
    const [pageCount_ad, setPageCount_ad] = useState(0)
    const [page_ad, setPage_ad] = useState(1)
    //for spinner
    const [loading, setLoading] = useState(false)
    const [merged,setMerged]=useState([])
    //redux-toolkit
    const dispatch = useDispatch()
    
    //useSelector use korey [adminData reducer] extract kora hocchey to get admins data from api
    const result_admin = useSelector((state) => state.adminData);
    const admins = result_admin.admins;
    //useSelector use korey [employeeData reducer] extract kora hocchey to get employees data from api
    const result_employee = useSelector(state => state.employeeData)
    const employees = result_employee.employees

    // useEffect(()=>{
    //     setMerged(employees)
    // },[merged])
    
    //console.log(result_employee)
   
    // const localData=localStorage.getItem('data')
    // const final=[JSON.parse(localData)]

    // const merged=([...final,...employees])

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

    //dispatch getAdmins(slice thekey) async action  
    useEffect(() => {
        dispatch(getAdmins(page_ad))

        dispatch(getEmployees(page))
    }, [page_ad, page]);



    //for toggling
    const toggleTab = (index) => {
        setToggleState(index);
    };

    //console.log(employees.length)
    return (
        <div style={{ padding: '10px' }}>
            {/*Fro SEO purpose */}
            <Helmet>
                <meta charSet="utf-8" />
                <title>Employee And Admin List</title>
                <meta property="og:description" content="List of employees and admins shows" />
                <meta property="og:image" content="https://cdni.autocarindia.com/utils/imageresizer.ashx?n=http://cms.haymarketindia.net/model/uploads/modelimages/AMG%20GTModelImage.jpg" />
            </Helmet>
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
                    {<div
                        className={toggleState === 1 ? "content  active-content" : "content"}
                    >
                        <Admin admins={admins} pageCount_ad={pageCount_ad} page_ad={page_ad} setPage_ad={setPage_ad}></Admin>
                    </div>}

                    {<div className={toggleState === 2 ? "content  active-content" : "content"}>
                        <Employee employees={employees} pageCount={pageCount} page={page} setPage={setPage}></Employee>
                    </div>}
                </div>
            </div>
            <button onClick={() => { setModalOpen(true) }} className="add-user">ADD NEW USER</button>
            {modalOpen &&
                <Modal
                    setOpenModal={setModalOpen}
                    page={page}
                    page_ad={page_ad}
                    setPageCount={setPageCount}
                    setPageCount_ad={setPageCount_ad} 
                    employees={employees}/>
            } 
        </div>
    );
}

export default Tabs;

