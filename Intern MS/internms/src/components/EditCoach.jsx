import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EditCoach = () => {
    const { id } = useParams()
    const [coach, setCoach] = useState({
        name: "",
        email: "",
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

        axios.get('http://localhost:3000/auth/manage_coach/' + id)
            .then(result => {
                setCoach({
                    ...coach,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    course_id: result.data.Result[0].course_id,
                })
            }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_coach/' + id, coach)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/manage_coach')
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Edit Coach</h3>
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
                            value={coach.name}
                            onChange={(e) =>
                                setCoach({ ...coach, name: e.target.value })
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
                            value={coach.email}
                            onChange={(e) =>
                                setCoach({ ...coach, email: e.target.value })
                            }
                        />
                    </div>


                    <div className="col-12">
                        <label for="course" className="form-label">
                            Course
                        </label>
                        <select name="course" id="course" className="form-select"
                            onChange={(e) => setCoach({ ...coach, course_id: e.target.value })}>

                            {course.map((c) => {
                                return <option value={c.id}>{c.name}</option>;
                            })}
                        </select>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Edit Coach
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default EditCoach