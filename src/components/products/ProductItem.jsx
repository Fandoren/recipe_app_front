import React from 'react';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import ProductButtonGroup from './ProductButtonGroup';

function ProductItem(props) {

    function Truncate(str) {
        if(str !== null) {
            return str.length > 100 ? str.substring(0, 97) + "..." : str;
        }
        return "Нет описания"
    }

    const desc = Truncate(props.product.description);

    var icon = props.product.imageAsByteArray
    ? 'data:image/jpeg;base64,' + props.product.imageAsByteArray
    : require('../../assets/no_image.jpg');

    return(
        <Col className='product__item__column' lg="3">
            <Card className='product'>
                <Card.Img className='product__image' variant='top' src={icon}/>
                <Card.Body className='product__content'>
                    <Card.Title className='product__title'>{props.product.name}</Card.Title>
                    <Card.Text className='product__description'>{desc}</Card.Text>
                </Card.Body>
                <ProductButtonGroup remove={props.remove} update={props.update} item={props.product} updateImage={props.updateImage} tagOptions={props.tagOptions}/>
            </Card>
        </Col>
    )
}

export default ProductItem;