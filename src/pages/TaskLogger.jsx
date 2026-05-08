import {  FaRegUserCircle } from "react-icons/fa";
import Button from "../components/Button.jsx";
import { useEffect } from "react";

const TaskLogger = ({ schedules, username }) => {
  useEffect(() => {
  const completedList = schedules.filter(task => task.completed === true);
  console.log(completedList);
  }, [schedules]);

  const completedList = schedules.filter(task => task.completed === true);
  
 return (
    <div className="min-h-screen bg-blue-100 flex flex-col ">
      
     <div className="flex justify-between bg-white p-1">
                   <h2 className="text-2xl font-semibold">Task Logger</h2>
                   <p className="flex justify-center items-center gap-1">
                      {username}
                   <span>
                     <FaRegUserCircle size={25} />
                   </span>
             </p>
     </div>
           


      <div className="m-3 bg-blue-300 rounded-xl p-5   " >
        <h2 className="text-2xl font-semibold">Accomplished Task Logs</h2>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto  border-gray-900 p-2">

           
          {completedList.length === 0 ? (
            <p className="text-center font-semibold text-[20px] text-gray-600">No completed tasks yet.</p>
          ) : 
          (completedList.map((item) => (
              <div key={item._id} className="bg-white m-3 flex justify-between items-center p-3 rounded-2xl">

                <div  className="flex flex-col gap-2">
                  <div className="text-bold text-[14px]">{item.task}</div>
                  <div className="text-bold text-[14px]">({item.date}. {item.time})</div>
                </div>
          
            <div className='rounded-3xl p-2 opacity-70 bg-green-300'>Completed</div>
          </div>)))
          }

            </div>
       


      <div className="text-center mt-2">
        {/* <button className="bg-white w-75 h-12 rounded-[7px] fixed bottom-4 right-10"><Link to='/scheduler'> Back To Scheduler</Link></button> */}
        <Button  link = '/scheduler'
                 styling = 'bg-white w-75 h-12 rounded-[7px]  '
                 title = 'Back To Scheduler'/>
      </div>
      </div>
      {/* <div></div> */}
    </div>
  );
}

export default TaskLogger