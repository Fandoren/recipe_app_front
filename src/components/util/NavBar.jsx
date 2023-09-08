import React from "react";
import {Link} from "react-router-dom";
import { Container, Navbar, Nav, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';


function NavBar() {

    return(
        <Navbar expand="md">
            <Container fluid>
                <Navbar.Brand href="/about" className="header2-bold align-middle">Рецептовик</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Row className="flex-fill">
                        <Col>
                            <Nav className="nav-items justify-content-center">
                                <Nav.Link as={Link} className="nav-item header3-bold" to="/recipes">Рецепты</Nav.Link>
                                <Nav.Link as={Link} className="nav-item header3-bold" to="/products">Продукты</Nav.Link>
                                <Nav.Link as={Link} className="nav-item header3-bold" to="/tags">Теги</Nav.Link>
                                <Nav.Link as={Link} className="nav-item header3-bold" to="/calculate">Калькулятор питания</Nav.Link>
                            </Nav>
                        </Col>
                        <Col className="col-2">
                            <Nav>
                                <Nav.Link to="/profile">
                                    <Button className="button-profile" >
                                        <FontAwesomeIcon icon={faUser}/> Личный кабинет
                                    </Button>
                                </Nav.Link>
                            </Nav>
                        </Col>                                        
                    </Row>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;