import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

// Your formatDate function here

const InternTask = () => {
    const [task, setTask] = useState([]);

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

    const handleStatusChange = async (internId, taskId) => { // Add taskId as a parameter
        try {
            // Send an HTTP request to your backend to update the task progress
            await axios.put(`http://localhost:3000/intern/tasks/${internId}`, { progress: 'Completed', task_id: taskId }); // Include taskId in the request body

            // After successfully updating the progress, you might want to update the task list displayed in the UI
            // You can either re-fetch the updated task list or update the local task state

            // For example, re-fetch the updated task list after changing the progress
            const updatedTasks = await axios.get(`http://localhost:3000/intern/intern_task/${internId}`); // Use internId here
            setTask(updatedTasks.data.Result);
        } catch (error) {
            console.error(error);
            // Handle error scenarios
            // For example, you can show an error message to the user
            alert('Failed to update task progress');
        }
    };

    const { id } = useParams()

    useEffect(() => {
        axios
            .get("http://localhost:3000/intern/intern_task/" + id)
            .then((result) => {
                if (result.data.Status) {
                    setTask(result.data.Result);
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
                            {/* <th className='text-warning'>Task id</th> */}
                            <th className='text-warning'>Task Name</th>
                            <th className='text-warning'>Task Details</th>
                            <th className='text-warning'>Deadline</th>
                            <th className='text-warning'>Status</th>
                            <th className='text-warning'>Actions</th> {/* New column for the button */}
                        </tr>
                    </thead>
                    <tbody>
                        {task.map((e, index) => (
                            <tr key={index}>
                                {/* <td className='text-info'>{e.task_id}</td> */}
                                <td className='text-info'>{e.task_name}</td>
                                <td className='text-info'>{e.task_desc}</td>
                                <td className='text-info'>{formatDate(e.deadline)}</td>
                                <td className='text-info'>{e.progress}</td>
                                <td>
                                    <button className='text-light btn btn-success' onClick={() => handleStatusChange(e.intern_id, e.task_id)}>Complete task</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default InternTask
