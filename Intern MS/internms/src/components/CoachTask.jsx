import React, { useEffect, useState } from 'react'

import 'bootstrap-icons/font/bootstrap-icons.css'

import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const CoachTask = () => {
    const { id } = useParams()
    const [intern, setIntern] = useState([])


    useEffect(() => {
        axios
            .get("http://localhost:3000/coach/internlist/" + id)
            .then((result) => {
                if (result.data.Status) {
                    setIntern(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);


    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>

            </div>

            <div className='mt-3'>
                <table className="table">
                    <thead>
                        <tr>
                            <th className='text-warning'>Intern name</th>
                            <th className='text-warning'>id</th>


                        </tr>
                    </thead>
                    <tbody>
                        {intern.map((c) => (
                            <tr  >
                                <td className='text-info'> {c.name}</td>
                                <td className='text-info'>{c.id}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            {/* <Link to="/dashboard/add_coach" className='btn btn-info btn-lg btn-block text-light'>Add Coach</Link> */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '250px' }}>
                <Link to={"/coach_details/add_tasks/" + id} className='btn btn-info btn-lg text-light'>Add Task</Link>
                <Link to={"/coach_details/status/" + id} className='btn btn-info btn-lg text-light' style={{ marginLeft: '50px' }}>Task Status</Link>
            </div>
        </div>


    )
}

export default CoachTask