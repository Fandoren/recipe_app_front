import React from 'react';
import { Container, Row, Button} from 'react-bootstrap';
import SearchResults from '../util/SearchResults';
import {useNavigate} from "react-router-dom";
import data from '../../resources/testProductData.json'

function ProductTab() {
    const navigate = useNavigate();

    function addProduct() {
        navigate("/products/createProduct");
    };

    function showProduct(product) {
        navigate("/products/" + product.entityId);
    }

    return(
        <Container className='product-page-info'>
            <Row className='justify-content-center'>
                <Button onClick={addProduct} className='w-50 mt-3'>
                    Добавить продукт
                </Button>
            </Row>
            <Row>
                <SearchResults items={data} clickFunction={showProduct}/>
            </Row>
        </Container>
    )
}

export default ProductTab;