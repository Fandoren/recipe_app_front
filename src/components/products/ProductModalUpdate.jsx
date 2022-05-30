import React, {useState} from "react";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'


function ProductModalUpdate({show, handleClose, product, setProduct, update, setShow, updateImage}) {

    const[imageToDisplay, setImageToDisplay] = useState('data:image/jpeg;base64,' + product.image)
    const[imageData, setImageData] = useState(null);

    const undoCnahges = () => {
        setImageToDisplay('');
        handleClose();
    }

    const uploadImage = (file) => {
        const imageData = new FormData();
        imageData.append("image", file);
        setImageData(imageData)
        setImageToDisplay(URL.createObjectURL(file));
    } 

    const updateProduct = () => {
        if (imageData) {
            updateImage(product.entityId, imageData)
        }
        const newproduct = {
            entityId: product.entityId,
            name: product.name,
            description: product.description
        }
        update(newproduct)
        setShow(false);
    }

    return (
        <Modal show={show} onHide={undoCnahges}>
            <Modal.Header closeButton>
                <Modal.Title>Изменение тега</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="product__form__image">
                        <Form.Label>Изображение тега</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Загрузите изображение"
                            onChange={(e) => uploadImage(e.target.files[0])}
                        />
                        <Container className="image__modal__container">
                            <Image className='product__modal__image' src={imageToDisplay}/>
                        </Container>
                    </Form.Group>
                    <Form.Group className="product__form__name">
                        <Form.Label>Название тега</Form.Label>
                        <Form.Control
                            type="textarea"
                            placeholder="Введите название"
                            value={product.name}
                            onChange={e => setProduct({ ...product, name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="product__form__description">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            type="textarea"
                            placeholder="Введите описание тега"
                            value={product.description}
                            onChange={e => setProduct({ ...product, description: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={undoCnahges}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={updateProduct}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
        )
    }

export default ProductModalUpdate;