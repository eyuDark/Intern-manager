import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Status = () => {
    const { id } = useParams()
    const [intern, setIntern] = useState([])
    const [tasks, setTasks] = useState([]);

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return dateString; // Return original string if date is invalid
        }

        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();

        // Pad single-digit month or day with a leading zero
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        const formattedDay = day < 10 ? `0${day}` : `${day}`;

        return `${formattedMonth}/${formattedDay}/${year}`;
    };
    const handleStatusCheck = async (event) => {
        event.preventDefault();
        // Get the selected intern's ID from the form
        const selectedInternId = document.querySelector('select[name="internName"]').value;

        // Make a request to your backend to fetch the intern's status and tasks
        const response = await axios.get(`http://localhost:3000/coach/status/${selectedInternId}`);

        // Update the tasks state with the fetched data
        setTasks(response.data.Result);
    };

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center align-items-center h-105 flex-column'>
                <div className='p-3 rounded w-25 border mb-3'>
                    <h3 className='text-warning mb-4'>Check Status</h3>
                    <Form >
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Intern Name:</strong></Form.Label>
                            <Form.Select name='internName' className='form-control rounded-0'

                            >
                                <option value="">Select intern</option>
                                {intern.map(i => {
                                    return <option value={i.id}>{i.name}</option>
                                })}

                            </Form.Select>
                        </Form.Group>

                        <Button variant="success" type="submit" className='w-100 rounded-0' onClick={(event) => handleStatusCheck(event)}>
                            check the status
                        </Button>

                    </Form>
                </div>
            </div>
            <div className='mt-3'>
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th className='text-warning'>Task id</th> */}
                            <th className='text-warning'>Task Name</th>
                            <th className='text-warning'>Status</th>
                            <th className='text-warning'>Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((e, index) => (
                            <tr key={index}>
                                {/* <td className='text-info'>{e.task_id}</td> */}
                                <td className='text-info'>{e.task_name}</td>

                                <td className='text-info'>{e.progress}</td>
                                <td className='text-info'>{formatDate(e.deadline)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <div className='mt-3'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Task Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td>{task.task_name}</td>
                                <td>{task.progress}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </div>

    )
}

export default Status
