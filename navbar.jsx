import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';


function NavbarItem({ Mode }) {
    const [mode, setmode] = useState("dark");
    const onModeChange = (date) => {
        if (mode == "dark") {
            setmode("light");
        }
        else {
            setmode("dark");
        }
        Mode(mode);
    };
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="#Todo">Ten Ten</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#Todo">TODO APP</Nav.Link>
                    <Nav.Link href="#News">News</Nav.Link>
                    <Nav.Link href="#Notepad">Notepad</Nav.Link>
                </Nav>
            </Container>
            <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Dark Mode"
                    onChange={onModeChange}
                />
            </Form>
        </Navbar>
    );
}

export default NavbarItem;