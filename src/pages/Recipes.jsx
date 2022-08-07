import React, {useState, useEffect, useMemo, Suspense} from "react";
import RecipeService from "../API/RecipeService";
import ProductService from "../API/ProductService";
import TagService from "../API/TagService";
import RecipeList from "../components/recipes/RecipeList";
import RecipeModalCreate from "../components/recipes/RecipeModalCreate";
import Loader from "../UI/Loader/Loader";
import '../styles/Recipes.css'
import { useFetching } from "../hooks/useFetching";
import Container from 'react-bootstrap/Container'
import ButtonPages from "../components/ButtonPages";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { components } from "react-select";
import { default as ReactSelect } from "react-select";

function Recipes() {

    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [tagOptions, setTagOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([])
    const [tagsSelected, setTagSelected] = useState(null);
    const [productsSelected, setProductsSelected] = useState(null);
    const [products, setProducts] = useState([]);
    const handleChangeTag = (selected) => {
        setTagSelected(selected);
      };
      const handleChangeProduct = (selected) => {
        setProductsSelected(selected);
      };
    let pagesArray = [];

    const [fetchRecipes, isRecipesLoading, RecipeError] = useFetching(async (page) => {
        const response = await RecipeService.getPage(page);
        setRecipes(response.data.content);
        setTotalPages(response.data.totalPages);
    });

    useMemo(() => {
        for(let i = 0; i < totalPages; i++) {
            pagesArray.push(i);
        }
    }, [totalPages, pagesArray]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
              const response = await ProductService.getAll();
              const arr = response.data.map((product) => ({
                value: product.entityId,
                label: product.name
              }))
              setProducts(response.data);
              setProductOptions(arr);
            } catch (error) {
                console.log(error)
            }
        }
    
        const fetchTags = async () => {
          try {
            const response = await TagService.getAll();
            const arr = response.data.map((tag) => ({
              value: tag.entityId,
              label: tag.name
            }))
            setTagOptions(arr);
          } catch (error) {
              console.log(error)
          }
      }
    
        fetchTags();
        fetchProducts();
        fetchRecipes(page)
    }, []);

    const changePage = (page) => {
        setPage(page);
        fetchRecipes(page);
    }

    const createRecipe = (newRecipe, imageData) => {
        RecipeService.save(newRecipe)
        .then((result) => { 
            RecipeService.uploadImage(result.data.entityId, imageData)
        })
        .then(async () => {
            RecipeService.getPage(page).then((result) => {
                setRecipes(result.data.content);
                setTotalPages(result.data.totalPages)
            })});
    }

    const removeRecipe = (Recipe) => {
        RecipeService.remove(Recipe).then(async () => {
            RecipeService.getPage(page).then((result) => {
                setRecipes(result.data.content);
                setTotalPages(result.data.totalPages)
            })}); 
    }

    const updateRecipe = (Recipe) => {
        RecipeService.update(Recipe).then(async () => {
            RecipeService.getPage(page).then((result) => {
                setRecipes(result.data.content);
                setTotalPages(result.data.totalPages)
            })});
    }

    const updateImage = (entityId, imageData) => {
        RecipeService.uploadImage(entityId, imageData)
    }

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
                onChange={handleChangeTag}
                allowSelectAll={true}
                value={tagsSelected}
              />
            </span>
          </Form.Group>
        );
    }

    function ProductList() {
      if(productOptions === undefined) {
        return <h1>Продукты грузятся</h1>
      }
      return (
        <Form.Group>
          <Form.Label>Продукты</Form.Label>
          <span
            data-toggle="popover"
            data-trigger="focus"
            data-content="Пожалуйста, выберите продукты"
          >
            <ReactSelect
              options={productOptions}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option,
              }}
              onChange={handleChangeProduct}
              allowSelectAll={true}
              value={productsSelected}
            />
          </span>
        </Form.Group>
      );
    }

    const handleSearch = async (page) => {
        if((tagsSelected === null || tagsSelected.length === 0) && (productsSelected === null || productsSelected.length === 0)) {
          fetchRecipes(page);
        } else {
          let array = {
            tagIds: [],
            productIds: []
          }
          if(tagsSelected !== null) {
            array.tagIds = tagsSelected.map(option => option.value);
          }
          if(productsSelected !== null) {
            array.productIds = productsSelected.map(option => option.value);
          }
          const response = await RecipeService.getPageFilteredByProductsAndTags(page, array);
          setRecipes(response.data.content);
          setTotalPages(response.data.totalPages);
          if(response.data.totalPages < this.page) {
            this.page = 0;
          } 
        }
    }

    return(
        <Container className="Recipes">
            <Row>
                <Suspense>
                  <ProductList/>
                </Suspense>
                <Suspense>
                  <TagList/>
                </Suspense>
                <Button onClick={() => {handleSearch(page)}}>Фильтрация</Button>
            </Row>
            <RecipeModalCreate create={createRecipe} products={products} tagOptions={tagOptions}/>
            {RecipeError && <h1>Произошла ошибка ${RecipeError}</h1>}
            {isRecipesLoading
            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}><Loader/></div>
            : <RecipeList update={updateRecipe} updateImage={updateImage} remove={removeRecipe} recipes={recipes} products={products} tagOptions={tagOptions}/>
            }
            <ButtonPages pagesArray={pagesArray} page={page} setPage={changePage}/>
        </Container>
    );

}

export default Recipes;