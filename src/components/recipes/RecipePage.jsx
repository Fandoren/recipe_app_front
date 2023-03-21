import React from 'react';
import { Container, Image, Col, Row, Carousel } from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";
import data from '../../resources/testRecipeData.json';
import productData from '../../resources/testProductData.json';
import LabelItem from '../util/LabelItem';
import tagData from '../../resources/testTagData.json';

function RecipePage() {

    const navigate = useNavigate();
    const { id } = useParams();
    const recipe = data.filter((item) => item.entityId == id)[0];
    console.log(recipe);

    function IngredientList() {
        const ingredients = [];
        if (recipe.ingredients) {
            recipe.ingredients.forEach((ingredient) => {
                productData.forEach((product) =>  {
                    if(product.entityId == ingredient.productId) {
                        ingredients.push(Object.assign(product, ingredient));
                    }
                }
            )
            });
            return (
                <>
                    {ingredients.map((ingredient) => 
                        <Row key={"IngrRow-" + ingredient.entityId}>
                            <Col key={"IngrCol-" + ingredient.entityId + "-name"}>
                                {ingredient.name}
                            </Col>
                            <Col key={"IngrCol-" + ingredient.entityId + "-amount"}>
                                {ingredient.weight}
                            </Col>
                            <Col key={"IngrCol-" + ingredient.entityId + "-unit"}>
                                {ingredient.unit}
                            </Col>
                            <hr/>
                        </Row>
                    )}
                </>
            );
        }
    }

    function StepsList() {
        if (recipe.steps) {
            return (
                <>
                    {recipe.steps.map((step, index) => 
                        <Col key={"StepCol-" + index} xs={12} md={6} className='recipe-step-container text-center'>
                            <div className="recipe-step-padding-container">
                                <Row key={"StepRow-Header-" + index} className='recipe-headline'>
                                    <Col>
                                        Шаг {index + 1}
                                    </Col>
                                </Row>
                                <Row key={"StepRow-Image-" + index}>
                                    <Col key={"StepCol-Image-" + index}>
                                        <Image 
                                            className='recipe-step-image'
                                            src={require('../../resources/3Hw82sAa0o4.jpg')}
                                        />
                                    </Col>
                                </Row>
                                <Row key={"StepRow-Desc-" + index}>
                                    <Col key={"StepCol-Desc-" + index} className='recipe-step-description'>
                                        {step.description}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    )}
                </>
            );
        }
    }

    return(
        <Container>
            <Row className="recipe-header-container text-center">
                <Col xs={12} className='recipe-name-text'>
                    {recipe.name}
                </Col>
                <Col xs={12} className='recipe-description-text'>
                    {recipe.description}
                </Col>
                <Col className='recipe-author-container'>
                    Какой-то крутой рейтинг
                    <Image 
                        className='recipe-author-image'
                        src={require('../../resources/3Hw82sAa0o4.jpg')}
                    />
                    {recipe.author}
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col>
                    <Carousel className='item-image-carousel'>
                        <Carousel.Item>
                            <div className="d-flex justify-content-center">
                                <Image
                                    src={require('../../resources/blyuda-v-duhovke-recepty-1261-50732.jpg')}
                                />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="d-flex justify-content-center">
                                <Image
                                    src={require('../../resources/blyuda-v-duhovke-recepty-1261-50732.jpg')}
                                />
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            <Row className='recipe-info-container'>
                <Col md={8} className='recipe-info-ingredients-container'>
                    <Row>
                        <Col className='recipe-headline'>
                            Ингредиенты 
                        </Col>
                    </Row>
                    <IngredientList/>
                </Col>
                <Col className='recipe-info-additional-container'>
                    <Row>
                        <Col className='recipe-headline'>
                            Информация о блюде
                        </Col>
                    </Row>
                    <Row>
                        <LabelItem header={"Калорийность"} info={recipe.calories + " Ккал"}/>
                    </Row>
                    <Row>
                        <LabelItem header={"Время подготовки"} info={recipe.prepTime + " минут"}/>
                    </Row>
                    <Row>
                        <LabelItem header={"Время готовки"} info={recipe.cookingTime + " минут"}/>
                    </Row>
                </Col>
            </Row>
            <Row className='text-center'>
                <Col className='recipe-headline'>
                    Пошаговый рецепт
                </Col>
            </Row>
            <Row className='recipe-steps-container justify-content-center'>
                <StepsList/>
            </Row>
        </Container>
    )
}

export default RecipePage;