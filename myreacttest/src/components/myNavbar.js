import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

class MyNavbar extends Component{

    constructor() 
    {
      super();
      this.state = {
        newTodo: "",
        todos: [],
        test: [<b>deneme</b>, <b>deneme</b>]
      };
    };


    render = () => 
    (
        <Navbar id="navbar" collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="#home">Genç Adam</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="hakkimizda">Hakkımızda</Nav.Link>
            <Nav.Link href="yazarlar">Yazarlar</Nav.Link>
            <Nav.Link href="sayilar">Sayılar</Nav.Link>
            <Nav.Link href="gundem">Gündem</Nav.Link>
            <Nav.Link href="sizdengelenler">Sizden Gelenler</Nav.Link>
            
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Nav>
            <Nav.Link href="#iletisim">İletişim</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
                Dank memes
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
        
}

export default MyNavbar;


