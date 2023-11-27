import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import axios from 'axios';
import {Button} from 'antd';
function Requests () {
    let logged = JSON.parse(localStorage.getItem("logIN"))
    let [users, setUser] = useState([])
useEffect(()=>{
    axios("http://localhost:3000/users").then((res)=>{
    setUser(res.data.find((user)=> user.id === logged.id))
})
},[])

return(
    <>
    <Card
    style={{
      width: 300,
    }}
  >
   
   {users.requests && users.requests.map((request,index)=>(
   <div key={index}>
   <p >{request.username}</p>
   <Button onClick={()=>{
     axios.patch(`http://localhost:3000/users/${logged.id}`,{
       friends: [...users.friends,request],
       requests: users.requests.filter((r)=> r.id !==  request.id)
     }).then((res)=>{
      console.log(res.data);
     
     })

     axios.patch(`http://localhost:3000/users/${request.id}`,{
        friends: [...request.friends, logged],
      }).then((res)=>{
       console.log(res.data);
      })
   }}>Accept</Button>
   <Button danger onClick={()=>{
    axios.patch(`http://localhost:3000/users/${logged.id}`,{
       
        requests: users.requests.filter((r)=> r.id !==  request.id)
      }).then((res)=>{
       console.log(res.data);
      })
   }}>Decline</Button>
   </div>

   ))}
    
  </Card> 
  </>
)
};

export default Requests;