
import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import SchedulerPage from './pages/SchedulerPage.jsx'
import TaskLogger from './pages/TaskLogger.jsx'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/scheduler' element={<SchedulerPage/>}/>
        <Route path='/task-logger' element={<TaskLogger/>}/>
      </Routes>
    
    </div>
  )
}

export default App
