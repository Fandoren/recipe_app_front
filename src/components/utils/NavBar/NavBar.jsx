import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Person } from "react-bootstrap-icons/";
import styles from "components/utils/NavBar/NavBar.module.scss";

export default function NavBar() {
  return (
    <Navbar className={styles.navbar_main} expand="lg">
      <Container className={styles.container_main} fluid>
        <Navbar.Brand className={styles.brand_text} href="#home">
          <h2>Рецептовик</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          className={styles.navbar_collapse}
          id="basic-navbar-nav"
        >
          <Container>
            <Nav className="align-items-center">
              <Nav.Link className={`${styles.link_text} mx-1`} href="#recipes">
                Рецепты
              </Nav.Link>
              <Nav.Link className={`${styles.link_text} mx-1`} href="#products">
                Продукты
              </Nav.Link>
              <Nav.Link className={`${styles.link_text} mx-1`} href="#section">
                Разделы
              </Nav.Link>
              <Nav.Link
                className={`${styles.link_text} mx-1`}
                href="#calculator"
              >
                Калькулятор питания
              </Nav.Link>
            </Nav>
          </Container>
          <Container className="px-5">
            <Nav className="align-items-center justify-content-end">
              <Button variant="dark">
                <Person className={styles.btn_icon} />
                Личный кабинет
              </Button>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
