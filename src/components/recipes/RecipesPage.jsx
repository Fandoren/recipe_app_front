import React from 'react';
import { Container, Row } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import RecipesSearch from './RecipesSearch';
import AdvancedRecipeSearch from './AdvancedRecipeSearch';
import data from '../../resources/testRecipeData.json'
import SearchResults from '../util/SearchResults';

function RecipesPage() {

    const navigate = useNavigate();

    function showRecipe(recipe) {
        navigate("/recipes/" + recipe.entityId);
    }

    return(
        <Container>
            <RecipesSearch/>
            <Row>
                <span className='search-text text-center'>
                    или введите желаемые продукты и количество, мы подберём рецепт для Вас!
                </span>
            </Row>
            <AdvancedRecipeSearch/>
            <SearchResults items={data} clickFunction={showRecipe}/>
        </Container>
    )
}

export default RecipesPage;