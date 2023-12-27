


import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios';
import logo from '../assets/irack-LOGO-1.png'





const InternDetail = () => {
    const [intern, setIntern] = useState([])
    let { id } = useParams();
    const navigate = useNavigate()
    const handleLogout = () => {
        axios.get('http://localhost:3000/intern/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid")
                    navigate('/')
                }
            }).catch(err => console.log(err))
    }


    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark ">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link
                            to={"/intern_details/intern_dashboard/" + id}
                            className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
                        >

                            <img src={logo} alt="Logo" width="117" height="53" />

                        </Link>
                        <ul
                            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu"
                        >
                            <li className="w-100">
                                <Link
                                    to={"/intern_details/intern_dashboard/" + id}
                                    className="nav-link text-info px-0 align-middle"
                                >
                                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline ">Dashboard</span>
                                </Link>
                            </li>

                            <li className="w-100">
                                <Link
                                    to={"/intern_details/intern_tasks/" + id}
                                    className="nav-link px-0 align-middle text-info"
                                >
                                    <i className="fs-4 bi bi-list-task ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">
                                        Tasks
                                    </span>
                                </Link>
                            </li>
                            {/* <li className="w-100">
                                <Link
                                    to={"/intern_details/attendance/" + id}
                                    className="nav-link px-0 align-middle text-info"
                                >
                                    <i className="fs-4  bi-person-check ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Attendance</span>
                                </Link>
                            </li> */}


                            <li className="w-100" onClick={handleLogout} >
                                <Link
                                    className="nav-link px-0 align-middle text-info"
                                >
                                    <i className="fs-4 bi-power ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <div className="p-2 d-flex justify-content-center text-success shadow">
                        <h4>Intern Management System</h4>
                    </div>
                    <Outlet />

                </div>
            </div>
        </div>
    )
}

export default InternDetail