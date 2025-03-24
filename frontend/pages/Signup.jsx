

import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'


const Signup = () => {
   
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastname] = useState("");
  const [firstName, setFirstname] = useState("");
  const navigate = useNavigate();


  return (
    <div className=' flex items-center justify-center bg-slate-300 h-screen'>
      <div className='flex flex-col justify-center'>
        <div className='text-center rounded-lg w-80 bg-white h-max p-2 px-4 '>
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <Input onChange={(e) => {
            setFirstname(e.target.value);
          }} label={"First Name"} placeholder={"Rakesh"} />
          <Input onChange={(e) => {
            setLastname(e.target.value);
          }} label={"Last Name"} placeholder={"Bhagat"} />
          <Input onChange={(e) => {
            setUsername(e.target.value);
          }} label={"Email"} placeholder={"rakeshbhagat333@gmail.com}"}  />
          <Input onChange={(e) => {
            setPassword(e.target.value);
          }} label={"Password"} placeholder={"123465"} />

          <div className='pt-4'>
            <Button onClick={async()=> {
              const response = await axios.post("http://localhost:8000/api/v1/user/signup", {
                username,
                firstname: firstName,
                lastname: lastName,
                password
              });
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard")
            }} label={"Sign up"} />
          </div>

          <BottomWarning label={"Already have an account? "} buttonText={"Sign in"} to={"/signin"} / >
        </div>
      </div>
    </div>
  )
}

export default Signup