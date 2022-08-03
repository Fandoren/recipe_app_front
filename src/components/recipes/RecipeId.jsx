import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import RecipeService from "../../API/RecipeService";
import TagService from "../../API/TagService";
import ProductService from "../../API/ProductService";
import { useFetching } from "../../hooks/useFetching";
import Loader from "../../UI/Loader/Loader";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function RecipeId() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [tags, setTags] = useState([]);
    const [products, setProducts] = useState([])
    const [fetchRecipeById, isRecipeLoading, recipeError] = useFetching(
      async () => {
        const responseRecipe = await RecipeService.getOne(id);
        setRecipe(responseRecipe.data);
        const responseProducts = await ProductService.getAllByIds(
            responseRecipe.data.ingredients.map(i => i.productId)
            );
        setProducts(mergeProductsAndIngredients(responseProducts.data, responseRecipe.data.ingredients));
        const responseTag = await TagService.getAllByIds(
          responseRecipe.data.tagIds
        );
        setTags(responseTag.data);
      }
    );
  
    useEffect(() => {
      fetchRecipeById();
    }, []);

    function mergeProductsAndIngredients(arr1, arr2) {
      let merged = [];

      for(let i=0; i<arr1.length; i++) {
        merged.push({
        ...arr1[i], 
        ...(arr2.find((itmInner) => itmInner.productId === arr1[i].entityId))}
        );
      }
      return merged;
    }

    function doSmth() {
      console.log(products);
    }
  
    function IngredientsList() {
      if(products.length === 0) {
        return(
          <span>Ингридиенты грузятся!</span>
        )
      }
      return (products.map(product => 
        <Row>
          <Col xs="1">
              {product.name}
          </Col>
          <Col xs="1">
              {product.weight}
          </Col>
          <Col xs="1">
              {product.unit}
          </Col>
        </Row>
      ))
    }

    function StepsList() {
      if(recipe === undefined || recipe.steps === undefined || recipe.steps.length === 0) {
        return(
          <span>Шаги грузятся!</span>
        )
      }
      return (recipe.steps.map(step => 
          <Col lg="4">
            <Row>
              <b>{step.title}</b>
            </Row>
            <Row>
              {step.description}
            </Row>
          </Col>
      ))
    }

    return (
      <Container className="Recipe">
        {isRecipeLoading ? (
          <Loader />
        ) : (
          <Col>
            <Row>
              <h3>{recipe.name}</h3>
            </Row>
            <Row>
              <Image
                className="recipe__id__image"
                src={`data:image/jpeg;base64,${recipe.imageAsByteArray}`}
              />
            </Row>
            <Row>
                <Row>
                    <b> Время приготовления: </b> 
                    <Col lg="1">
                        Часы: { Math.floor(recipe.cookingTime / 60)}
                    </Col>
                    <Col lg="1">
                        Минуты: {recipe.cookingTime % 60}
                    </Col> 
                </Row>    
                <Row>
                    <b> Время подготовки перед приготовлением: </b> 
                    <Col lg="1">
                        Часы: { Math.floor(recipe.prepTime / 60)}
                    </Col>
                    <Col lg="1">
                        Минуты: {recipe.prepTime % 60}
                    </Col>
                </Row>
            </Row>
            <Row>
              <h4>Описание</h4>
              {recipe.description}
            </Row>
            <Row>
                <h3>Требуемые ингридиенты</h3>
                <Container>
                  <IngredientsList/>
                </Container>
            </Row>
            <Row>
                <h3>Пошаговый рецепт</h3>
                <Container>
                  <StepsList/>
                </Container>
            </Row>
            <Row xs="auto">
                {tags.map((tag) =>
                <Button onClick={() => navigate("/tags/" + tag.entityId)} variant='outline-secondary'>{tag.name}</Button>)}
            </Row>
          </Col>
        )}
        <Button onClick={doSmth}>Do SMTHNG</Button>
      </Container>
    );
  }
  
  export default RecipeId;
  