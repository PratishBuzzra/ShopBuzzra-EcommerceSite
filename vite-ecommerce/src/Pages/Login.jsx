import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";


const base_url =  import.meta.env.VITE_API_URL

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()


  const {login} = useContext(AuthContext)

  const handleChange = (e)=>{
    setFormData(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await fetch(`${base_url}/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })
      
      let data = await res.json();

      if(res.ok){
        alert('login succesful')
        login(data.authToken, data.user)
         console.log('User role from API:', data.user.role);
        if(data.user.role == 1){
          navigate('/dashboard')
        }else{
          navigate('/shop')
        }
        
      }else{
        alert(data.error || 'login failed')
      }


    } catch (error) {
      console.error('Error login', error);
      alert('error occured please try again')
      
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <div className="bg-white shadow-md w-full max-w-md p-8 rounded-lg">
        <h4 className="text-center text-gray-600 mb-1">
          Already have an account?
        </h4>
        <h1 className="text-2xl text-center font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="border border-gray-300 px-3 py-2 w-full mt-1 rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="border border-gray-300 px-3 py-2 w-full mt-1 rounded"
            />
          </div>
          <button type="submit" className="bg-blue-600 w-full py-2 rounded text-white">
            Log In
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to={"/signup"} className="hover:underline">
            Sign up here
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
