import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios';
import logo from '../assets/irack-LOGO-1.png'




const Dashboard = () => {
    const anvigate = useNavigate()
    axios.defaults.withCredentials = true
    const handleLogout = () => {
        axios.get('http://localhost:3000/auth/logout')
            .then(result => {
                if (result.data.Status) {

                    localStorage.removeItem("valid")
                    anvigate('/')
                }
            })
    }
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark text-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link
                            to="/dashboard"
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
                                    to="/dashboard"
                                    className="nav-link text-info px-0 align-middle"
                                >
                                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/dashboard/manage_coach"
                                    className="nav-link px-0 align-middle text-info"
                                >
                                    <i className="fs-4 bi-person-circle ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">
                                        Manage Coach
                                    </span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/dashboard/interns"
                                    className="nav-link px-0 align-middle text-info"
                                >
                                    <i className="fs-4 bi-people ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">
                                        Manage Interns
                                    </span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/dashboard/Courses"
                                    className="nav-link px-0 align-middle text-info"
                                >
                                    <i className="fs-4 bi-journals ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Courses</span>
                                </Link>
                            </li>
                            {/* <li className="w-100">
                                <Link
                                    to="/dashboard/Courses"
                                    className="nav-link px-0 align-middle text-info"
                                >
                                    <i className="fs-4 bi-person-check ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Attendance Record</span>
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
                    <div className="p-2 d-flex justify-content-center shadow text-success">
                        <h4>Intern Management System</h4>
                    </div>
                    <Outlet />

                </div>
            </div>
        </div>
    );
};

export default Dashboard