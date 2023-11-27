  import React from 'react';
  import { Row } from 'react-bootstrap';
  import { Link, Outlet } from 'react-router-dom';

  function Layout() {
    return (
      <>
        <div className="navbar">
          <Row>
            <ul className="navigationList">
              <li>
                <Link to="/">Log In</Link>
              </li>
              <li>
                <Link to="/Register">Register</Link>
              </li>
              <li>
                <Link to="/Users">Users</Link>
              </li>
              <li>
                <Link to="/Requests">Requests</Link>
              </li>
              <li>
                <Link to="/BlockedUsers">BlockedUsers</Link>
              </li>
            </ul>
          </Row>
        </div>
        <Outlet />
      </>
    );
  }

  export default Layout;
