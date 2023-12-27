import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const InternDashboard = () => {
    const [intern, setIntern] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/intern/details/' + id)
            .then(result => {
                setIntern(result.data[0])
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div>

            <div className=' '>



                <div className='p-3 d-flex justify-content-around mt-3 ' >
                    <div className='px-3 pt-2 pb-3 border border-info w-25'>
                        <div className='text-center pb-1 text-warning'>
                            <h4>Hello {intern.name} </h4>
                        </div>
                        <hr />
                        <div className='text-center  pb-1 text-info '>
                            <h6>Your current salary is {intern.salary}Birr</h6>
                            <h6>You are currently assigned to a course with a course code :{intern.course_id}</h6>
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

export default InternDashboard