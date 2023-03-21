import React from 'react';
import { Row, Col } from 'react-bootstrap';

function LabelItem({header, info}) {
    return(
        <Row>
            <Col className='label-header col-auto'>
                {header}:
            </Col>
            <Col className='label-info col-auto'>
                {" " + info}
            </Col>
        </Row>
    )
}

export default LabelItem;