import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function ProductsSearch() {

    return(
        <Container className='search-box'>
            <Row className='search-text text-center'>
                <span>Введите название интересующего Вас продукта</span>
            </Row>
            <Form className='search-form'>
                <Row className='justify-content-center'>
                    <Col xs={8} lg={8} className='name-input'>
                        <Form.Control className='name-input-field' type="text" placeholder="Введите название..." />
                    </Col>   
                    <Col xs={1}>
                        <Button className='search-button' type="submit">
                            Поиск
                        </Button>
                    </Col> 
                </Row>
            </Form>
        </Container>
    )

}

export default ProductsSearch;