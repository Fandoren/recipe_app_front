import React, {useState, useEffect, useMemo} from "react";
import ProductService from "../API/ProductService";
import ProductList from "../components/products/ProductList";
import ProductModalCreate from "../components/products/ProductModalCreate";
import Loader from "../UI/Loader/Loader";
import '../styles/Products.css'
import { useFetching } from "../hooks/useFetching";
import Container from 'react-bootstrap/Container'
import ButtonPages from "../components/ButtonPages";

function Products() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    let pagesArray = [];

    const [fetchProducts, isProductsLoading, productError] = useFetching(async (page) => {
        const response = await ProductService.getPage(page);
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
    });

    useMemo(() => {
        for(let i = 0; i < totalPages; i++) {
            pagesArray.push(i);
        }
    }, [totalPages, pagesArray]);

    useEffect(() => {
        fetchProducts(page)
    }, []);

    const changePage = (page) => {
        setPage(page);
        fetchProducts(page);
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

    return(
        <Container className="products">
            <ProductModalCreate create={createProduct}/>
            {productError && <h1>Произошла ошибка ${productError}</h1>}
            {isProductsLoading
            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}><Loader/></div>
            : <ProductList update={updateProduct} updateImage={updateImage} remove={removeProduct} products={products}/>
            }
            <ButtonPages pagesArray={pagesArray} page={page} setPage={changePage}/>
        </Container>
    );

}

export default Products;