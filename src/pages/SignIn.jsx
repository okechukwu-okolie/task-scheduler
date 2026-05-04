import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import InputComponent from '../components/InputComponent.jsx'

const SignIn = () => {
  const [password,setPassword] = useState('')
  const [usernameOrEmail,setUsernameOrEmail] = useState('')
  const[err, setErr] = useState(false)
  const[err1, setErr1] = useState(false)
  const [database,setDatabase] = useState([])


   const handleSubmit = (e)=>{
    e.preventDefault()
    if(!password || !usernameOrEmail ){
       return setErr(true)
    }
    setErr(false)
    const database = JSON.parse(localStorage.getItem('users')) || []
    console.log(database)


    if(database.some(user => user.usernameOrEmail || user.password)){
      return setErr(true)
    }
    setErr(false)

    setUsernameOrEmail('')
    setPassword('')
  

  }

  

   return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='  p-5.5 rounded-2xl bg-white border-2 border-blue-500'>
        <div className='flex flex-col items-center mb-5'>
          <h2 className='text-3xl font-bold text-blue-500'>Welcome Back</h2>
          <p className='text-[18px] font-light'>Sign Into Your Account</p>    
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
          <InputComponent 
            inputName = 'Username or Email'
            inputType = 'text'
            inputValue = {usernameOrEmail}
            inputOnChange = {(e)=>setUsernameOrEmail(e.target.value)}
            classname='border-b-black border-2 w-100 h-12 rounded-[7px] mx-8 px-2'
            />
            <InputComponent 
              inputName = 'Password'
              inputType = 'password'
              inputValue = {password}
              inputOnChange = {(e)=>setPassword(e.target.value)}
              classname='border-b-black border-2 w-100 h-12 rounded-[7px] mx-8 px-2'
              />


              <div className='-mt-4 px-8'>{err && <p className='text-red-700 text-[15px]'>Email already exists. Try another</p>}</div>
            <button className='bg-blue-500  w-60 h-12 rounded-[7px] mx-8 mt-10'>Sign In</button>

            <div className='text-center text-[18px]'>
              <p>Don't have an account? <Link to='/scheduler' className='text-blue-500 font-semibold'>Sign Up</Link></p>
              
              
            </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn