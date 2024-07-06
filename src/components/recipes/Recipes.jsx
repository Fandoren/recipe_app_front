import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import RecipeCard from "./RecipeCard/RecipeCard";

export default function Recipes() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={3}>
          <RecipeCard />
        </Col>
        <Col md={3}>
          <RecipeCard />
        </Col>
        <Col md={3}>
          <RecipeCard />
        </Col>
      </Row>
    </Container>
  );
}
