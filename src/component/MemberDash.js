import React from "react";
import {  Navbar,NavDropdown,Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavLink } from "react-router-dom";

const MemberDash = ( ) => {
    return(
        <>

        <Navbar collapseOnSelect expand="lg"
         style ={{backgroundColor:"#0B0B45"}}>
             <img className='rounded-circle border border-light m-2'src="image.jpeg"
            style={{height:"40px",width:"40px",borderRadius:"30"}}/>
            <Navbar.Brand className='text-light'>
              GadiyoKaMela
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='responsive-navbar-nav'
             style={{backgroundColor:"#ff0000",marginRight:'10px'}}/>
              <Navbar.Collapse id='responsive-navbar-nav'>
        
              <Nav className='mr-auto'>
               <NavDropdown  title ="Report" id='nav-dropdown-title'>
                <NavDropdown.Item>
                    <NavLink to="/regisreport">
                        <label>App User</label>
                    </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <NavLink to="/register">
                        <label>Registration</label>
                    </NavLink>
                </NavDropdown.Item>
               
               </NavDropdown>
            </Nav>
            <Nav className="m-2">
                    <NavLink  as={NavLink}to={"/"} className="text-danger">
                       <label>  SignOut </label> 
                    </NavLink>

                </Nav>


              </Navbar.Collapse>
        </Navbar>
        </>

        
    );
}
export default MemberDash;