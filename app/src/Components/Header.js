import React from "react"
import { Navbar, Container, NavDropdown } from "react-bootstrap";
const Header = ({ users = [], activeUser }) => {
    return (<div>
        <Navbar>
            <Container>
                <Navbar.Brand href="#home">Ecom</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">{activeUser}</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>)
}

export default Header;