import React from 'react';
import { useState } from "react";
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import ImageInputPreview from '../util/ImageInputPreview';

function TagCreatePage() {

    const [images, setImages] = useState([]);

    function handleImagesChange(e) {
        setImages(e.target.files);
    }

    function onBackButtonClick(e) {
        console.log("Возврат назад");
    }

    return(
        <Container className='create-page'>
            <Button onClick={onBackButtonClick} className='create-back-button'>
                <FontAwesomeIcon icon={faCircleLeft} /> Назад
            </Button>
            <Row className='justify-content-center create-title'>
                Создание тега
            </Row>
            <Row className='justify-content-center create-main-row'>
                <Container className='create-container'>
                    <Row className='justify-content-center'>
                        <Col lg={11}>
                            <Form className='create-form'>
                                <Form.Group className="mb-3 name" controlId="tagImages">
                                    <Form.Label>Изображения для тега</Form.Label>
                                    <Form.Control 
                                        className="mb-3"
                                        type="file" 
                                        multiple 
                                        placeholder="Выберите изображения"
                                        onChange={handleImagesChange}
                                    />
                                    <ImageInputPreview
                                        images={images} 
                                        setImages={setImages}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 name" controlId="tagName">
                                    <Form.Label>Наименование тега</Form.Label>
                                    <Form.Control type="text" placeholder="Введите наименование тега" />
                                </Form.Group>
                                <Form.Group className="mb-3 description" controlId="tagDescription">
                                    <Form.Label>Описание тега</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                                <Row className='flex-row-reverse'>
                                    <Col className='p-0' lg={2}>
                                        <Button className='w-100' variant="primary" type="submit">
                                            Сохранить
                                        </Button>
                                    </Col>                            
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    )

}

export default TagCreatePage;