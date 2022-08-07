import React, {useState, Suspense} from "react";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import { components } from "react-select";
import { default as ReactSelect } from "react-select";


function ProductModalUpdate({show, handleClose, product, setProduct, update, setShow, updateImage, tagOptions}) {

    const[imageToDisplay, setImageToDisplay] = useState('data:image/jpeg;base64,' + product.image)
    const[imageData, setImageData] = useState(null);
    const [optionSelected, setOptionSelected] = useState(null);
    const handleChange = (selected) => {
        setOptionSelected(selected);
      };

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
        } else {
          fetch(imageToDisplay)
          .then(res => res.blob())
          .then(blob => {
            const fd = new FormData();
            const file = new File([blob], "filename.jpeg");
            fd.append('image', file);
            updateImage(product.entityId, fd)
          })
          
        }
        const tagIds = optionSelected.map((option) => option.value)
        const newproduct = {
            entityId: product.entityId,
            image: product.image,
            name: product.name,
            description: product.description,
            tagIds: tagIds
        }
        update(newproduct)
        setShow(false);
    }

    const Option = (props) => {
        return (
          <div>
            <components.Option {...props}>
              <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => null}
              />{" "}
              <label>{props.label}</label>
            </components.Option>
          </div>
        );
      };

    function TagList() {
        if(tagOptions === undefined) {
            return <h1>Тэги грузятся</h1>
        }
        return (
          <Form.Group>
            <Form.Label>Теги</Form.Label>
            <span
              data-toggle="popover"
              data-trigger="focus"
              data-content="Пожалуйста, выберите теги"
            >
              <ReactSelect
                options={tagOptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option,
                }}
                onChange={handleChange}
                allowSelectAll={true}
                value={optionSelected}
              />
            </span>
          </Form.Group>
        );
      }
      

    return (
        <Modal show={show} onHide={undoCnahges}>
            <Modal.Header closeButton>
                <Modal.Title>Изменение продукта</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="product__form__image">
                        <Form.Label>Изображение продукта</Form.Label>
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
                        <Form.Label>Название продукта</Form.Label>
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
                    <Suspense>
                        <TagList/>
                    </Suspense>
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