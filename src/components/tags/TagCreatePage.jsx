import React from 'react';
import { useState } from "react";
import { Container, Row, Col, Form } from 'react-bootstrap';
import ImageInputPreview from '../util/ImageInputPreview';

function TagCreatePage() {

    const [images, setImages] = useState([]);

    function handleImagesChange(e) {
        setImages(e.target.files);
    }

    return(
        <Container className='tag-create-page'>
            <Row className='justify-content-center create-main-row'>
                <Container className='create-container'>
                    <Row className='justify-content-center'>
                        <Col lg={11}>
                            <Form className='create-form'>
                                <Form.Group className="mb-3 name" controlId="tagImages">
                                    <Form.Label>Изображения для тега</Form.Label>
                                    <Form.Control 
                                        type="file" 
                                        multiple 
                                        placeholder="Выберите изображения"
                                        onChange={handleImagesChange}
                                    />
                                    <ImageInputPreview images={images} setImages={setImages}/>
                                </Form.Group>
                                <Form.Group className="mb-3 name" controlId="tagName">
                                    <Form.Label>Наименование тега</Form.Label>
                                    <Form.Control type="text" placeholder="Введите наименование тега" />
                                </Form.Group>
                                <Form.Group className="mb-3 description" controlId="tagDescription">
                                    <Form.Label>Описание тега</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    )

}

export default TagCreatePage;