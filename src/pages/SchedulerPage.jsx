import React, { useState } from "react";
import { FaCheck, FaEdit, FaRegUserCircle, FaTrash } from "react-icons/fa";
// import InputComponent from "../components/InputComponent";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import Header from "../components/Header.jsx";
import { person, taskDatabase } from "../files/export_files.js";
import { useEffect } from "react";

const SchedulerPage = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [inputError, setInputError] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [isChecked, setIsChecked] = useState(false)
  const [strikeThrough, setStrikeThrough] = useState(false);
  const [completed, setCompleted] = useState(false)
  const [editing, setEditing] = useState([])
  // const [localArray, setLocalArray] = useState([])

  // localStorage.setItem('taskList',JSON.stringify(schedules))
  // const localArrayData = JSON.parse(localStorage.getItem('taskList'))
  // setLocalArray(localArrayData)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim() || !date.trim() || !time.trim() ) {
      return setInputError(true);
    }
    setInputError(false);

    const schedule = { task, date, time, completed, id: Date.now() };
    setSchedules((schedules) => [...schedules, schedule]);


    setTask("");
    setDate("");
    setTime("");
  };

  const handleDelete = (id) => {
    setSchedules(schedules.filter((item) => item.id !== id));
  };

  const handleChecked = (id, e) => {
    const isNowChecked = setIsChecked(e.target.checked)
     setSchedules(prevList => prevList.map(item=> item.id === id ? {...item, completed: isNowChecked}: item)) 
  }

  const handleStrikeThrough = (id)=>{
    const newArr = schedules.find(item => item.id === id && setStrikeThrough(!strikeThrough) )
    console.log(newArr)
  }

  const handleEdit = (id)=>{
    const editedTask = schedules.filter(item => item.id === id)
    setEditing(editedTask)
    
    // editing.map(edit => {task:edit.task; date: edit.date; time: edit.time})

    // prev => prev.map(edit =>edit.task)

    setTask(editing.map(edit =>edit.task))
    setDate(editing.map(edit =>edit.date))
    setTime(editing.map(edit =>edit.time))
    
    setSchedules(schedules.filter(item => item.id !== id))

    // setTask(editedTask)
    // setDate(editedTask)
    // setTime(editedTask)

    console.log(editedTask)
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
        {/* <InputComponent
          inputType="text"
          inputValue={task}
          inputOnChange={(e) => setTask(e.target.value)}
          classname="border-b-black border-2 w-75 h-12 rounded-[7px]      mx-8 px-2"
          placeholder="e.g finalize project"
        /> */}
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
                <input type="checkbox"
                       name="done"
                       id=""
                       checked={isChecked}
                       onChange={(e)=>handleChecked(item.id, e)}/>
              </div>
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
