import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/pages/Layout";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Users from "./components/pages/Users";
import ButtonAppBar from "./components/pages/Header";
import Requests from "./components/pages/Requests";
import BlockedUsers from "./components/pages/BlockedUsers";
function App() {
  let [login, setLogin] = useState(false);
  let [register, setRegister] = useState([]);
  let [users, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users"  )
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  return (
   <>
   
   <ButtonAppBar/>

<ChakraProvider>
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login setLogin={setLogin} setUser={setUser} />} />
          <Route
            path="Users"
            element={
              login ? (
                <>
                <Users users={users} setUser={setUser} login={login} setLogin={setLogin} />
                </>
              ) : (
                <Login setLogin={setLogin} login={login} setUser={setUser} />
              )
            }
          />
          
          <Route path="Register" element={<Register />} />
          <Route path="Requests" element={<Requests />} />
          <Route path="BlockedUsers" element={<BlockedUsers />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  
</ChakraProvider>
   </>
  );
}

export default App;
