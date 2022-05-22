import React from 'react';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import TagButtonGroup from './TagButtonGroup';

function TagItem(props) {

    function Truncate(str) {
        return str.length > 100 ? str.substring(0, 97) + "..." : str;
    }

    const desc = Truncate(props.tag.description);

    var icon = props.tag.imageAsByteArray
    ? 'data:image/jpeg;base64,' + props.tag.imageAsByteArray
    : require('../assets/no_image.jpg');

    return(
        <Col className='tag__item__column' lg="3">
            <Card className='tag'>
                <Card.Img className='tag__image' variant='top' src={icon}/>
                <Card.Body className='tag__content'>
                    <Card.Title className='tag__title'>{props.tag.name}</Card.Title>
                    <Card.Text className='tag__description'>{desc}</Card.Text>
                </Card.Body>
                <TagButtonGroup remove={props.remove} update={props.update} item={props.tag} updateImage={props.updateImage}/>
            </Card>
        </Col>
    )
}

export default TagItem;