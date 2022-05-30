import React, {useState} from "react";
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import {useNavigate} from "react-router-dom";
import TagModalUpdate from "./TagModalUpdate";

function TagButtonGroup({item, remove, update, updateImage}) {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[tag, setTag] = useState({entityId: item.entityId, name: item.name, description: item.description, image: item.imageAsByteArray});

    return (
        <ButtonGroup vertical>
            <Button onClick={() => navigate("/tags/" + item.entityId)} variant='primary'>Открыть</Button>
            <Button variant="primary" onClick={handleShow}>
                Изменить
            </Button>
            <TagModalUpdate show={show} handleClose={handleClose} tag={tag} setTag={setTag} update={update} updateImage={updateImage} setShow={setShow}/>
            <Button onClick={() => remove(item)} variant='primary'>Удалить</Button>
        </ButtonGroup>
    )
}

export default TagButtonGroup;