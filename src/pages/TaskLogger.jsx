import React, { useState } from "react";
import {  FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";

const TaskLogger = () => {
    
      const [task, setTask] = useState("");
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
           


      <div className="m-3 " >
        <h2 className="text-2xl font-semibold">Accomplished Task Logs</h2>
        <div className="max-h-130 overflow-y-auto border-gray-900 p-2">

            <div className="bg-white m-3 flex justify-between items-center p-3 rounded-2xl">
           
            <div>
                <div className = 'text-bold'>1. Finalise Project Proposal</div>
                <div className = 'text-bold'>(June 15, 2024. 4:30 pm)</div>
            </div>
            <div className='rounded-3xl p-2 opacity-70 bg-green-300'>Completed</div>
            </div>

            </div>
       


      </div>
      <div className="text-center mt-2">
        {/* <button className="bg-white w-75 h-12 rounded-[7px] fixed bottom-4 right-10"><Link to='/scheduler'> Back To Scheduler</Link></button> */}
        <Button  link = '/scheduler'
                 styling = 'bg-white w-75 h-12 rounded-[7px]  fixed bottom-4 right-10'
                 title = 'Back To Scheduler'/>
      </div>
      <div></div>
    </div>
  );
}

export default TaskLogger