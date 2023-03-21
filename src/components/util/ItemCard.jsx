import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { TruncateString, isEmpty } from "../../js/Utils";

function ItemCard({item, click}) {
    function TagsComponent() {
        if (item.tagIds) {
            //AJAX запрос для получения имён тэгов
            return (
                <Row className="item-body-tags">
                    {item.tagIds.map((tag) => 
                        <Col className="item-body-tag-col" key={"TagCol-" + item.entityId + "-" + tag}>
                            <Button className="item-body-tag" key={"TagBtn-" + item.entityId + "-" + tag}>
                                {TruncateString(tag, 7)}
                            </Button>
                        </Col>
                    )}
                </Row>
            );
        }
    }

    function InfoComponent() {
        if (item.cookingTime || item.prepTime || item.author || item.calories) {
            return (
                <Row className="item-body-info text-center">
                    <Col className="item-body-text-item">
                        <span className="item-body-text">Время готовки: {isEmpty(item.cookingTime + item.prepTime)} минут</span>
                    </Col>
                    <Col className="item-body-text-item">
                        <span className="item-body-text">Кол-во калорий: {isEmpty(item.calories)}</span>
                    </Col>
                    <Col className="item-body-text-item">
                        <span className="item-body-text">Автор: {isEmpty(item.author)}</span>
                    </Col>
                </Row>
            )
        }
    }

    return (
        <Container className="item" onClick={() => click(item)}>
            <Row className="item-head">
                <Image
                    className="item-head-image p-0" 
                    src={require('../../resources/blyuda-v-duhovke-recepty-1261-50732.jpg')}
                    alt=""
                />
                <span className="item-head-image-text">{TruncateString(item.name, 20)}</span>
                <div className="item-head-description-box">
                    <div className="item-head-description-text">{TruncateString(item.description, 300)}</div>
                </div>
            </Row>
            <Row className="item-body">
                <InfoComponent/>
                <TagsComponent/>
            </Row>
        </Container>
    );
}

export default ItemCard;