import React from "react";
import ProductItem from './ProductItem'
import Row from 'react-bootstrap/Row'

function ProductList({products, remove, update, updateImage}) {
    if(!products.length) {
        return (
        <h1 style={{textAlign: "center"}}>
            Теги не найдены!
        </h1>
        )
    }

    return (
        <div className="product__list">
            <h1 style={{textAlign: "center"}}>Список продуктов</h1>
            <Row className="product__list__content">
                {products.map((product) => 
                <ProductItem remove={remove} update={update} updateImage={updateImage} product={product} key={product.entityId}/>)}
            </Row>
        </div>
    );
}

export default ProductList;