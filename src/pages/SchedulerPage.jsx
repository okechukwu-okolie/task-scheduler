import { FaCheck, FaEdit, FaRegUserCircle, FaTrash } from "react-icons/fa";
import Button from "../components/Button.jsx";
import { useEffect, useState } from "react";
import instance from "../files/axios.Create.jsx";
import { Link } from "react-router-dom";

const SchedulerPage = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userName, setUsername] = useState("");
  const [taskState, setTaskState] = useState("");
  const [taskLoading, setTaskLoading] = useState(false);
  const [taskcreated, setTaskCreated] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [strikeThrough, setStrikeThrough] = useState(false);
  const [completed, setCompleted] = useState(false);
  // const [editing, setEditing] = useState([])

  //this useeffect is for fetching the tasks from the database and setting it to the state variable schedules. It runs only once when the component mounts.
  useEffect(() => {
    const fetchTasks = async () => {
      setTaskLoading(true); // Start loading when the request begins
      try {
        const res = await instance.get("/getTasks");

        // Use the safe fallback [] to ensure schedules is always an array
        const fetchedTasks = res.data.data || [];
        setSchedules(fetchedTasks);
        setUsername(res.data.username || "User");
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setTaskLoading(false); // Stop loading regardless of success or failure
      }
    };
    fetchTasks();
  }, []);

  //this function is for handling the form submission when adding a new task. It sends a POST request to the backend with the task details and updates the schedules state with the new task if the request is successful.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FIX: Check for empty fields and set error state
    if (!task || !date.trim() || !time.trim()) {
      return setInputError(true);
    }
    setInputError(false);

    // FIX: Retrieve JWT token for authentication (replace with your actual method of getting the token)
    const your_jwt_token = localStorage.getItem("token");

    // FIX: Ensure the token exists before making the request
    if (!your_jwt_token) {
      console.error("No JWT token found. Please log in.");
      return;
    }
    if (task && date && time) {
      // Create the schedule object to send to the backend
      const schedule = { task, date, time, completed: false };
      try {
        const res = await instance.post("/createTask", schedule, {
          headers: { Authorization: `Bearer ${your_jwt_token}` },
        });
        console.log("Task created successfully:", res.data);

        if (res.status === 201) {
          setTaskCreated(true);
          setSchedules((prev) => [res.data.data, ...prev]); // Add new task to the top of the list

          setTask("");
          setDate("");
          setTime("");
        }
      } catch (error) {
        console.log("there was an error creating the task", error);
      } finally {
        setTimeout(() => {
          setTaskCreated(false);
          setInputError(false);
        }, 3000);
      }
    }
  };

  const deleteTask = async (id) => {
    console.log(schedules.map((item) => item._id));
    try {
      // FIX: Delete from database first
      await instance.delete(`/deleteTask/${id}`);

      // Then update the local state (filtering by MongoDB __id)
      setSchedules(schedules.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleStrikeThrough = async (id, currentStatus) => {
    try {
      // FIX: Toggle the completed status in the database
      await instance.patch(`/updateTask/${id}`, {
        completed: !currentStatus,
      });

      // Update local state to show the strike-through
      setSchedules(
        schedules.map((item) =>
          item._id === id ? { ...item, completed: !currentStatus } : item,
        ),
      );
      setStrikeThrough(!strikeThrough);
    } catch (error) {
      console.error("Toggle failed:", error);
    }
  };

  const editTask = (item) => {
    // FIX: Populate the form fields with the existing task data
    setTask(item.task);
    setDate(item.date);
    setTime(item.time);

    // Optional: Remove from list to "replace" it upon resubmit,
    // or set an 'isEditing' state with the _id to perform a PUT request later.
    setSchedules(schedules.filter((i) => i.__id !== item.__id));
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col ">
      <div className="flex justify-between bg-white p-1">
        <h2 className="text-2xl font-semibold">
          <Link to="/">Task Logger</Link>
        </h2>
        <p className="flex justify-center items-center gap-1">
          {userName || "User"}
          <span>
            <FaRegUserCircle size={25} />
          </span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white m-3 flex flex-col p-4 rounded-2xl"
      >
        <h2 className="text-semibold text-[18px]">Enter Task Title</h2>

        <label htmlFor="" className="block mb-2"></label>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="e.g finalize project"
          className="border-b-black border-1 w-60 h-12 rounded-[7px] mx-8 px-2"
        />
        <div className="mt-6 ">
          <h2 className="text-bold text-[18px] mb-2">Schedule Date and Time</h2>
          <div className="flex justify-between">
            <div>
              <label
                htmlFor=""
                className="block text-bold underline text-[16px]"
              >
                Date
              </label>
              <input
                type="date"
                name=""
                _id=""
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-bold underline text-[16px]"
              >
                Time
              </label>
              <input
                type="time"
                name=""
                _id=""
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-100 w-75 h-12 rounded-[7px] "
            >
              Add Task
            </button>
            {inputError && (
              <p className="text-red-500">
                Input all the fields before adding a task.
              </p>
            )}
          </div>
        </div>
      </form>

      <div className="m-3 ">
        <h2 className="text-2xl font-semibold">Scheduled Task</h2>
        <div className="max-h-45 overflow-y-auto border-gray-900 p-2">
          {taskLoading ? (
            <p>Loading tasks...</p>
          ) : schedules.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">
              No scheduled tasks available.
            </p>
          ) : (
            schedules.map((item) => (
              <div
                key={item._id}
                className="bg-white m-3 flex justify-between items-center px-3 rounded-2xl"
              >
                <div>
                  <div
                    className={
                      strikeThrough
                        ? "line-through text-green-400 text-bold"
                        : "text-bold"
                    }
                    onClick={() => handleStrikeThrough(item._id)}
                  >
                    {item.task}
                  </div>
                  <div
                    className={
                      strikeThrough
                        ? "line-through text-green-400 text-center"
                        : "text-bold"
                    }
                  >
                    <span>{item.date}</span> <span>{item.time}</span>
                  </div>
                </div>
                <div className="flex justify-between align-center gap-2">
                  <FaEdit
                    color="sky-blue "
                    onClick={() => editTask(item._id)}
                  />
                  <FaTrash color="red " onClick={() => deleteTask(item._id)} />
                  <FaCheck
                    color="green "
                    onClick={() => handleStrikeThrough(item._id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="text-center mt-4">
        <Button
          link="/task-logger"
          styling="bg-white w-75 h-12 rounded-[7px]  fixed bottom-4 right-10"
          title="View Completed Task Log"
        />
      </div>
      <div></div>
    </div>
  );
};

export default SchedulerPage;
