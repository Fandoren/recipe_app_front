import React from 'react';
import { Container, Row, Col, Image, Button, Tabs, Tab} from 'react-bootstrap';
import LabelItem from '../util/LabelItem';
import UserRecipesTab from './UserRecipesTab';
import UserCommentsTab from './UserCommentsTab';
import UserFavoritesTab from './UserFavorites';

function InfoTab() {
    return(
        <Container className='profile-page-info'>
            <Row className='justify-content-center mb-3'>
                <Col className='profile-information-container' md={6}>
                    <Row className='align-items-center'>
                        <Col>
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
                        <Col>
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
                </Col>
            </Row>
            <Tabs fill>
                <Tab eventKey="recipes" title="Ваши рецепты">
                    <UserRecipesTab/>
                </Tab>
                <Tab eventKey="comments" title="Ваши комментарии">
                    <UserCommentsTab/>
                </Tab>
                <Tab eventKey="favorites" title="Избранное">
                    <UserFavoritesTab/>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default InfoTab;