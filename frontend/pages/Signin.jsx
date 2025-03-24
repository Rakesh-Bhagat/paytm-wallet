

import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className=' flex items-center justify-center bg-slate-300 h-screen'>
      <div className='flex flex-col justify-center'>
        <div className='text-center rounded-lg w-80 bg-white h-max p-2 px-4 '>
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <Input onChange={(e) => {
            setUsername(e.target.value)
          }} label={"Email"} placeholder={"rakeshbhagat333@gmail.com"}  />
          <Input onChange={(e) => {
            setPassword(e.target.value);
          }} label={"Password"} placeholder={"123465"} />

          <div className='pt-4'>
            <Button onClick={async() => {
              const response = await axios.post("http://localhost:8000/api/v1/user/signin", {
                username,
                password
              });
              localStorage.setItem("token", response.data.token)
              localStorage.setItem("currentUser", response.data.token.userId)
              navigate("/dashboard")
            }} label={"Sign In"} />
          </div>

          <BottomWarning label={"Don't have an account? "} buttonText={"Sign Up"} to={"/signup"} / >
        </div>
      </div>
    </div>
  )
}

export default Signin