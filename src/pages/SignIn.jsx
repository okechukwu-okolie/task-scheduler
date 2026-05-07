
import { Link, useNavigate } from 'react-router-dom'
import instance from '../files/axios.Create.jsx'
import { useState } from 'react';



const SignIn = () => {
  
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [err, setErr] = useState(false);  // Empty fields error
  const [err1, setErr1] = useState(false); // Server/Auth error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error states before trying again
    setErr(false);
    setErr1(false);

    if (!password.trim() || !username.trim()) {
      return setErr(true);
    }

    // IMPORTANT: Check your backend documentation. 
    // If the server expects 'email' or 'username', change the key below.
    const credentials = { 
        identifier: username, // Often backends use 'email' or 'identifier'
        password: password 
    };

    try {
      //we brought in the axios instance 
      const res = await instance.post('/signIn', credentials);
      // Axios considers any 2xx status a success. 
      // Checking for res.data.token is usually safer than a specific status code.
      if (res.data && res.data.token) {
        // console.log('Login successful:', res.data,'Token:', res.data.token);
        localStorage.setItem('token', res.data.token);
        setUsername('');
        setPassword('');
        navigate('/scheduler');
      }
    } catch (error) {
      // Log the specific response from the server to debug the 400 error
      if (error.response) {
        console.error('Server Refused Request:', error.response.data);
        setErrorMessage(error.response.data.message);
      } else {
        console.error('Login Failed:', error.message);
      }
      setErr1(true);
    }
  };




  

   return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='  p-5.5 rounded-2xl bg-white border-2 border-blue-500'>
        <div className='flex flex-col items-center mb-5'>
          <h2 className='text-3xl font-bold text-blue-500'>Welcome Back</h2>
          <p className='text-[18px] font-light'>Sign Into Your Account</p>    
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

           <label htmlFor=""  className='block text-[14px] '>
          Username
         </label>
           <input 
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder='Username'
            className='border-b-black border-2 w-75 h-12 rounded-[7px] mx-8 px-2'
            
            />
        
          

             <label htmlFor=""  className='block text-[14px]'>
         Password 
         </label>
           <input 
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Password'
            className='border-b-black border-2 w-75 h-12 rounded-[7px] mx-8 px-2'

            />
         


              <div className='-mt-4 px-8 '>{err && <p className='text-red-700 text-[15px]'>{errorMessage}</p>}</div>
              <div className='-mt-4 px-8 '>{err1 && <p className='text-red-700 text-[15px]'>{errorMessage}</p>}</div>
            <button className='bg-blue-500  w-60 h-12 rounded-[7px] mx-8 mt-10'>Sign In</button>

            <div className='text-center text-[18px]'>
              <p>Don't have an account? <Link to='/' className='text-blue-500 font-semibold'>Sign Up</Link></p>
              
              
            </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn