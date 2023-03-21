import React from 'react';
import { Container, Row, Button} from 'react-bootstrap';
import SearchResults from '../util/SearchResults';
import {useNavigate} from "react-router-dom";
import data from '../../resources/testRecipeData.json'

function RecipeTab() {
    const navigate = useNavigate();

    function addRecipe() {
        navigate("/recipes/createRecipe");
    };

    function showRecipe(recipe) {
        navigate("/recipes/" + recipe.entityId);
    }

    return(
        <Container className='recipe-page-info'>
            <Row className='justify-content-center'>
                <Button onClick={addRecipe} className='w-50 mt-3'>
                    Добавить рецепт
                </Button>
            </Row>
            <Row>
                <SearchResults items={data} clickFunction={showRecipe}/>
            </Row>
        </Container>
    )
}

export default RecipeTab;