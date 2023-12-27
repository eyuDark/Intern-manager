import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/verify')
            .then(result => {
                if (result.data.Status) {
                    if (result.data.role == "admin") {
                        navigate('/dashboard')

                    } else {
                        navigate('/intern_details/' + result.data.id)
                    }
                } else {
                    navigate('/')
                }
            }).catch(err => console.log(err))
    }, [])

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
            <div className="p-3 rounded w-25 border loginForm">
                <h2 className="text-center text-info">Welcome</h2>
                <h5 className="text-center text-info">continue to login as</h5>
                <div className="d-flex justify-content-between mt-5 mb-2">

                    <button type="button" className="btn btn-danger" onClick={() => { navigate('/adminlogin') }}>
                        Admin
                    </button>
                    <button type="button" class="btn btn-warning text-light" onClick={() => { navigate('/coach_login') }}>Coach</button>
                    <button type="button" className="btn btn-primary" onClick={() => { navigate('/intern_login') }}>
                        Intern
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Start