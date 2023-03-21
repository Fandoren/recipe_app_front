import React from 'react';
import { Container, Row, Col, Image, Button} from 'react-bootstrap';
import LabelItem from '../util/LabelItem';

function InfoTab() {
    return(
        <Container className='profile-page-info'>
            <Row>
                <Col className='profile-picture-container' xs={4}>
                    <Row className='justify-content-center'>
                        <Image 
                            className='profile-picture'
                            src={require('../../resources/3Hw82sAa0o4.jpg')}
                        />
                    </Row>
                    <Row className='change-profile-picture-btn-container'>
                        <Button>
                            Изменить изображение профиля
                        </Button>
                    </Row>
                </Col>
                <Col className='profile-information-container'>
                    <Row>
                        <LabelItem header={"ФИО"} info={"Бояринцев Андрей Андреевич"}/>
                    </Row>
                    <Row>
                        <LabelItem header={"Имя пользователя"} info={"babuin290"}/>
                    </Row>
                    <Row>
                        <LabelItem header={"Почта"} info={"someCollMail@mail.ru"}/>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default InfoTab;