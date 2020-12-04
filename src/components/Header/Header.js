import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const navBarTextStyle = {
  color: 'white'
}

// const navBarHomeStyle = {
//   color: 'white',
//   borderRadius: '30%'
// }

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password" style={navBarTextStyle}>Change Password</Nav.Link>
    <Nav.Link href="#sign-out" style={navBarTextStyle}>Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up" style={navBarTextStyle}>Sign Up</Nav.Link>
    <Nav.Link href="#sign-in" style={navBarTextStyle}>Sign In</Nav.Link>
  </Fragment>
)

// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link href="#/">Home</Nav.Link>
//   </Fragment>
// )

const welcomeMessageStyle = {
  color: 'white',
  padding: '10px',
  fontFamily: 'Arial',
  fontSize: '25px',
  position: 'absolute',
  top: '10%',
  left: '25%',
  backgroundColor: 'black',
  borderRadius: '25%'
}

const Header = ({ user }) => (
  <Navbar variant="dark" expand="md">
    {/* <Navbar.Brand href="#" style={navBarHomeStyle}>
      Home
    </Navbar.Brand> */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2" style={welcomeMessageStyle}>Welcome, {user.email}</span>}
        {/* { alwaysOptions } */}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
