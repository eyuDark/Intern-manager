import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {

    const [coachTotal, setCoachTotal] = useState(0)
    const [internTotal, setInternTotal] = useState(0)
    const [salaryTotal, setSalaryTotal] = useState(0)
    const [coach, setCoach] = useState([])

    useEffect(() => {
        coachCount();
        internCount();
        salaryCount();
        CoachRecords();
    }, [])

    const CoachRecords = () => {
        axios.get('http://localhost:3000/auth/coach_records')
            .then(result => {
                if (result.data.Status) {
                    setCoach(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
    }

    const coachCount = () => {
        axios.get('http://localhost:3000/auth/coach_count')
            .then(result => {
                if (result.data.Status) {
                    setCoachTotal(result.data.Result[0].coach)
                }
            })
    }

    const internCount = () => {
        axios.get('http://localhost:3000/auth/intern_count')
            .then(result => {
                if (result.data.Status) {
                    setInternTotal(result.data.Result[0].intern)
                }
            })
    }
    const salaryCount = () => {
        axios.get('http://localhost:3000/auth/salary_count')
            .then(result => {
                if (result.data.Status) {
                    setSalaryTotal(result.data.Result[0].salaryOFint)
                } else {
                    alert(result.data.Error)
                }
            })
    }

    return (

        <div>
            <div className='p-3 d-flex justify-content-around mt-3 ' >
                <div className='px-3 pt-2 pb-3 border border-info w-25'>
                    <div className='text-center pb-1 text-warning'>
                        <h4>Coach</h4>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between text-info '>
                        <h5>Total:</h5>
                        <h5>{coachTotal}</h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border border-info w-25 '>
                    <div className='text-center pb-1 text-warning'>
                        <h4>Intern</h4>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between text-info'>
                        <h5>Total:</h5>
                        <h5>{internTotal}</h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border border-info w-25'>
                    <div className='text-center pb-1 text-warning'>
                        <h4>Salary</h4>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between text-info'>
                        <h5 >Total:</h5>
                        <h5>{salaryTotal} Birr</h5>
                    </div>
                </div>
            </div>
            <div className='mt-4 ml-5 px-5 pt-3 text-danger'>
                <div className="d-flex align-items-center justify-content-center">
                    <h3>List of Coaches</h3>
                </div>
                <table className='table '>
                    <thead>
                        <tr>
                            <th className='text-warning '>Name</th>
                            <th className='text-warning'>Email</th>

                        </tr>
                    </thead>
                    <tbody >
                        {
                            coach.map(d => (
                                <tr>
                                    <td className='text-info'>{d.name}</td>
                                    <td className='text-info'>{d.email}</td>

                                </tr>

                            ))
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default Home