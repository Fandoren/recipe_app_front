import React from 'react';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import RecipeButtonGroup from './RecipeButtonGroup';

function RecipeItem(props) {

    function Truncate(str) {
        if(str !== null) {
            return str.length > 100 ? str.substring(0, 97) + "..." : str;
        }
        return "Нет описания"
    }

    const desc = Truncate(props.recipe.description);

    var icon = props.recipe.imageAsByteArray
    ? 'data:image/jpeg;base64,' + props.recipe.imageAsByteArray
    : require('../../assets/no_image.jpg');

    return(
        <Col className='recipe__item__column' lg="3">
            <Card className='recipe'>
                <Card.Img className='recipe__image' variant='top' src={icon}/>
                <Card.Body className='recipe__content'>
                    <Card.Title className='recipe__title'>{props.recipe.name}</Card.Title>
                    <Card.Text className='recipe__description'>{desc}</Card.Text>
                </Card.Body>
                <RecipeButtonGroup remove={props.remove} update={props.update} item={props.recipe} updateImage={props.updateImage} products={props.products} tagOptions={props.tagOptions}/>
            </Card>
        </Col>
    )
}

export default RecipeItem;