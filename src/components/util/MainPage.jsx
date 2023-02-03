import React from 'react';
import { Container, Row } from 'react-bootstrap';
import AdvancedItemSearch from './AdvancedItemSearch';
import ItemSearch from './ItemSearch';

function MainPage() {

    return(
        <Container>
            <ItemSearch/>
            <Row>
                <span className='search-text text-center'>
                    или введите желаемые продукты и количество, мы подберём рецепт для Вас!
                </span>
            </Row>
            <AdvancedItemSearch/>
        </Container>
    )

}

export default MainPage;
