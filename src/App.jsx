import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import SchedulerPage from "./pages/SchedulerPage.jsx";
import TaskLogger from "./pages/TaskLogger.jsx";
import { useState } from "react";

function App() {
  const [schedules, setSchedules] = useState([]);
  const [username, setUsername] = useState("");

  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/scheduler"
          element={
            <SchedulerPage schedules={schedules} setSchedules={setSchedules} username={username} setUsername={setUsername} />
          }
        />
        <Route
          path="/task-logger"
          element={<TaskLogger schedules={schedules} username={username} />}
        />
      </Routes>
    </div>
  );
}

export default App;
