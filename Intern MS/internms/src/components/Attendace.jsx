import axios from 'axios'
import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Attendance = () => {

    // const [course, setCourse] = useState([])

    // useEffect(() => {

    //     axios.get('http://localhost:3000/auth/courses')
    //         .then(result => {
    //             if (result.data.Status) {
    //                 setCourse(result.data.Result);
    //             } else {
    //                 alert(result.data.Error);
    //             }
    //         }).catch(err => console.log(err))
    // }, [])
    return (
        <div className='px-5 mt-3'>


            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='text-warning'>DATE</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {
                            course.map(c => (
                                <tr>
                                    <td className='text-info'>{c.name}</td>
                                </tr>
                            ))
                        }
                    </tbody> */}
                </table>


            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '250px' }}>
                <button className='text-light btn btn-success'>Sign Attendance</button>

            </div>
        </div>

    )
}

export default Attendance