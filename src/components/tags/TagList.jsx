import React from "react";
import TagItem from './TagItem'
import Row from 'react-bootstrap/Row'

function TagList({tags, remove, update, updateImage}) {
    if(!tags.length) {
        return (
        <h1 style={{textAlign: "center"}}>
            Теги не найдены!
        </h1>
        )
    }

    return (
        <div className="tag__list">
            <h1 style={{textAlign: "center"}}>Список тегов</h1>
            <Row className="tag__list__content">
                {tags.map((tag) => 
                <TagItem remove={remove} update={update} updateImage={updateImage} tag={tag} key={tag.entityId}/>)}
            </Row>
        </div>
    );
}

export default TagList;