import React, {useState} from "react";
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import {useNavigate} from "react-router-dom";
import ProductModalUpdate from "./ProductModalUpdate";

function ProductButtonGroup({item, remove, update, updateImage, tagOptions}) {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[product, setproduct] = useState({entityId: item.entityId, name: item.name, description: item.description, image: item.imageAsByteArray, tagIds: item.tagIds});

    return (
        <ButtonGroup vertical>
            <Button onClick={() => navigate("/products/" + item.entityId)} variant='primary'>Открыть</Button>
            <Button variant="primary" onClick={handleShow}>
                Изменить
            </Button>
            <ProductModalUpdate show={show} handleClose={handleClose} product={product} setProduct={setproduct} update={update} updateImage={updateImage} tagOptions={tagOptions} setShow={setShow}/>
            <Button onClick={() => remove(item)} variant='primary'>Удалить</Button>
        </ButtonGroup>
    )
}

export default ProductButtonGroup;