import React, {useState, useEffect, useMemo} from "react";
import TagList from "../components/TagList";
import '../styles/Tags.css'
import TagModalCreate from "../components/TagModalCreate";
import TagService from "../API/TagService";
import Loader from "../UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import Container from 'react-bootstrap/Container'
import ButtonPages from "../components/ButtonPages";

function Tags() {
    const [tags, setTags] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0)
    let pagesArray = []
    const [fetchTags, isTagsLoading, tagError] = useFetching(async (page) => {
        const response = await TagService.getPage(page);
        setTags(response.data.content);
        setTotalPages(response.data.totalPages);
    })

    useMemo(() => {
        for(let i = 0; i < totalPages; i++) {
            pagesArray.push(i);
        }
    }, [totalPages, pagesArray])

    useEffect(() => {
        fetchTags(page)
    }, [])

    const changePage = (page) => {
        setPage(page);
        fetchTags(page);
    }

    const createTag = (newTag, imageData) => {
        TagService.save(newTag)
        .then((result) => { 
            TagService.uploadImage(result.data.entityId, imageData)
        })
        .then(async () => {
            TagService.getPage(page).then((result) => {
                setTags(result.data.content);
                setTotalPages(result.data.totalPages)
            })});
    }

    const removeTag = (tag) => {
        TagService.remove(tag).then(async () => {
            TagService.getPage(page).then((result) => {
                setTags(result.data.content);
                setTotalPages(result.data.totalPages)
            })}); 
    }

    const updateTag = (tag) => {
        TagService.update(tag).then(async () => {
            TagService.getPage(page).then((result) => {
                setTags(result.data.content);
                setTotalPages(result.data.totalPages)
            })});
    }

    const updateImage = (entityId, imageData) => {
        TagService.uploadImage(entityId, imageData)
    }

    return(
        <Container className="Tags">
            <TagModalCreate create={createTag}/>
            {tagError && <h1>Произошла ошибка ${tagError}</h1>}
            {isTagsLoading
            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}><Loader/></div>
            : <TagList update={updateTag} updateImage={updateImage} remove={removeTag} tags={tags}/>
            }
            <ButtonPages pagesArray={pagesArray} page={page} setPage={changePage}/>
        </Container>
    );
}

export default Tags;