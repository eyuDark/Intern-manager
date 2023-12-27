import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Courses = () => {

    const [course, setCourse] = useState([])

    useEffect(() => {

        axios.get('http://localhost:3000/auth/courses')
            .then(result => {
                if (result.data.Status) {
                    setCourse(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err))
    }, [])
    return (
        <div className='px-5 mt-3'>


            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='text-warning'>Course Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            course.map(c => (
                                <tr>
                                    <td className='text-info'>{c.name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Link to="/dashboard/add_course" className='btn btn-info btn-lg btn-block text-light'>Add Course </Link>

            </div>
        </div>
    )
}

export default Courses