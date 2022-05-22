import React, {useState} from "react";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'

function TagModalCreate({create}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[tag, setTag] = useState({name: '', description: '', image: ''});
    const[imageData, setImageData] = useState(null);
    const[imageToDisplay, setImageToDisplay] = useState('')

    const addNewTag = () => {
        const newTag = {
            name: tag.name,
            description: tag.description,
        }
        create(newTag, imageData);
        setTag({name: '', description: '', image: null})
        setShow(false);
    }

    const uploadImage = (file) => {
        const imageData = new FormData();
        imageData.append("image", file);
        setImageData(imageData)
        setImageToDisplay(URL.createObjectURL(file));
    }

    return(
        <div className="d-flex justify-content-center">
            <Button className="mt-3" variant="primary" onClick={handleShow}>
                Создание нового тега
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание нового тега</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="tag__form__image">
                            <Form.Label>Изображение тега</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*" 
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
                                onChange={e => setTag({...tag, name : e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="tag__form__description">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control 
                                type="textarea" 
                                placeholder="Введите описание тега"
                                value={tag.description}
                                onChange={e => setTag({...tag, description: e.target.value})}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={addNewTag}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TagModalCreate;