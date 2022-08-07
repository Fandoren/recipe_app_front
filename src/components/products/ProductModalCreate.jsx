import React, { useState, useEffect, Suspense } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";

function ProductModalCreate({ create, tagOptions }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (selected) => {
    setOptionSelected(selected);
  };

  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [imageData, setImageData] = useState(null);
  const [imageToDisplay, setImageToDisplay] = useState("");
  const [optionSelected, setOptionSelected] = useState(null);

  const addNewProduct = () => {
    const tagIds = optionSelected.map((option) => option.value)
    const newProduct = {
      name: product.name,
      description: product.description,
      tagIds: tagIds
    };
    create(newProduct, imageData);
    setProduct({ name: "", description: "", image: null });
    setOptionSelected(null);
    setShow(false);
  };

  const uploadImage = (file) => {
    const imageData = new FormData();
    imageData.append("image", file);
    setImageData(imageData);
    setImageToDisplay(URL.createObjectURL(file));
  };

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
    <div className="d-flex justify-content-center">
      <Button className="mt-3" variant="primary" onClick={handleShow}>
        Создание нового продукта
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Создание нового продукта</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="product__form__image">
              <Form.Label>Изображение продукта</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                placeholder="Загрузите изображение"
                onChange={(e) => uploadImage(e.target.files[0])}
              />
              <Container className="image__modal__container">
                <Image className="product__modal__image" src={imageToDisplay} />
              </Container>
            </Form.Group>
            <Form.Group className="product__form__name">
              <Form.Label>Название продукта</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Введите название"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="product__form__description">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Введите описание"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </Form.Group>
            <Suspense>
                <TagList/>
            </Suspense>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={addNewProduct}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductModalCreate;
