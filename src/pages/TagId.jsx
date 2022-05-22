import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Container from 'react-bootstrap/Container'
import { useParams } from 'react-router-dom';
import TagService from "../API/TagService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../UI/Loader/Loader";
import Image from 'react-bootstrap/Image'

function TagId() {
    const { id } = useParams();
    const [tag, setTag] = useState({});
    const [fetchTagById, isTagLoading, tagError] = useFetching( async () => {
        const response = await TagService.getOne(id);
        setTag(response.data)
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
                        <h1>EntityId: {tag.entityId}</h1>
                    </Row>
                    <Row>
                        <h3>{tag.name}</h3>
                    </Row>
                    <Row>
                        <Image className="tag__id__image" src={`data:image/jpeg;base64,${tag.imageAsByteArray}`}/>
                    </Row>
                    <Row>
                        <h4>{tag.description}</h4>
                    </Row>
                </Col> }
        </Container>
    )
}

export default TagId;