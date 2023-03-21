import React from "react";
import {Link} from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

function NavBar() {

    return(
        <Navbar expand="md">
            <Container>
                <Navbar.Brand href="/about">Рецептовик</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav-items ms-auto justify-content-start">
                        <Nav.Link as={Link} className="nav-item" to="/recipes">Рецепты</Nav.Link>
                        <Nav.Link as={Link} className="nav-item" to="/products">Продукты</Nav.Link>
                        <Nav.Link as={Link} className="nav-item" to="/tags">Теги</Nav.Link>
                        <Nav.Link as={Link} className="nav-item" to="/calculate">Калькулятор питания</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} className="nav-item text-center" to="/profile">Личный кабинет</Nav.Link>
                        <Button className="button-exit button-transparent">
                                Выход
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;