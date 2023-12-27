import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios';







const CoachDashboard = () => {
    const [coach, setCoach] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get('http://localhost:3000/coach/details/' + id)
            .then(result => {
                setCoach(result.data[0])
            })
            .catch(err => console.log(err))
    }, [])
    const navigate = useNavigate()
    const handleLogout = () => {
        axios.get('http://localhost:3000/coach/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid")
                    navigate('/')
                }
            }).catch(err => console.log(err))
    }


    return (
        <div>

            <div className=' '>



                <div className='p-3 d-flex justify-content-around mt-3 ' >
                    <div className='px-3 pt-2 pb-3 border border-info w-25'>
                        <div className='text-center pb-1 text-warning'>
                            <h4>Hello {coach.name} </h4>
                        </div>
                        <hr />
                        <div className='text-center  pb-1 text-info '>
                            <h6>You are assisting interns with course code :{coach.course_id}</h6>

                        </div>
                    </div>
                    <div className='px-3 pt-2 pb-3 border border-info w-25 '>
                        <div className='text-center pb-1 text-warning'>
                            <h4>Courses and coursecodes</h4>

                        </div>
                        <hr />
                        <div className='text-center pb-1  text-info'>
                            <h6>Networking (3)</h6>
                            <h6>Web Designing (6)</h6>
                            <h6>Software (9)</h6>
                            <h6>System (10)</h6>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CoachDashboard