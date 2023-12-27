import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManageCoach = () => {
    const [coach, setCoach] = useState([]);


    useEffect(() => {
        axios
            .get("http://localhost:3000/auth/manage_coach")
            .then((result) => {
                if (result.data.Status) {
                    setCoach(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);
    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/auth/delete_coach/' + id)
            .then(result => {
                if (result.data.Status) {
                    window.location.reload()
                } else {
                    alert(result.data.Error)
                }
            })
    }

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>

            </div>

            <div className='mt-3'>
                <table className="table">
                    <thead>
                        <tr>
                            <th className='text-warning'>Name</th>
                            <th className='text-warning'>Email</th>
                            <th className='text-warning'>Course</th>

                        </tr>
                    </thead>
                    <tbody>
                        {coach.map((c) => (
                            <tr>
                                <td className='text-info'>{c.name}</td>
                                <td className='text-info'>{c.email}</td>
                                <td className='text-info'>{c.course_id}</td>

                                <td>
                                    <Link
                                        to={`/dashboard/edit_coach/` + c.id}
                                        className="btn btn-info btn-sm me-2 text-light"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm text-light"
                                        onClick={() => handleDelete(c.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to="/dashboard/add_coach" className='btn btn-info btn-lg btn-block text-light'>Add Coach</Link>
        </div>
    )
}

export default ManageCoach