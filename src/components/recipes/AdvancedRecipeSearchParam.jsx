import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

function AdvancedRecipeSearchParam({deleteFunction}) {
  return (
    <Row className="advanced-search-item justify-content-center">
        <Col xs={3} className="product-name-input">
            <Row className="align-items-center">
                <Col xs={3}>
                    <span className="advanced-search-item-text">Продукт</span>
                </Col>
                <Col xs={9}>
                    <Form.Control
                        className="product-name-input-field"
                        type="text"
                        placeholder="Введите продукт..."
                    />
                </Col>
            </Row>
        </Col>
        <Col xs={3} className="product-amount-input">
            <Row className="align-items-center">
                <Col xs={3}>
                    <span className="advanced-search-item-text">Количество</span>
                </Col>
                <Col xs={9}>
                    <Form.Control
                    className="product-amount-input-field"
                    type="number"
                    placeholder="Введите количество..."
                    />
                </Col>
            </Row>
        </Col>
        <Col xs={3} className="product-unit-input">
            <Row className="align-items-center">
                <Col xs={3}>
                    <span className="advanced-search-item-text">Ед. изм.</span>
                </Col>
                <Col xs={9}>
                    <Form.Control
                    className="product-unit-input-field"
                    type="text"
                    placeholder="Введите ед. измерения..."
                    />
                </Col>
            </Row>
        </Col>
      <Col xs={1} className="product-delete-button">
            <Button className="delete-button" onClick={deleteFunction}>
                <FontAwesomeIcon icon={faTrashCan} />
            </Button>
      </Col>
    </Row>
  );
}

export default AdvancedRecipeSearchParam;
