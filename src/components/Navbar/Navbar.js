import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavMenu = ({isLoggedIn}) => {
    const [navLoggedIn, setNavLoggedIn] = useState(null)


    function logOut() {
        localStorage.removeItem("user")
    }

    useEffect(() => {
        console.log(isLoggedIn)
        if (isLoggedIn) {
            setNavLoggedIn(<Nav>
                <Nav.Link href="/" onClick={logOut}>Log out</Nav.Link>
                </Nav>)
        }
    }, [isLoggedIn])

    return (
    <Navbar className="navColor" variant="light" expand="lg">
    <Navbar.Brand href="/">StockTrading</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/trading">Trading</Nav.Link>
        </Nav>
        {navLoggedIn}
    </Navbar.Collapse>
    </Navbar>
    );
};

export default NavMenu;
