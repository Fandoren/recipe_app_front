import React from "react";
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

function ButtonPages({pagesArray, page, setPage}) {
    return (
        <ButtonGroup>
            {pagesArray.map(p => 
                <Button 
                    key={p} 
                    className={page === p ? "page__current" : "page"}
                    onClick={() => {setPage(p)}}
                >
                    {p + 1}
                </Button>)}
        </ButtonGroup>
    );
}

export default ButtonPages;