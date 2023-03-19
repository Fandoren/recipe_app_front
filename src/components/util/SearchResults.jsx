import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemCard from './ItemCard';

function SearchResults({items}) {

    items.map((item) => console.log(item.entityId))

    return(
        <Container className='results-box'>
            <Row>
                {items.map((item) => 
                    <Col xs={12} md={4} xl={3}>
                        <ItemCard key={item.entityId} item={item}/>
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default SearchResults;