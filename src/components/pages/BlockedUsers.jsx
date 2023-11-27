import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import axios from 'axios';
import {Button} from 'antd';
function BlockedUsers () {
    let logged = JSON.parse(localStorage.getItem("logIN"))
    let [users, setUser] = useState([])
useEffect(()=>{
    axios("http://localhost:3000/users").then((res)=>{
    setUser(res.data.find((user)=> user.id === logged.id))
})
},[])

  return (
    <>
    <Card
    style={{
      width: 300,
    }}
  >
   
   {users.blockedusers && users.blockedusers.map((blockeduser,index)=>(
   <div key={index}>
   <p >{blockeduser.username}</p>

   <Button >Unblock</Button>
   </div>

   ))}
    
  </Card> 
  </>
  )
}

export default BlockedUsers