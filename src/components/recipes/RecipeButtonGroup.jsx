import React, {useState} from "react";
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import {useNavigate} from "react-router-dom";
import RecipeModalUpdate from "./RecipeModalUpdate";

function RecipeButtonGroup({item, remove, update, updateImage}) {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[recipe, setRecipe] = useState(
        {   entityId: item.entityId, 
            name: item.name, 
            description: item.description, 
            image: item.imageAsByteArray,
            ingredients: item.ingredients,
            cookingTime: item.cookingTime,
            prepTime: item.prepTime,
            calories: item.calories,
            steps: item.steps,
            tagIds: item.tagIds,
            author: item.author
        });

    return (
        <ButtonGroup vertical>
            <Button onClick={() => navigate("/recipes/" + item.entityId)} variant='primary'>Открыть</Button>
            <Button variant="primary" onClick={handleShow}>
                Изменить
            </Button>
            <RecipeModalUpdate show={show} handleClose={handleClose} recipe={recipe} setRecipe={setRecipe} update={update} updateImage={updateImage} setShow={setShow}/>
            <Button onClick={() => remove(item)} variant='primary'>Удалить</Button>
        </ButtonGroup>
    )
}

export default RecipeButtonGroup;