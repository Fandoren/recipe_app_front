import React from 'react';
import { Container, Row, Button} from 'react-bootstrap';
import SearchResults from '../util/SearchResults';
import {useNavigate} from "react-router-dom";
import data from '../../resources/testTagData.json'

function TagTab() {
    const navigate = useNavigate();

    function addTag() {
        navigate("/tags/createTag");
    };

    function showTag(tag) {
        navigate("/tags/" + tag.entityId);
    }

    return(
        <Container className='tag-page-info'>
            <Row className='justify-content-center'>
                <Button onClick={addTag} className='w-50 mt-3'>
                    Добавить тэг
                </Button>
            </Row>
            <Row>
                <SearchResults items={data} clickFunction={showTag}/>
            </Row>
        </Container>
    )
}

export default TagTab;