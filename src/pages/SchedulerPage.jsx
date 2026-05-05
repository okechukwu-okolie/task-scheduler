import { FaCheck, FaEdit, FaRegUserCircle, FaTrash } from "react-icons/fa";
import Button from "../components/Button.jsx";
import { useEffect, useState } from "react";
import instance from "../files/axios.Create.jsx";


const SchedulerPage = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [taskcreated, setTaskCreated] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [strikeThrough, setStrikeThrough] = useState(false);
  const [completed, setCompleted] = useState(false)
  // const [editing, setEditing] = useState([])

//this useeffect is for fetching the tasks from the database and setting it to the state variable schedules. It runs only once when the component mounts.
    useEffect (()=>{
      // const fetchTasks = async()=>
      //   try {
      //     const res = await instance.get('/api/getTasks')
      //     setSchedules(res.data.data)
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }
      // fetchTasks()
  },[])

  const handleSubmit = async(e)=> {
    e.preventDefault();

    if (!task.trim() || !date.trim() || !time.trim() ) {
      return setInputError(true);
    }
    setInputError(false);
    const schedule = { task, date, time, completed: false };
    
    if(task && date && time){
      try {
        const res = await instance.post('/createTask', schedule ,{
  headers: { Authorization: `Bearer ${your_jwt_token}` }
})
        console.log('Task created successfully:', res.data);
        


        if (res.status === 201) {
          setTaskCreated(true);
          setSchedules(prev => [res.data.data, ...prev]); // Add new task to the top of the list
          
          
          setTask("");
          setDate("");
          setTime("");
        }

          


        
      } catch (error) {
        console.log('there was an error creating the task',error)
        
      }
      finally{
        setTimeout(() => {
          setTaskCreated(false)
          setInputError(false)
        }, 3000);

      }


  };



 const handleDelete = async (id) => {
  try {
    // FIX: Delete from database first
    await instance.delete(`/deleteTask/${id}`);
    
    // Then update the local state (filtering by MongoDB _id)
    setSchedules(schedules.filter((item) => item._id !== id));
  } catch (error) {
    console.error("Delete failed:", error);
  }
};

 



const handleStrikeThrough = async (id, currentStatus) => {
  try {
    // FIX: Toggle the completed status in the database
    await instance.patch(`/updateTask/${id}`, { completed: !currentStatus });
    
    // Update local state to show the strike-through
    setSchedules(schedules.map(item => 
      item._id === id ? { ...item, completed: !currentStatus } : item
    ));
  } catch (error) {
    console.error("Toggle failed:", error);
  }
};




 const handleEdit = (item) => {
  // FIX: Populate the form fields with the existing task data
  setTask(item.task);
  setDate(item.date);
  setTime(item.time);
  
  // Optional: Remove from list to "replace" it upon resubmit, 
  // or set an 'isEditing' state with the ID to perform a PUT request later.
  setSchedules(schedules.filter(i => i._id !== item._id));
};
}


  return (
    <div className="min-h-screen bg-blue-100 flex flex-col ">
      <div className="flex justify-between bg-white p-1">
        <h2 className="text-2xl font-semibold">Task Logger</h2>
        <p className="flex justify-center items-center gap-1">
          Alex Johnson
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
       
         <label htmlFor="" className='block mb-2'>
            
        </label>
            <input 
                type="text"
                value={task} 
                onChange={(e) => setTask(e.target.value)}
                placeholder="e.g finalize project"
                className='border-b-black border-1 w-60 h-12 rounded-[7px] mx-8 px-2'
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
                id=""
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
                id=""
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
            {/* {taskCreated && (
              <p className="text-green-500">
                Task created successfully!
              </p>
            )}     */}
          </div>
        </div>
      </form>

      <div className="m-3 ">
        <h2 className="text-2xl font-semibold">Scheduled Task</h2>
        <div className="max-h-45 overflow-y-auto border-gray-900 p-2">
          {schedules.map((item) => (
            <div
              key={item.id}
              className="bg-white m-3 flex justify-between items-center px-3 rounded-2xl"
            >
          
              <div>
                <div
                  className=
                  {
                    strikeThrough
                      ? "line-through text-green-400 text-bold"
                      : 
                      "text-bold"
                  }
                  onChange={() => handleStrikeThrough(item.id)}
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
                <FaEdit color="sky-blue " onClick={()=>handleEdit(item.id)} />
                <FaTrash color="red " onClick={() => handleDelete(item.id)} />
                <FaCheck color="green " onClick={()=>handleStrikeThrough(item.id)}/>
              </div>
            </div>
          ))}
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
