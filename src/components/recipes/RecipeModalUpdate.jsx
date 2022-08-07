import React, {useState, Suspense} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import {toBase64} from "../utils/toBase64";


function RecipeModalUpdate({show, handleClose, recipe, setRecipe, update, setShow, updateImage, products, tagOptions}) {

    const units = [
        {value: 'GRAM', label: 'Граммы'},
        {value: 'KILOGRAM', label: 'Килограмм'},
        {value: 'LITER', label: 'Литр'},
        {value: 'MILLILITER', label: 'Миллилитр'},
        {value: 'GLASS', label: 'Стакан'},
        {value: 'PIECE', label: 'Часть'}
      ];

    const [steps, setSteps] = useState(recipe.steps);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [hours, setHours] = useState(Math.floor(recipe.cookingTime / 60));
    const [minutes, setMinutes] = useState(recipe.cookingTime % 60);
    const [prepHours, setPrepHours] = useState(Math.floor(recipe.prepTime / 60));
    const [prepMinutes, setPrepMinutes] = useState(recipe.prepTime % 60);
    const [imageToDisplay, setImageToDisplay] = useState('data:image/jpeg;base64,' + recipe.image)
    const [imageData, setImageData] = useState(null);
    const [optionSelected, setOptionSelected] = useState(null);

    const handleChange = (selected) => {
        setOptionSelected(selected);
      };

    const undoCnahges = () => {
        setImageToDisplay('');
        handleClose();
    }

    const uploadImage = (file) => {
        const imageData = new FormData();
        imageData.append("image", file);
        setImageData(imageData)
        setImageToDisplay(URL.createObjectURL(file));
    } 

    const updateRecipe = () => {
        if (imageData) {
            updateImage(recipe.entityId, imageData)
        }  else {
            fetch(imageToDisplay)
            .then(res => res.blob())
            .then(blob => {
              const fd = new FormData();
              const file = new File([blob], "filename.jpeg");
              fd.append('image', file);
              updateImage(recipe.entityId, fd)
            })
        }

        const tagIds = optionSelected.map((option) => option.value)

        const newRecipe = {
            entityId: recipe.entityId,
            name: recipe.name,
            description: recipe.description,
            ingredients: ingredients,
            cookingTime: (parseInt(hours) * 60) + parseInt(minutes),
            prepTime: (parseInt(prepHours) * 60) + parseInt(prepMinutes),
            calories: parseInt(recipe.calories),
            steps: steps,
            tagIds: tagIds,
            author: recipe.author
        }
        console.log(newRecipe)
        update(newRecipe)
        setShow(false);
    }

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
        <Modal show={show} onHide={undoCnahges}>
            <Modal.Header closeButton>
                <Modal.Title>Изменение рецепта</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="recipe__form__image">
                        <Form.Label>Изображение рецепта</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Загрузите изображение"
                            onChange={(e) => uploadImage(e.target.files[0])}
                        />
                        <Container className="image__modal__container">
                            <Image className='recipe__modal__image' src={imageToDisplay}/>
                        </Container>
                    </Form.Group>
                    <Form.Group className="recipe__form__name">
                        <Form.Label>Название рецепта</Form.Label>
                        <Form.Control
                            type="textarea"
                            placeholder="Введите название"
                            value={recipe.name}
                            onChange={e => setRecipe({ ...recipe, name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="recipe__form__description">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            type="textarea"
                            placeholder="Введите описание рецепта"
                            value={recipe.description}
                            onChange={e => setRecipe({ ...recipe, description: e.target.value })}
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
                            setRecipe({ ...recipe, calories: e.target.value })
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
                <Button variant="secondary" onClick={undoCnahges}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={updateRecipe}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
        )
    }

export default RecipeModalUpdate;