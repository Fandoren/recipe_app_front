import React, {useState, useEffect, useMemo} from "react";
import RecipeService from "../API/RecipeService";
import RecipeList from "../components/recipes/RecipeList";
import RecipeModalCreate from "../components/recipes/RecipeModalCreate";
import Loader from "../UI/Loader/Loader";
import '../styles/Recipes.css'
import { useFetching } from "../hooks/useFetching";
import Container from 'react-bootstrap/Container'
import ButtonPages from "../components/ButtonPages";

function Recipes() {

    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
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

    return(
        <Container className="Recipes">
            <RecipeModalCreate create={createRecipe}/>
            {RecipeError && <h1>Произошла ошибка ${RecipeError}</h1>}
            {isRecipesLoading
            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}><Loader/></div>
            : <RecipeList update={updateRecipe} updateImage={updateImage} remove={removeRecipe} recipes={recipes}/>
            }
            <ButtonPages pagesArray={pagesArray} page={page} setPage={changePage}/>
        </Container>
    );

}

export default Recipes;