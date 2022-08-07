import React from "react";
import ProductItem from './ProductItem'
import Row from 'react-bootstrap/Row'

function ProductList({products, remove, update, updateImage, tagOptions}) {
    if(!products.length) {
        return (
        <h1 style={{textAlign: "center"}}>
            Продукты не найдены!
        </h1>
        )
    }

    return (
        <div className="product__list">
            <h1 style={{textAlign: "center"}}>Список продуктов</h1>
            <Row className="product__list__content">
                {products.map((product) => 
                <ProductItem remove={remove} update={update} updateImage={updateImage} product={product} tagOptions={tagOptions} key={product.entityId}/>)}
            </Row>
        </div>
    );
}

export default ProductList;