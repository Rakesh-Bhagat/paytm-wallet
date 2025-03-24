import { BrowserRouter, Routes, Route } from "react-router"
import Signup from "../pages/Signup"
import Dashboard from "../pages/Dashboard"
import Signin from "../pages/Signin"
import Send from "../pages/Send"
import { Successful } from "../pages/Successful"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element = {<Signup/> } />
        <Route path="/dashboard" element = {<Dashboard /> } />
        <Route path="/signin" element = {<Signin /> } />
        <Route path="/send" element = {<Send /> } />
        <Route path="/successful" element = {<Successful /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
