import React, {useCallback, useEffect, useState} from 'react';
import ProductRequests from "../Requests/ProductRequests";
import {Link} from "react-router-dom";
import {Container, css, Grid, Pagination, Skeleton} from "@mui/material";
import CategoryRequests from "../Requests/CategoryRequests";
import ProductShortCut from "../Components/Homepage/ProductShortCut";
import BuyOverlay from "../Overlays/BuyOverlay";
import FiltersAndSortings from "../Components/Homepage/FiltersAndSortings";
import {debounce} from "lodash";

const paginationStyles = css`
  .MuiPaginationItem-root {
    color: white;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .Mui-selected {
    color: #111111;
  }
`;

function Home() {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [sizes, setSizes] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);
    const [params, setParams] = useState({size: 12});
    const [priceRange, setPriceRange] = useState([20, 37]);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => {
        fetchData();
        fetchProducts()
    }, []);
    useEffect(() => {
        if (Object.keys(params).length > 1) {
            debouncedFetchProducts();
        }
    }, [params]);
    const fetchData = async () => {
        const categoriesData = await CategoryRequests.getCategories();
        setCategories(categoriesData);
        const sizesData = await ProductRequests.getProductsSizes();
        setSizes(sizesData);
    }
    const fetchProducts = async () => {
        const productsData = await ProductRequests.getAllProducts(params);
        setProducts(productsData.products);
        setPagesCount(productsData.pages);
    }
    const debouncedFetchProducts = useCallback(debounce(fetchProducts, 500), [params]);
    useEffect(() => {
        return () => {
            debouncedFetchProducts.cancel();
        };
    }, [debouncedFetchProducts]);
    const onPageChange = (event, value) => {
        event.preventDefault();
        const newValue = value - 1;
        setCurrentPage(newValue);
        setParams({...params, page: newValue});
    }
    const renderSkeletons = () => {
        const skeletons = [];
        for (let i = 0; i < 16; i++) {
            skeletons.push(<Skeleton key={i} variant="rectangular" width={210} height={60}/>);
        }
        return skeletons;
    };

    const onOverlayClose = () => {
        setIsOverlayOpen(false)
    }
    const onOverlayOpen = (product) => {
        setIsOverlayOpen(true)
        setSelectedProduct(product)
    }
    return (
        <Container maxWidth="xl" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            minWidth: '100%',
            marginTop: '40px'
        }}>
            <Grid container textAlign={'left'} spacing={5} style={{minWidth: "100%"}}>
                <FiltersAndSortings setParams={setParams} params={params} categories={categories} sizes={sizes}
                                    setPriceRange={setPriceRange} priceRange={priceRange}/>
                <Grid item xl={10} xs={10} md={10}>
                    <Grid container spacing={0}>
                        {!products && [...Array(4)].map((_, rowIndex) => (
                            <div key={rowIndex} style={{display: 'flex', marginBottom: '20px'}}>
                                {[...Array(4)].map((_, colIndex) => (
                                    <div key={colIndex} style={{marginRight: '20px'}}>
                                        {renderSkeletons().slice(rowIndex * 4 + colIndex, rowIndex * 4 + colIndex + 1)}
                                    </div>
                                ))}
                            </div>
                        ))}
                        {products && products.map((item, index) => (
                            <Grid key={index} item xl={4} xs={4} md={4}>
                                <Link to={`/product/${item.id}`} style={{textDecoration: 'none'}}>
                                    <ProductShortCut product={item} onOverlayOpen={onOverlayOpen}/>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <div style={{marginTop: '20px'}}>
                <Pagination
                    onChange={onPageChange}
                    color={'secondary'}
                    count={pagesCount}
                    size="large"
                    defaultPage={1}
                />
            </div>
            <BuyOverlay product={selectedProduct} open={isOverlayOpen} handleClose={onOverlayClose}/>
        </Container>
    );
}

export default Home;
