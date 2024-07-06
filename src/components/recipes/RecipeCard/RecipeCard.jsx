import { Button, Card, Col, Container, Row } from "react-bootstrap";
import styles from "./RecipeCard.module.scss";
import img from "assets/test_vertical_recipe.jpg";
import { Clock, Fire, Heart, StarFill, StarHalf } from "react-bootstrap-icons";

export default function RecipeCard(props) {
  return (
    <Card className={styles.card_main}>
      <Container className={`${styles.card_img_container} mb-2`}>
        <Button variant="light" className={`${styles.card_btn_favorite}`}>
          <Heart className={styles.card_icon_favorite} />
        </Button>
        <Card.Img src={img} className={`${styles.card_img}`} />
      </Container>
      <Card.Body className={styles.card_body}>
        <Card.Subtitle className="mb-2">
          <Row>
            <Col>
              <Clock className={styles.card_icon_info} />
              60 минут
            </Col>
            <Col className="text-end">
              <Fire className={styles.card_icon_info} />
              350 ккал
            </Col>
          </Row>
        </Card.Subtitle>
        <Card.Title className={styles.card_title}>
          Печенья с глазурью и ягодами
        </Card.Title>
        <Card.Subtitle className="mb-2">
          <StarFill className={styles.card_icon_rating} />
          <StarFill className={styles.card_icon_rating} />
          <StarFill className={styles.card_icon_rating} />
          <StarFill className={styles.card_icon_rating} />
          <StarHalf className={`${styles.card_icon_rating} me-1`} />
          4,5
        </Card.Subtitle>
        <Button variant="dark" className="w-100">
          Подробнее
        </Button>
      </Card.Body>
    </Card>
  );
}
