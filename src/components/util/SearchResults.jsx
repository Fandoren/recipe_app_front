import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ItemCard from './ItemCard';

function SearchResults({items, clickFunction}) {

    return(
        <Container className='results-box'>
            <Row className='justify-content-center'>
                {items.map((item) => 
                    <Col key={"ItemCol-" + item.entityId} xs="auto">
                        <ItemCard key={item.entityId} item={item} click={clickFunction}/>
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default SearchResults;