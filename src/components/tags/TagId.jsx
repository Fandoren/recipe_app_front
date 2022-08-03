import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Container from 'react-bootstrap/Container'
import { useParams } from 'react-router-dom';
import TagService from "../../API/TagService";
import ProductService from "../../API/ProductService";
import { useFetching } from "../../hooks/useFetching";
import Loader from "../../UI/Loader/Loader";
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function TagId() {
    const { id } = useParams();
    const [tag, setTag] = useState({});
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [fetchTagById, isTagLoading, tagError] = useFetching( async () => {
        const response = await TagService.getOne(id);
        const productsResponse = await ProductService.getByTagId(id)
        setTag(response.data)
        setProducts(productsResponse.data)
    })

    useEffect(() => {
       fetchTagById();
    }, [])

    return (
        <Container className="Tag">
            {isTagLoading
            ?   <Loader/>
            :   <Col>
                    <Row>
                        <h3>{tag.name}</h3>
                    </Row>
                    <Row>
                        <Image className="tag__id__image" src={`data:image/jpeg;base64,${tag.imageAsByteArray}`}/>
                    </Row>
                    <Row>
                        <h4>Описание</h4>
                        {tag.description}
                    </Row>
                    <Row>
                        <h4>Продукты с данным тегом</h4>
                    </Row>
                    <Row xs="auto">
                        {products.map((product) => 
                        <Button onClick={() => navigate("/products/" + product.entityId)} variant='outline-secondary'>{product.name}</Button>)}
                    </Row>
                </Col> }
        </Container>
    )
}

export default TagId;