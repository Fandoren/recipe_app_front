import React from 'react';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Button, Form } from 'react-bootstrap';
import AdvancedSearchParam from './AdvancedSearchParam';

library.add(faPlus);

function AdvancedItemSearch() {

    const [searchParams, setSearchParams] = useState([]);

    function addSearchParam() {
        var timestamp = (new Date()).getTime();
        let newSearchParam = { 
            name: "",
            amount: "",
            unit: "",
            timestamp: timestamp //Заместо уникального ключа
        };
        setSearchParams([...searchParams, newSearchParam]);
    } 

    return(
        <Container className='advanced-search-box'>
            <Form className='advanced-search-form'>
                {searchParams.map((param) => 
                    <AdvancedSearchParam key={param.timestamp}/>
                )}
                <Row className='advanced-search-add-item justify-content-center'>
                    <Button onClick={addSearchParam} className='advanced-search-add-item-button circle-button'>
                        <FontAwesomeIcon icon="plus"/>
                    </Button>
                </Row>
            </Form>
        </Container>
    )
}

export default AdvancedItemSearch;