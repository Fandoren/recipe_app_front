import React from 'react';
import { Container, Row } from 'react-bootstrap';
import RecipesSearch from './RecipesSearch';
import AdvancedRecipeSearch from './AdvancedRecipeSearch';
import data from '../../resources/testProductData.json'
import SearchResults from '../util/SearchResults';

function RecipesPage() {
    return(
        <Container>
            <RecipesSearch/>
            <Row>
                <span className='search-text text-center'>
                    или введите желаемые продукты и количество, мы подберём рецепт для Вас!
                </span>
            </Row>
            <AdvancedRecipeSearch/>
            <SearchResults items={data}/>
        </Container>
    )
}

export default RecipesPage;