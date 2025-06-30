import React, { useContext, useState } from 'react';
import Logo from "../assets/logo.png";
import {useNavigate} from "react-router-dom";
import { IoIosEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';

function Login() {
    let navigate = useNavigate();
    let [show, setShow] = useState(false);

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let {serverUrl}=useContext(authDataContext);
    let {adminData,getAdmin}=useContext(adminDataContext);

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            let res=await axios.post(serverUrl+'/api/auth/adminLogin', {
                email,password
            },{withCredentials:true})
            console.log(res.data);
            getAdmin();
            navigate("/");
        }catch(e){
            console.log(e);
        }
    }
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start'>
      <div className='w-[80%] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer'>
        <img className='w-[40px]' src={Logo} alt="" />
        <h1 className='text-[22px] font-sans'>QuickKart</h1>
      </div>

      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
        <span className='text-[25px] font-semibold'>Login Page</span>
        <span className='text-[16px]'>Welcome to QuickKart, Apply for Admin Login</span>
      </div>

      <div className='max-w-[600px] w-[90%] h-[400px] bg-[#96969635] border-[1px] border-[#00000025] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
    <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>

  {/* Manual Registration Fields */}
  <div className='relative w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]'>

    <input
      type="email"
      className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
      placeholder='Email'
      required
      onChange={(e)=>setEmail(e.target.value)}
      value={email}
    />

    <input
      type={show ? "text" : "password"}
      className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
      placeholder='Password'
      required
      onChange={(e)=>setPassword(e.target.value)}
      value={password}
    />

    {!show&&<IoIosEye className='bottom-[50%] w-[20px] h-[20px] absolute cursor-pointer right-[5%]' onClick={()=>setShow(prev=>!prev)}/>}
    {show&&<IoMdEyeOff className='bottom-[50%] w-[20px] h-[20px] absolute cursor-pointer right-[5%]' onClick={()=>setShow(prev=>!prev)}/>}

    <button className='bottom-[56%] w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>
    Login
    </button>
    </div>
    </form>

      </div>
    </div>
  );
}

export default Login;
