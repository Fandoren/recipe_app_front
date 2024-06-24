import React from "react";
import { Col, Container, Stack, Row } from "react-bootstrap";
import styles from "components/utils/Footer/Footer.module.scss";
import { EnvelopeFill, Telegram, Whatsapp } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className={`${styles.footer_main} py-4 position-static bottom-0`}>
      <Container fluid className="text-center text-md-left">
        <Row>
          <Col lg={2} className="">
            <h2>Рецептовик</h2>
          </Col>

          <hr className="clearfix w-100 d-lg-none pb-0" />

          <Col lg={2} className="mb-lg-0 mb-3">
            <Stack>
              <Link
                to="/recipes"
                className={`${styles.link_text} p-2 text-lg-start`}
              >
                Рецепты
              </Link>
              <Link
                to="/products"
                className={`${styles.link_text} p-2 text-lg-start`}
              >
                Продукты
              </Link>
              <Link
                to="/section"
                className={`${styles.link_text} p-2 text-lg-start`}
              >
                Разделы
              </Link>
              <Link
                to="/calculator"
                className={`${styles.link_text} p-2 text-lg-start`}
              >
                Кальулятор питания
              </Link>
              <Link to="" className={`${styles.link_text} p-2 text-lg-start`}>
                Личный кабинет
              </Link>
            </Stack>
          </Col>

          <hr className="clearfix w-100 d-lg-none pb-0" />

          <Col lg={2} className="mb-md-0 mb-3">
            <Stack
              direction="horizontal"
              className="justify-content-center justify-content-lg-start"
              gap={3}
            >
              <Link to="/mailLink">
                <EnvelopeFill
                  className={`${styles.contact_icon} mx-xs-auto`}
                ></EnvelopeFill>
              </Link>
              <Link to="/telegramLink">
                <Telegram
                  className={`${styles.contact_icon} mx-xs-auto`}
                ></Telegram>
              </Link>
              <Link to="WhatsappLink">
                <Whatsapp
                  className={`${styles.contact_icon} mx-xs-auto`}
                ></Whatsapp>
              </Link>
            </Stack>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
