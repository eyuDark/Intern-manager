import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EditIntern = () => {
    const { id } = useParams()
    const [intern, setIntern] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        course_id: "",
    });
    const [course, setCourse] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/auth/courses')
            .then(result => {
                if (result.data.Status) {
                    setCourse(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))

        axios.get('http://localhost:3000/auth/interns/' + id)
            .then(result => {
                setIntern({
                    ...intern,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    address: result.data.Result[0].address,
                    salary: result.data.Result[0].salary,
                    course_id: result.data.Result[0].course_id,
                })
            }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_intern/' + id, intern)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/interns')
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Edit Intern</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label for="inputName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            placeholder="Enter Name"
                            value={intern.name}
                            onChange={(e) =>
                                setIntern({ ...intern, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            autoComplete="off"
                            value={intern.email}
                            onChange={(e) =>
                                setIntern({ ...intern, email: e.target.value })
                            }
                        />
                    </div>
                    <div className='col-12'>
                        <label for="inputSalary" className="form-label">
                            Salary
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            autoComplete="off"
                            value={intern.salary}
                            onChange={(e) =>
                                setIntern({ ...intern, salary: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            autoComplete="off"
                            value={intern.address}
                            onChange={(e) =>
                                setIntern({ ...intern, address: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="course" className="form-label">
                            Course
                        </label>
                        <select name="course" id="course" className="form-select"
                            onChange={(e) => setIntern({ ...intern, course_id: e.target.value })}>

                            {course.map((c) => {
                                return <option value={c.id}>{c.name}</option>;
                            })}
                        </select>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Edit Intern
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default EditIntern