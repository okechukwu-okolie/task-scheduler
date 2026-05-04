

import { Link, useNavigate } from 'react-router-dom'
import instance from '../files/axios.Create.jsx'
import { useState } from 'react'





const SignUp = () => {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [usrnError, setUsrnError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [fieldsError, setFieldsError] = useState(false)
  const navigate = useNavigate()



  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(!email.trim() || !password.trim() || !username.trim() ){
       return setFieldsError(true)
    }
    setFieldsError(false)

    if(email && password && username){
      try {
        await instance.post('/signUp',{
          username,
          email,
          password
        })
        navigate('/scheduler')
      } catch (error) {
        if(error.response.data.message === "Username already exists"){
          setUsrnError(true)
          // setEmailError(false)
        }
        else if(error.response.data.message === "Email already exists"){
          // setUsrnError(false)
          setEmailError(true)
        }
        else if(error.response?.status === 500){
          console.log('Server error')
        }
      }
        finally{
          setTimeout(() => {
            setUsrnError(false)
            setEmailError(false)
          }, 3000);
        }
    
        
     


    }


   
    


  }




  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='  p-5.5 rounded-2xl bg-white border-2 border-blue-500'>
        <div className='flex flex-col items-center mb-5'>
          <h2 className='text-3xl font-bold text-blue-500'>Create Your Account</h2>
          <p className='text-[18px] font-light'>Task Scheduler</p>    
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

         <label htmlFor=""  className='block '>
          Username
         </label>
           <input 
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder='Username'
            className='border-b-black border-2 w-75 h-12 rounded-[7px] mx-8 px-2'
            
            />
            <div className=' -mt-4 px-8'>{usrnError && <p className='text-red-700 text-[15px]'>Username already exists. Try another</p>}</div>
           

           <label htmlFor=""  className='block '>
          Email
         </label>
           <input 
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Email'
            className='border-b-black border-2 w-75 h-12 rounded-[7px] mx-8 px-2'
            
            />
              <div className=' -mt-4 px-8'>{emailError && <p className='text-red-700 text-[15px]'>Email already exists. Try another</p>}</div>


          <label htmlFor=""  className='block '>
          Password
         </label>
           <input 
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Password'
            className='border-b-black border-2 w-75 h-12 rounded-[7px] mx-8 px-2'
            
            />

         
            <div className=' -mt-4 px-8'>{fieldsError && <p className='text-red-700 text-[15px]'>Fill in all the fields</p>}</div>
            <button className='bg-blue-500  w-60 h-12 rounded-[7px] mx-8 mt-10'>Sign Up</button>

            <div className='text-center text-[18px]'>
              <p>Already have an account? <Link to='/sign-in' className='text-blue-500 font-semibold'>Sign In</Link></p>
              
              
            </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp