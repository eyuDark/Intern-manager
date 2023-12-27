import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


const AddTask = () => {

    const { id } = useParams()
    const [task, setTask] = useState({
        task_name: "",
        task_desc: "",
        deadline: "",
        intern_id: ""
    });
    const [intern, setIntern] = useState([])

    useEffect(() => {

        axios.get('http://localhost:3000/coach/interns/' + id)
            .then(result => {
                if (result.data.Status) {
                    setIntern(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/coach/add_task', task)
            .then(response => {
                if (response.data.Status) {
                    alert("Task added successfully");
                    // Optionally, reset the form or perform other actions upon successful task addition
                } else {
                    alert(response.data.Error);
                }
            })
            .catch(error => console.error(error));
    };
    return (
        <div className='d-flex justify-content-center align-items-center h-75 '>
            <div className='p-3 rounded w-25 border '>

                <h3 className='text-warning'>Add Task</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label><strong>Task Name:</strong></Form.Label>
                        <Form.Control type="text" name='task' placeholder='Enter task name' className='form-control rounded-0'
                            onChange={(e) => setTask({ ...task, task_name: e.target.value })}
                        />
                    </Form.Group>

                    {/* <Form.Group className="mb-3">
                        <Form.Label><strong>Intern ID:</strong></Form.Label>
                        <Form.Select
                            name='internId'
                            className='form-control rounded-0'
                            onChange={(e) => setTask({ ...task, intern_id: e.target.value })}
                        >
                            <option value="">Select intern</option>
                            {intern.map(i => {
                                return <option key={i.id} value={i.id}>{i.id}</option>; // Display intern IDs
                            })}
                        </Form.Select>
                    </Form.Group> */}



                    <Form.Group className="mb-3">
                        <Form.Label><strong>Intern Name:</strong></Form.Label>
                        <Form.Select name='internName' className='form-control rounded-0'
                            onChange={(e) => setTask({ ...task, intern_id: e.target.value })}
                        >
                            <option value="">Select intern</option>
                            {intern.map(i => {
                                return <option value={i.id}>{i.name}</option>
                            })}

                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label><strong>Task description:</strong></Form.Label>
                        <Form.Control as="textarea" name='Course' placeholder='Enter task description' className='form-control rounded-0' style={{ height: '100px' }}
                            onChange={(e) => setTask({ ...task, task_desc: e.target.value })}

                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label><strong>Deadline:</strong></Form.Label>
                        <Form.Control type="date" className='form-control rounded-0'
                            onChange={(e) => setTask({ ...task, deadline: e.target.value })}

                        />
                    </Form.Group>

                    <Button variant="success" type="submit" className='w-100 rounded-0'>
                        Add Task
                    </Button>
                </Form>

            </div>
        </div>
    )
}

export default AddTask