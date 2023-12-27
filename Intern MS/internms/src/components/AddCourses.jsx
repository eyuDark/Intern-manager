import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddCourses = () => {
    const [Course, setCourse] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3000/auth/add_course', { Course })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/courses')

                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
    return (

        <div className='d-flex justify-content-center align-items-center h-75 '>
            <div className='p-3 rounded w-25 border '>

                <h2>Add Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='Course'><strong>Course:</strong></label>
                        <input type='text' name='Course' placeholder='Enter Course name'
                            onChange={(e) => setCourse(e.target.value)} className='form-control rounded-0' />
                    </div>

                    <button className='btn btn-success w-100 rounded-0'>Add Course</button>
                </form>
            </div>
        </div>

    )
}

export default AddCourses