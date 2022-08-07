import React, { useState, Suspense } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import {toBase64} from "../utils/toBase64";

function RecipeModalCreate({ create, products, tagOptions }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (selected) => {
    setOptionSelected(selected);
  };

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    image: "",
    cookingTime: null,
    prepTime: null,
    calories: 0,
    author: ""
  });
  const units = [
    {value: 'GRAM', label: 'Граммы'},
    {value: 'KILOGRAM', label: 'Килограмм'},
    {value: 'LITER', label: 'Литр'},
    {value: 'MILLILITER', label: 'Миллилитр'},
    {value: 'GLASS', label: 'Стакан'},
    {value: 'PIECE', label: 'Часть'}
  ];

  const [steps, setSteps] = useState([{image: '', description: ''}]);
  const [ingredients, setIngredients] = useState([{productId: '', weight: 0, unit: ''}]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [prepHours, setPrepHours] = useState(0);
  const [prepMinutes, setPrepMinutes] = useState(0);
  const [optionSelected, setOptionSelected] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageToDisplay, setImageToDisplay] = useState("");

  const [ingredientError, setIngredientError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [caloriesError, setCaloriesError] = useState(false);

  const addNewRecipe = () => {
    if(ingredientError || timeError || caloriesError) {
      console.log("Исправьте введеннёые данные")
    } else {
      const tagIds = optionSelected.map((option) => option.value)
      const newRecipe = {
        name: recipe.name,
        description: recipe.description,
        ingredients: ingredients,
        cookingTime: (parseInt(hours) * 60) + parseInt(minutes),
        prepTime: (parseInt(prepHours) * 60) + parseInt(prepMinutes),
        calories: parseInt(recipe.calories),
        steps: steps,
        tagIds: tagIds,
        author: recipe.author
      };
      create(newRecipe, imageData);
      setRecipe({
        name: "",
        description: "",
        image: '',
        ingredients: [],
        cookingTime: 0,
        prepTime: 0,
        calories: 0,
        steps: [],
        tagIds: [],
        author: ""
      });
      setIngredients([]);
      setSteps([]);
      setHours(0);
      setMinutes(0);
      setPrepHours(0);
      setPrepMinutes(0);
      setOptionSelected(null);
      setShow(false);
    }
  };

  const uploadImage = (file) => {
    const imageData = new FormData();
    imageData.append("image", file);
    setImageData(imageData);
    setImageToDisplay(URL.createObjectURL(file));
  };

  //Steps

  function addStep() {
    let newStep = { image: '', description: ''};
    setSteps([...steps, newStep]);
  }

  const handleStepsChange = (index, event) => {
    let data = [...steps];
    data[index][event.target.name] = event.target.value;
    setSteps(data);
  }

  async function handleStepImageChange (index, file) {
    let data = [...steps];
    data[index]['image'] = await toBase64(file);
    await setSteps(data);
  }

  const handleDeleteStep = (index) => {
    let data = [...steps];
    data.splice(index, 1);
    setSteps(data);
  }

  //Ingredients

  function addIngredient() {
    let newIngredient = {productId: '', weight: '', unit: ''};
    setIngredients([...ingredients, newIngredient]);
  }

  const handleIngredientsChange = (index, event) => {
    let numberRegex = /^[0-9\b]+$/;
    if((event.target.name === "weight" && ( event.target.value <= 0 || !numberRegex.test(event.target.value))) ||
       (event.target.name === "unit" && ( event.target.value === 'Выберите единицу измерения'))) {
      setIngredientError(true);
    } else {
      setIngredientError(false);
    }
    let data = [...ingredients];
    data[index][event.target.name] = event.target.value;
    setIngredients(data);
  }

  const handleDeleteIngredient = (index) => {
    let data = [...steps];
    data.splice(index, 1);
    setIngredients(data);
  }

  //Tags

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  function TagList() {
    if(tagOptions === undefined) {
        return <h1>Тэги грузятся</h1>
    }
    return (
      <Form.Group>
        <Form.Label>Теги</Form.Label>
        <span
          data-toggle="popover"
          data-trigger="focus"
          data-content="Пожалуйста, выберите теги"
        >
          <ReactSelect
            options={tagOptions}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Option,
            }}
            onChange={handleChange}
            allowSelectAll={true}
            value={optionSelected}
          />
        </span>
      </Form.Group>
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <Button className="mt-3" variant="primary" onClick={handleShow}>
        Создание нового рецепта
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Создание нового рецепта</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="recipe__form__image">
              <Form.Label>Изображение рецепта</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                placeholder="Загрузите изображение"
                onChange={(e) => uploadImage(e.target.files[0])}
              />
              <Container className="image__modal__container">
                <Image className="recipe__modal__image" src={imageToDisplay} />
              </Container>
            </Form.Group>
            <Form.Group className="recipe__form__name">
              <Form.Label>Название рецепта</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Введите название"
                value={recipe.name}
                onChange={(e) =>
                  setRecipe({ ...recipe, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="recipe__form__description">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Введите описание"
                value={recipe.description}
                onChange={(e) =>
                  setRecipe({ ...recipe, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="recipe__form__cookingTime">
              <Container>
                <Row>
                  <Form.Label>Время готовки</Form.Label>
                </Row>
                <Row>
                  <Col md="auto">Часы</Col>
                  <Col>
                    <Form.Control
                      type="textarea"
                      placeholder="Часы"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                    />
                  </Col>
                  <Col md="auto">Минуты</Col>
                  <Col>
                    <Form.Control
                      type="textarea"
                      placeholder="Минуты"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                    />
                  </Col>
                </Row>
              </Container>
            </Form.Group>
            <Form.Group className="recipe__form__prepTime">
              <Container>
                <Row>
                  <Form.Label>Время подготовки перед готовкой</Form.Label>
                </Row>
                <Row>
                  <Col md="auto">Часы</Col>
                  <Col>
                    <Form.Control
                      type="textarea"
                      placeholder="Часы"
                      value={prepHours}
                      onChange={(e) => setPrepHours(e.target.value)}
                    />
                  </Col>
                  <Col md="auto">Минуты</Col>
                  <Col>
                    <Form.Control
                      type="textarea"
                      placeholder="Минуты"
                      value={prepMinutes}
                      onChange={(e) => setPrepMinutes(e.target.value)}
                    />
                  </Col>
                </Row>
              </Container>
            </Form.Group>
            <Form.Group className="recipe__form__calories">
              <Form.Label>Количество калорий в блюде</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Введите количество калорий в блюде"
                value={recipe.calories}
                onChange={(e) => {
                  setRecipe({ ...recipe, calories: e.target.value})
                }
                  
                }
              />
            </Form.Group>
            <hr/>
            <Row style={{marginTop: '10px'}} className="recipe__form__ingredients">
              {ingredients.map((ingredient, index) => {
                return (
                  <Col key={"ingredient-" + index} lg="6">
                    <Form.Group>
                      <Form.Label> Выберите ингредиент </Form.Label>
                      <Form.Select name="productId" onChange={(e) => handleIngredientsChange(index, e)}>
                      <option value={null}>Выберите ингредиент</option>
                        {products.map((product) => 
                        <option key={product.value} value={product.value}>{product.label}</option>)}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Введите требуемый вес</Form.Label>
                      <Form.Control
                        type="textarea"
                        placeholder="Введите описание"
                        value={ingredient.weight}
                        name="weight"
                        onChange={(e) => handleIngredientsChange(index, e)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Введите единицу измерения</Form.Label>
                      <Form.Select name="unit" onChange={(e) => handleIngredientsChange(index, e)}>
                        <option value={null}>Выберите единицу измерения</option>
                        {units.map((unit) => 
                        <option value={unit.value}>{unit.label}</option>)}
                      </Form.Select>
                    </Form.Group>
                    <Button onClick={() => handleDeleteIngredient(index)} variant="danger">Удалить ингредиент</Button>
                  </Col>
                )
              })}
            </Row>
            <Button onClick={addIngredient}>
              Добавить ингредиент 
            </Button>
            <hr/>
            <Row style={{marginTop: '10px'}} className="recipe__form__steps">
            {steps.map((step, index) => {
              return (
                <Col key={"step-" + index} lg="6">
                  <Form.Group className="recipe__form__image">
                    <Form.Label>Изображение для шага</Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="Загрузите изображение"
                      onChange={(e) => handleStepImageChange(index, e.target.files[0])}
                    />
                      <Container className="image__modal__container">
                        <Image width="350" height="250" className='recipe__modal__image' src={step.image}/>
                      </Container>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Введите описание шага</Form.Label>
                    <Form.Control
                      type="textarea"
                      placeholder="Введите описание"
                      value={step.description}
                      name="description"
                      onChange={(e) => handleStepsChange(index, e)}
                    />
                  </Form.Group>
                  <Button onClick={() => handleDeleteStep(index)} variant="danger">Удалить шаг {index + 1}</Button>
                </Col>
              )
        })}
            </Row>
            <Button onClick={addStep}>
              Добавить шаг 
            </Button>
            <Suspense>
                <TagList/>
            </Suspense>
            <Form.Group className="recipe__form__author">
              <Form.Label>Введите автора блюда</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Введите автора блюда"
                value={recipe.author}
                onChange={(e) => {
                  setRecipe({ ...recipe, author: e.target.value })
                }
                  
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={addNewRecipe}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RecipeModalCreate;