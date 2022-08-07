import React, {useState, useEffect, useMemo, Suspense} from "react";
import ProductService from "../API/ProductService";
import TagService from "../API/TagService";
import ProductList from "../components/products/ProductList";
import ProductModalCreate from "../components/products/ProductModalCreate";
import Loader from "../UI/Loader/Loader";
import '../styles/Products.css';
import { useFetching } from "../hooks/useFetching";
import Container from 'react-bootstrap/Container'
import ButtonPages from "../components/ButtonPages";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { components } from "react-select";
import { default as ReactSelect } from "react-select";


function Products() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [tagOptions, setTagOptions] = useState([]);
    const [optionSelected, setOptionSelected] = useState(null);
    const handleChange = (selected) => {
        setOptionSelected(selected);
      };
    let pagesArray = [];

    const [fetchProducts, isProductsLoading, productError] = useFetching(async (page) => {
        const response = await ProductService.getPage(page);
        setProducts(response.data.content);
        console.log(response.data.content)
        setTotalPages(response.data.totalPages);
    });

    useMemo(() => {
        for(let i = 0; i < totalPages; i++) {
            pagesArray.push(i);
        }
    }, [totalPages, pagesArray]);

    useEffect(() => {
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
        fetchProducts(page)
    }, []);

    const changePage = (page) => {
        setPage(page);
        handleTagSearch(page);
    }

    const createProduct = (newProduct, imageData) => {
        ProductService.save(newProduct)
        .then((result) => { 
            ProductService.uploadImage(result.data.entityId, imageData)
        })
        .then(async () => {
            ProductService.getPage(page).then((result) => {
                setProducts(result.data.content);
                setTotalPages(result.data.totalPages)
            })});
    }

    const removeProduct = (Product) => {
        ProductService.remove(Product).then(async () => {
            ProductService.getPage(page).then((result) => {
                setProducts(result.data.content);
                setTotalPages(result.data.totalPages)
            })}); 
    }

    const updateProduct = (Product) => {
        ProductService.update(Product).then(async () => {
            ProductService.getPage(page).then((result) => {
                setProducts(result.data.content);
                setTotalPages(result.data.totalPages)
            })});
    }

    const updateImage = (entityId, imageData) => {
        ProductService.uploadImage(entityId, imageData)
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
                onChange={handleChange}
                allowSelectAll={true}
                value={optionSelected}
              />
            </span>
          </Form.Group>
        );
    }

    const handleTagSearch = async (page) => {
        if(optionSelected === null || optionSelected.length === 0) {
            fetchProducts(page);
        } else {
            const tags = optionSelected.map(option => option.value);
            const response = await ProductService.getPageFilterByIds(page, tags);
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
            if(response.data.totalPages < this.page) {
                this.page = 0;
            } 
        }
    }

    return(
        <Container className="products">
            <ProductModalCreate create={createProduct} tagOptions={tagOptions}/>
            <Row>
                <Suspense>
                    <TagList/>
                </Suspense>
                <Button onClick={() => {handleTagSearch(page)}}>Фильтрация</Button>
            </Row>
            {productError && <h1>Произошла ошибка ${productError}</h1>}
            {isProductsLoading
            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}><Loader/></div>
            : <ProductList update={updateProduct} updateImage={updateImage} remove={removeProduct} products={products} tagOptions={tagOptions}/>
            }
            <ButtonPages pagesArray={pagesArray} page={page} setPage={changePage}/>
        </Container>
    );

}

export default Products;