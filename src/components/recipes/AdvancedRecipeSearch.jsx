import React from 'react';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Button, Form } from 'react-bootstrap';
import AdvancedRecipeSearchParam from './AdvancedRecipeSearchParam';

library.add(faPlus);

function AdvancedRecipeSearch() {

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

    function deleteSearchParam(index) {
        let temp = searchParams.filter((item, i) => i !== index);
        setSearchParams(temp);
    }

    function searchRecipes() {
        console.log('asd')
    }

    return(
        <Container className='advanced-search-box'>
            <Form className='advanced-search-form'>
                {searchParams.map((param, i) => 
                    <AdvancedRecipeSearchParam key={param.timestamp} deleteFunction={() => deleteSearchParam(i)}/>
                )}
                <Row className='advanced-search-add-item justify-content-center'>
                    <Button onClick={addSearchParam} className='advanced-search-add-item-button circle-button'>
                        <FontAwesomeIcon icon="plus"/>
                    </Button>
                </Row>
                {searchParams.length > 0 && 
                <Row className='advanced-search-recipes justify-content-center'>
                    <Button onClick={searchRecipes} className='advanced-search-recipes-button'>
                        Поиск
                    </Button>
                </Row> 
                }
            </Form>
        </Container>
    )
}

export default AdvancedRecipeSearch;