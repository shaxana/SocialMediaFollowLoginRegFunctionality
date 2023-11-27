  import React, { useEffect, useState } from "react";
  import { Col, Row } from "antd";
  import { Avatar, Card } from "antd";
  import axios from "axios";
  import { Button } from "react-bootstrap";
import { filter } from "@chakra-ui/react";
  const { Meta } = Card;
  function Users() {
  let [users, setUser] = useState([]);
  let [followers,setFollowers] = useState([])
  let logged = JSON.parse(localStorage.getItem("logIN"))
  useEffect(() => {
    axios("http://localhost:3000/users").then((res) => {
      setUser(res.data);
    });
  }, []);
  let [search, setSearch] = useState("")
  let filteredUsers = (users.filter(((user)=>user.username.trim().toLowerCase().includes(search.trim().toLowerCase()))))
let [blockedUsers, setBlockedUsers] = useState([])
let notBlockedUsers = filteredUsers.filter(
  (filteredUser) => !blockedUsers.map((blockedUser) => blockedUser.id).includes(filteredUser.id)
);
  return (
    <>
    
<input type="text" placeholder="search user..." onKeyUp={(e)=>{
setSearch(e.target.value)
}}/>



      <Row>
        { filteredUsers.map((user)=>(

       
        
          user.id !== logged.id && (
            <Col
            key={user.id}
            xs={{
              span: 5,
              offset: 1,
            }}
            lg={{
              span: 6,
              offset: 2,
            }}
          >
            <Card
              style={{
                width: 300,
              }}
              cover={
                <img
                  alt="example"
                  src="https://www.pngkit.com/png/detail/72-729913_user-blank-avatar-png.png"
                />
              }
              actions={[ logged.friends.map((friend) => friend.id).includes(user.id) ? (<p style={{color:'green', fontWeight:700}}>Friends</p>) :(<Button id={user.id} onClick={()=>{
                setFollowers([...followers,user])
                axios.patch(`http://localhost:3000/users/${user.id}`,{
                  requests: [...logged.requests,logged]
                }).then((res)=>{
                 console.log(res.data);
                })
               
              }}>Follow</Button>), <p>Unfollow</p>, logged.friends.map((friend) => friend.id).includes(user.id) ?  (<Button id={user.id} onClick={()=>{
                setBlockedUsers([...blockedUsers, user]);
                console.log(blockedUsers);
                localStorage.setItem("blockedUser", JSON.stringify([...blockedUsers,user]))
                axios.patch(`http://localhost:3000/users/${user.id}`,{
                  blockedusers: [...logged.blockedusers,blockedUsers]
                }).then((res)=>{
                 console.log(res.data);
                })
              }} >Block</Button>) : (<Button disabled>Block</Button>)]}
            >
              <Meta
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                }
                title={user.username}
                
              />
            </Card>
          </Col>
          )
         
         ))}
      </Row>
    </>
  );
  }
  export default Users;
