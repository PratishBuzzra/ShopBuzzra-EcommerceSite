import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const base_url = import.meta.env.VITE_API_URL

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

     const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const {username, email, password, cpassword} = formData
    if(password !== cpassword){
      alert('password do not match');
      return
    }
    try {
       const res = await fetch(`${base_url}/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password})
       })
       const data = await res.json()
       console.log(data);

       if(res.ok){
        alert('SignUp succesful please login');
        navigate('/login')

       }else{
        alert(data.error ||'signup failed')
       }
       
      
    } catch (error) {
      console.error('SignUp error', error);
      alert('Error has occured please try again')
      
      
    }
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <div className="w-full bg-white shadow-md rounded-lg p-8 max-w-md">
        <h1 className="text-2xl font-bold mb-1 text-center">Sign Up</h1>
        <p className="text-center text-gray-600 mb-6">
          Its Free and only takes a minute
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Username:{" "}
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              email:
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter Your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="cpassword" className="block text-sm font-medium">
              Confirm Password:{" "}
            </label>
            <input
              type="password"
              id="cpassword"
              placeholder="Confirm Password"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 w-full py-2 text-white rounded"
          >
            Submit
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to={"/login"} className="hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
