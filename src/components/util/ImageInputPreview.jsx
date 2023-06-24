import React from "react";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

function ImageInputPreview({images, setImages}) {

    //TODO: Сделать открытие картинки по клику
    //TODO: Переделать метод удаления изображения
    //TODO: Попробовать сделать как единый элемент (Не дефолтный input файлов, оставить только кнопку)

    function deleteImage(deletedImage) {
        let newImages = new DataTransfer();
        
        Array.from(images).forEach((image) => {
            if(image.name !== deletedImage.name &&
                image.size !== deletedImage.size) {
                    newImages.items.add(image);
                }
        })

        setImages(newImages.files);
    }

    function ImagePreview () {
        if (images && images.length > 0) {
            return (
                <Row>
                    {Array.from(images).map((image) => 
                        <Col className="image-preview-col align-self-center" xs={4} lg={3} key={"ImagePreviewCol-" + image.name + "-" + image.size}>
                            <Row className="justify-content-center p-0">
                                <Image 
                                    className='image-preview'
                                    src={URL.createObjectURL(image)}
                                />
                                <div className="image-preview-controls">
                                    <Row className="image-preview-buttons">
                                        <Col>
                                            <Button onClick={() => deleteImage(image)} className='delete-button fade-button'>
                                                <FontAwesomeIcon icon={faTrashCan}/> Удалить
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Row>
                        </Col>
                    )}
                </Row>
            );
        }
    }

    return (
        <Container className="image-preview-container">
            <ImagePreview/>
        </Container>
    );
}

export default ImageInputPreview;