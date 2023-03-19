import React from "react";
import {Link} from "react-router-dom";
import { Container, Navbar, Nav, Button, Row, Col } from "react-bootstrap";

function NavBar() {

    return(
        <Navbar expand="md">
            <Container>
                <Navbar.Brand to="/about">Лого</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav-items ms-auto justify-content-start">
                        <Nav.Link as={Link} className="nav-item" to="/recipes">Рецепты</Nav.Link>
                        <Nav.Link as={Link} className="nav-item" to="/products">Продукты</Nav.Link>
                        <Nav.Link as={Link} className="nav-item" to="/tags">Теги</Nav.Link>
                        <Nav.Link as={Link} className="nav-item" to="/calculate">Калькулятор питания</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link>
                            <Button className="button-profile button-transparent">
                                Личный кабинет
                            </Button>
                            <Button className="button-exit button-transparent">
                                Выход
                            </Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;