import React, { useEffect } from 'react'
import { useState,useRef } from 'react'
import axios from 'axios'
import {
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react'
  
  import { Button, ButtonGroup } from '@chakra-ui/react'
import Register from './Register'
import { json, useNavigate } from 'react-router-dom'



function Login({login, setLogin,setUser}) {
   const [logged, setLogged] = useState({name:'', pass:''})
  let {name, pass} = logged
 
  let navigate = useNavigate()
   
  return (
   <>

    <FormControl>
  <FormLabel>Username</FormLabel>
  <Input type='text' value={name} id="username" onChange={(e) => setLogged({ ...logged, name: e.target.value })}/>
  
  <FormLabel>Password</FormLabel>
  <Input type='password' value={pass}  id='password' onChange={(e) => setLogged({ ...logged, pass: e.target.value })}/>
</FormControl>
<Button colorScheme='teal' variant='outline' style={{marginRight:10}} onClick={async ()=>{
 
  await axios.get("http://localhost:3000/users").then((res)=>{
    console.log(res.data);
    let users = res.data;
   let isLogged = users.find((user)=> user.username === name && user.password === pass)
    if ( isLogged){
      setLogged({name:'', pass:''})
      localStorage.setItem("logIN", JSON.stringify(isLogged));
      console.log(isLogged);
        console.log('Login status changed:', isLogged);
     
      setUser(isLogged)
      setLogin(true)
      
    }
    else{
      console.log('invalid');
    }
  })
navigate("/Users")
  
}}>
    Log in
  </Button>

  <Button colorScheme='teal' variant='outline' onClick={()=>{
    setLogin(false) 
  }}>
    Register
  </Button>
   </>

  )
}

export default Login