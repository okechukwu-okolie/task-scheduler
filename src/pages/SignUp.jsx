import React, { useState } from 'react'
import InputComponent from '../components/InputComponent.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { person } from '../files/export_files.js'





const SignUp = () => {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [usrnError, setUsrnError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [fieldsError, setFieldsError] = useState(false)
  const [arr, setArr] = useState([])
  const navigate = useNavigate()
  let num = Math.random()
  // console.log(num)


  const handleSubmit = (e)=>{
    e.preventDefault()
    let id = num
    if(!email.trim() || !password.trim() || !username.trim() ){
       return setFieldsError(true)
    }
    setFieldsError(false)

    if(email && password && username){
      localStorage.setItem('users', JSON.stringify(arr)) || []
      const data = localStorage.getItem('users')
      const dataHolder = JSON.parse(data) 


      const check1 = dataHolder.some(userInfo => userInfo.username === username) 
      const check2 = dataHolder.some(userInfo => userInfo.email  === email)

      if(check1){
        return setUsrnError(true)
      }
      setUsrnError(false)
  
      if(check2){
        return setEmailError(true)
      }
      setEmailError(false)


      const person = {email, password, username, id}
      setArr([...arr , person])

    }

    person.push({username, email, password})
    

    setUsername('')
    setEmail('')
    setPassword('')
    navigate('/scheduler')

  }




  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='  p-5.5 rounded-2xl bg-white border-2 border-blue-500'>
        <div className='flex flex-col items-center mb-5'>
          <h2 className='text-3xl font-bold text-blue-500'>Create Your Account</h2>
          <p className='text-[18px] font-light'>Task Scheduler</p>    
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <InputComponent 
            inputName = 'Username'
            inputType = 'text'
            inputValue = {username}
            inputOnChange = {(e)=>setUsername(e.target.value)}
            classname='border-b-black border-2 w-75 h-12 rounded-[7px] mx-8 px-2'
            />
            <div className=' -mt-4 px-8'>{usrnError && <p className='text-red-700 text-[15px]'>Username already exists. Try another</p>}</div>
           

            <InputComponent 
              inputName = 'Email'
              inputType = 'email'
              inputValue = {email}
              inputOnChange = {(e)=>setEmail(e.target.value)}
              classname='border-b-black border-2 w-100 h-12 rounded-[7px] mx-8 px-2'
              />
              <div className=' -mt-4 px-8'>{emailError && <p className='text-red-700 text-[15px]'>Email already exists. Try another</p>}</div>


          <InputComponent 
            inputName = 'Password'
            inputType = 'password'
            inputValue = {password}
            inputOnChange = {(e)=>setPassword(e.target.value)}
            classname='border-b-black border-2 w-100 h-12 rounded-[7px] mx-8 px-2'
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