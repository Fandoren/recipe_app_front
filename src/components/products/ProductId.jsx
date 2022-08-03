import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import ProductService from "../../API/ProductService";
import { useFetching } from "../../hooks/useFetching";
import Loader from "../../UI/Loader/Loader";
import Image from "react-bootstrap/Image";
import TagService from "../../API/TagService";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function ProductId() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [tags, setTags] = useState([]);
  const [fetchProductById, isProductLoading, productError] = useFetching(
    async () => {
      const responseProduct = await ProductService.getOne(id);
      setProduct(responseProduct.data);
      const responseTag = await TagService.getAllByIds(
        responseProduct.data.tagIds
      );
      setTags(responseTag.data);
    }
  );

  useEffect(() => {
    fetchProductById();
  }, []);

  return (
    <Container className="Product">
      {isProductLoading ? (
        <Loader />
      ) : (
        <Col>
          <Row>
            <h3>{product.name}</h3>
          </Row>
          <Row>
            <Image
              className="product__id__image"
              src={`data:image/jpeg;base64,${product.imageAsByteArray}`}
            />
          </Row>
          <Row xs="auto">
              {tags.map((tag) =>
              <Button onClick={() => navigate("/tags/" + tag.entityId)} variant='outline-secondary'>{tag.name}</Button>)}
          </Row>
          <Row>
            <h4>Описание</h4>
            {product.description}
          </Row>
          <Row>
            <h4>
              Рецепты с данным продуктом:
            </h4>
          </Row>
        </Col>
      )}
    </Container>
  );
}

export default ProductId;
