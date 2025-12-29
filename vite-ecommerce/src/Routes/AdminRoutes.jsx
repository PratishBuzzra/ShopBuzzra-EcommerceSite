import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../Context/authContext'


const base_url =  import.meta.env.VITE_API_URL

const AdminRoutes = () => {
    const [ok, setOk] = useState(false)
    const [loading, setLoading] = useState(true)
      const {isLoggedIn, login } = useContext(AuthContext)

      useEffect(()=>{
      const checkAdmin = async ()=>{
        try {
            const token = localStorage.getItem('token')

            const res = await fetch(`${base_url}/v1/auth/admin-auth`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json();

            if(res.ok && data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        } catch (error) {
            console.error('Admin check failed', error);
            setOk(false)  
        }finally{
            setLoading(false)
        }
      }
      checkAdmin();
      }, [])
  if(loading) return <div>Loading....</div>
  return ok && isLoggedIn ? <Outlet /> : <Navigate to = "/unauthorized"/>
}

export default AdminRoutes
