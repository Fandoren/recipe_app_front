import React, {useState} from "react";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'


function TagModalUpdate({show, handleClose, tag, setTag, update, setShow, updateImage}) {

    const[imageToDisplay, setImageToDisplay] = useState('data:image/jpeg;base64,' + tag.image)
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

    const updateTag = () => {
        if (imageData) {
            updateImage(tag.entityId, imageData)
        }
        const newTag = {
            entityId: tag.entityId,
            name: tag.name,
            description: tag.description
        }
        update(newTag)
        setShow(false);
    }

    return (
        <Modal show={show} onHide={undoCnahges}>
            <Modal.Header closeButton>
                <Modal.Title>Изменение тега</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="tag__form__image">
                        <Form.Label>Изображение тега</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Загрузите изображение"
                            onChange={(e) => uploadImage(e.target.files[0])}
                        />
                        <Container className="image__modal__container">
                            <Image className='tag__modal__image' src={imageToDisplay}/>
                        </Container>
                    </Form.Group>
                    <Form.Group className="tag__form__name">
                        <Form.Label>Название тега</Form.Label>
                        <Form.Control
                            type="textarea"
                            placeholder="Введите название"
                            value={tag.name}
                            onChange={e => setTag({ ...tag, name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="tag__form__description">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            type="textarea"
                            placeholder="Введите описание тега"
                            value={tag.description}
                            onChange={e => setTag({ ...tag, description: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={undoCnahges}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={updateTag}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
        )
    }

export default TagModalUpdate;