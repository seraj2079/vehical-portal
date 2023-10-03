import React from 'react'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../images/images.jpeg';
// import '../../css/dashboardcss.css';

const Dashboard = () => {

    return (
        <>
            <Navbar collapseOnselect expand="lg"
                style={{ backgroundColor: "#0B0B45" }}>
                <img className='rounded-circle border border-light m-2' src="image.jpeg"
                    style={{ height: "40px", width: "40px", borderRadius: "30" }} />
                <Navbar.Brand className='text-light'>
                    GadiyoKaMela
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'
                    style={{ backgroundColor: "#ff0000", marginRight: '10px' }} />
                <Navbar.Collapse id='reasponsive-navbar-nav'>

                    <Nav className="m-2">
                        <NavLink as={NavLink} to={"/home"} className="text-danger">
                            <label> Home </label>
                        </NavLink>
                    </Nav>
                    <Nav className='mr-auto' >
                        <NavDropdown title="location" id='nav-dropdown-title'>
                            <NavDropdown.Item>
                                <NavLink to="/state_regis">
                                    <label>State</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/city_regis">
                                    <label>City</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/area_regis">
                                    <label>Area</label>
                                </NavLink>
                            </NavDropdown.Item>

                        </NavDropdown>
                    </Nav>

                    <Nav className='mr-auto'>
                        <NavDropdown title="Report" id='nav-dropdown-title'>
                            <NavDropdown.Item>
                                <NavLink to="/state_report">
                                    <label>State Report</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/city_report">
                                    <label>City Report</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/area_report">
                                    <label>Area Report</label>
                                </NavLink>
                            </NavDropdown.Item>

                            <NavDropdown.Item>
                                <NavLink to="/dashboard_admin">
                                    <label>Registration report</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/showroom_report">
                                    <label>Shoptype</label>
                                </NavLink>
                            </NavDropdown.Item>

                        </NavDropdown>
                    </Nav>
                    <Nav className='mr-auto' >
                        <NavDropdown title="component" id='nav-dropdown-title'>
                            <NavDropdown.Item>
                                <NavLink to="/showroom">
                                    <label>Shoptype</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/member_regis">
                                    <label>MemberType</label>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to="/member_report">
                                    <label>Member Report</label>
                                </NavLink>
                            </NavDropdown.Item>

                        </NavDropdown>
                    </Nav>

                    <Nav className='mr-2' >
                        <NavLink as={NavLink} to={"/"} title="Logout" id='nav-dropdown-title'>
                            <label>Logout</label>
                        </NavLink>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>


        </>
    );

}
export default Dashboard;