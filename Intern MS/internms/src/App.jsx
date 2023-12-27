import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Intern from './components/Intern'
import Courses from './components/Courses'

import AddCourses from './components/AddCourses'
import AddIntern from './components/AddIntern'
import EditIntern from './components/EditIntern'
import Start from './components/Start'
import InternLogin from './components/InternLogin'
import InternDetail from './components/InternDetail'
import ManageCoach from './components/ManageCoach'
import AddCoach from './components/AddCoach'
import EditCoach from './components/EditCoach'
import CoachLogin from './components/CoachLogin'
import InternDashboard from './components/InternDashboard'
import InternTask from './components/InternTask'
import CoachDashboard from './components/CoachDashboard'
import CoachDetails from './components/CoachDetails'
import CoachTask from './components/CoachTask'
import AddTask from './components/AddTask'
import Status from './components/Status'
import Attendace from './components/Attendace'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path="/intern_login" element={<InternLogin />}></Route>
        <Route path="/coach_login" element={<CoachLogin />}></Route>


        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/interns' element={<Intern />}></Route>
          <Route path='/dashboard/courses' element={<Courses />}></Route>
          <Route path='/dashboard/manage_coach' element={<ManageCoach />}></Route>
          <Route path='/dashboard/add_course' element={<AddCourses />}></Route>
          <Route path='/dashboard/add_intern' element={<AddIntern />}></Route>
          <Route path='/dashboard/edit_intern/:id' element={<EditIntern />}></Route>
          <Route path='/dashboard/add_coach' element={<AddCoach />}></Route>
          <Route path='/dashboard/edit_coach/:id' element={<EditCoach />}></Route>

        </Route>

        <Route path='/intern_details' element={<InternDetail />}>
          <Route path='/intern_details/intern_dashboard/:id' element={<InternDashboard />}></Route>
          <Route path='/intern_details/intern_tasks/:id' element={<InternTask />}></Route>
          <Route path='/intern_details/attendance/:id' element={<Attendace />}></Route>
        </Route>



        <Route path='/coach_details' element={<CoachDetails />}>
          <Route path='/coach_details/coach_dashboard/:id' element={<CoachDashboard />}></Route>
          <Route path='/coach_details/coach_tasks/:id' element={<CoachTask />}></Route>
          <Route path='/coach_details/add_tasks/:id' element={<AddTask />}></Route>
          <Route path='/coach_details/status/:id' element={<Status />}></Route>

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
