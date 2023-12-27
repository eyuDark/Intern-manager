import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const Intern = () => {

    const [intern, setIntern] = useState([]);


    useEffect(() => {
        axios
            .get("http://localhost:3000/auth/interns")
            .then((result) => {
                if (result.data.Status) {
                    setIntern(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);
    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/auth/delete_intern/' + id)
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
            <div className='mt-3'>
                <table className="table">
                    <thead>
                        <tr >
                            <th className='text-warning'>Name</th>
                            <th className='text-warning'>Email</th>
                            <th className='text-warning'>Address</th>
                            <th className='text-warning'>Salary</th>
                            <th className='text-warning'>Course Code</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {intern.map((e) => (
                            <tr>
                                <td className='text-info'> {e.name}</td>

                                <td className='text-info'>{e.email}</td>
                                <td className='text-info'>{e.address}</td>
                                <td className='text-info'>{e.salary} Birr</td>
                                <td className='text-info'>{e.course_id}</td>
                                <td>
                                    <Link
                                        to={`/dashboard/edit_intern/` + e.id}
                                        className="btn btn-info btn-sm me-2 text-light"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm text-light"
                                        onClick={() => handleDelete(e.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div><Link to="/dashboard/add_intern" className='btn btn-info btn-lg btn-block text-light'>Add Intern</Link></div>
        </div>
    )
}

export default Intern;

