import { useEffect, useState } from 'react'
import { AppBar } from '../components/AppBar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'
import axios from 'axios'

const Dashboard = () => {
  const [value, setValue] = useState("")

  useEffect(()=>{
    const fetchBalance = async () =>{
      const response  = await axios.get("http://localhost:8000/api/v1/account/balance", {

        headers: {
          Authorization : "Bearer " + localStorage.getItem("token")
        }
      })
      const balanceStr = response.data.balance.toString()
      setValue(balanceStr.slice(0,7))
    }
    
    fetchBalance()
  }, [])
  
  console.log(value)
  // const slicedValue = value.slice(0, 6);
  return <div>
    <AppBar />
    <div className='m-8'>
      <Balance value={value} />
      <Users />
    </div>
  </div>
}

export default Dashboard