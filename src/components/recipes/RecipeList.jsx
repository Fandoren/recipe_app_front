import React from "react";
import RecipeItem from './RecipeItem'
import Row from 'react-bootstrap/Row'

function RecipeList({recipes, remove, update, updateImage}) {
    if(recipes === undefined || !recipes.length) {
        return (
        <h1 style={{textAlign: "center"}}>
            Рецепты не найдены!
        </h1>
        )
    }

    return (
        <div className="recipe__list">
            <h1 style={{textAlign: "center"}}>Список рецептов</h1>
            <Row className="recipe__list__content">
                {recipes.map((recipe) => 
                <RecipeItem remove={remove} update={update} updateImage={updateImage} recipe={recipe} key={recipe.entityId}/>)}
            </Row>
        </div>
    );
}

export default RecipeList;