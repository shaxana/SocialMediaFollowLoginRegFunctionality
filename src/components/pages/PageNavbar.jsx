import React from "react";
import { Container, Row } from "react-bootstrap";
function Pagenavbar() {
  return (
    <Container>
      <Row>
        <div className="navbar">
          <ul className="navigationList"> 
            <li> <a href="./Login" >Log In</a></li>
            {/* <li><a href="./Register" >Register</a></li> */}
            <li> <a href="./Users"  > Users</a></li>

          </ul>
         
        </div>
      </Row>
    </Container>
  );
}

export default Pagenavbar;
