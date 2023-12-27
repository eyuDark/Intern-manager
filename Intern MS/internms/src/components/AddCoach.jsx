
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';





const AddCoach = () => {

    const navigate = useNavigate()
    const [coach, setCoach] = useState({
        name: "",
        email: "",
        password: "",
        course_id: "",

    });

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
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_coach', coach)
            .then(result => {

                if (result.data.Status) {
                    navigate('/dashboard/manage_coach')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Add Coach</h3>
                <form className="row g-1" onSubmit={handleSubmit} >
                    <div className="col-12">
                        <label for="inputName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            placeholder="Enter Name"
                            onChange={(e) => setCoach({ ...coach, name: e.target.value })}
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
                            onChange={(e) => setCoach({ ...coach, email: e.target.value })}
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputPassword4" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control rounded-0"
                            id="inputPassword4"
                            placeholder="Enter Password"
                            onChange={(e) => setCoach({ ...coach, password: e.target.value })}
                        />
                    </div>

                    <div className="col-12">
                        <label for="course" className="form-label">
                            course
                        </label>
                        <select name="course" id="course" className="form-select"
                            onChange={(e) => setCoach({ ...coach, course_id: e.target.value })}>
                            <option value="">Select course</option>
                            {course.map(c => {
                                return <option value={c.id}>{c.name}</option>
                            })}

                        </select>
                    </div>


                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Add Coach
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCoach;