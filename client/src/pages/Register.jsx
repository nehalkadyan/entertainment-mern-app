import React, {useState} from 'react';
import { MdMovieFilter } from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";


const Register = () => {
  
  // initializing navigate
  const navigate = useNavigate()
  // setting state for loading
  const [loading, setLoading] = useState(false);
  // setting state for error
  const [error, setError] = useState(null)

  // setting state for form Data
  const [formData, setFormData] = useState({
    email : "",
    password : "",
    confirmPassword : ""
  });

 // function for handling changes in form Data
  const handleFormDataChange = (e) => {
     setFormData({
      ...formData,
      [e.target.id] : e.target.value
     })
  }

  // User registration Functionality
  const handleRegister = async (e) => {
    // not refreshing at the time of click
     e.preventDefault();
     setLoading(true)

     if(formData.password !== formData.confirmPassword){
      setError("Passswords do not match");
      console.log(error)
      setLoading(false);
      return;
     }

     try{
      // making the api call
       const res = await fetch("http://localhost:5000/api/auth/register", {
         method : "POST",
         headers : {
           "Content-Type" : "application/json"
         },
         body : JSON.stringify({
          email : formData.email,
          password : formData.password
         })
       })
       
       const data = await res.json();
       setLoading(false)
       // after successful registration, redirect to login page
       navigate("/")


     }catch(err){
      // error handling
       setError(err.message);
       console.log(error)
       setLoading(false)
     }
  }


  return (
    <div className='w-full h-screen flex justify-center flex-col items-center bg-slate-950'>
       <div className='text-6xl -mt-20 p-12 text-red-700'>
       <MdMovieFilter />
        </div>

        <div className='bg-slate-700 w-3/4 md:w-2/5 lg:w-1/4 flex flex-col rounded-lg p-8 gap-4'>
           <h1 className='text-white text-3xl'>Sign Up</h1>
           <form onSubmit={handleRegister} className='flex flex-col gap-4 w-full'>
            <input id = "email" onChange={handleFormDataChange} className='bg-transparent outline-none p-2 border-b-2 border-slate-400 text-white'  type ="email" placeholder='Email address'/>
            <input id="password" onChange={handleFormDataChange} className='bg-transparent outline-none p-2 border-b-2 border-slate-400 text-white' type = "password" placeholder='Password'/>
            <input id="confirmPassword" onChange={handleFormDataChange} className='bg-transparent outline-none p-2 border-b-2 border-slate-400 text-white' type = "password" placeholder='Repeat Password'/>
            <button className='bg-red-700 text-white rounded border-none p-2'>{loading ? "Loading" : "Create an account"}</button>
           </form>
           <p className='text-center text-white'>Already have an account? 
            <Link to="/" className='ml-2 text-red-700 font-medium'>Login</Link>
            </p>
            {error && (
              <p>{error}</p>
            )}
        </div>


    </div>
  )
}

export default Register
