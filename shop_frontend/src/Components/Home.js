import React, { useEffect, useState } from 'react';
import ProductRequests from "../Requests/ProductRequests";
import { useParams, Link } from "react-router-dom"; // Import Link component
import {
    Autocomplete,
    Button, ButtonGroup, Checkbox,
    Container,
    css, FormControl, FormControlLabel, FormGroup, FormLabel, Grid,
    MenuItem,
    Pagination,
    Select,
    Skeleton, Slider,
    TextField,
    ToggleButton,
    ToggleButtonGroup, Typography
} from "@mui/material";
import CategoryRequests from "../Requests/CategoryRequests";
import ProductShortCut from "./ProductShortCut";
import BuyOverlay from "./BuyOverlay";

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

function Home({cart,setCart,fetchCart}){
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [sizes, setSizes] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);
    const [params, setParams] = useState({size: 12});
    const [priceRange, setPriceRange] = useState([20, 37]);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [selectedProduct,setSelectedProduct] = useState()
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const categoriesData = await CategoryRequests.getCategories();
        setCategories(categoriesData);
        const sizesData = await ProductRequests.getProductsSizes();
        setSizes(sizesData);
    }
    useEffect(() => {
        fetchProducts();
    }, [params]);
    const fetchProducts = async () => {
        const productsData = await ProductRequests.getAllProducts(params);
        setProducts(productsData.products);
        setPagesCount(productsData.pages);
    }
    const onPageChange = (event, value) => {
        event.preventDefault()
        setCurrentPage(value - 1);
        setParams({...params, page: value - 1});
    }
    const renderSkeletons = () => {
        const skeletons = [];
        for (let i = 0; i < 16; i++) {
            skeletons.push(<Skeleton key={i} variant="rectangular" width={210} height={60} />);
        }
        return skeletons;
    };

    const handleSort = (value) => {
        if (value === params.sort) {
            setParams({...params, direction: params.direction === 'asc' ? 'desc' : 'asc'});
        } else if(value !== ''){
            setParams({...params, sort: value, direction: 'asc'});
        }
        else {
            const { sort: deletedField, direction: deleted, ...updatedParams } = params;
            setParams(updatedParams);
        }
    };
    const handleFiltersChange = (elementName, value, checked) => {
        const oldValue = params.hasOwnProperty(elementName) ? params[elementName] : [];
        const newValue = checked ? [...oldValue, value] : oldValue.filter((c) => c !== value);
        if (newValue.length > 0) {
            setParams({ ...params, [elementName]: newValue });
        } else {
            const { [elementName]: deletedField,  ...updatedParams } = params;
            setParams(updatedParams);
        }
    };
    const handleChange = (event, newValue) => {
        setPriceRange(newValue);
        setParams({...params, minPrice: newValue[0], maxPrice: newValue[1]})
    };
    const onOverlayClose = () => {
        setIsOverlayOpen(false)
    }
    const onOverlayOpen = (product) => {
        setIsOverlayOpen(true)
        setSelectedProduct(product)
    }
    return (
        <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh',  minWidth: '100%', marginTop: '40px'}}>
            <Grid container textAlign={'left'} spacing={5} style={{minWidth: "100%"}}>
                <Grid item xl={2} xs={2} md={2}>
                    <Grid container direction={"column"} spacing={2} style={{ border: '1px solid #ccc', backgroundColor: '#f9f9f9'}}>
                        <Grid item xl={1} xs={1} md={1}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Категорії</FormLabel>
                                <FormGroup>
                                    {categories && categories.map((category) => (
                                        <FormControlLabel
                                            key={category.id}
                                            control={<Checkbox checked={params.categories && params.categories.includes(category.value)} onChange={(event) => handleFiltersChange('categories',category.value, event.target.checked)} />}
                                            label={category.label}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xl={1} xs={1} md={1}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Розміри</FormLabel>
                                <FormGroup>
                                    {sizes && sizes.map((size) => (
                                        <FormControlLabel
                                            key={size.id}
                                            control={<Checkbox checked={params.sizes && params.sizes.includes(size.name)} onChange={(event) => handleFiltersChange('sizes',size.name, event.target.checked)} />}
                                            label={size.name}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xl={1} xs={1} md={1} style={{paddingLeft: 0}}>
                            <ButtonGroup variant="outlined" color="primary" aria-label="sort">
                                <Grid container spacing={0}>
                                    <Grid item xl={6} xs={6} md={6}>
                                        <Button style={{width: '100%'}} onClick={() => handleSort('')} variant={!params.sort ? 'contained' : 'outlined'}>
                                            None
                                        </Button>
                                    </Grid>
                                    <Grid item xl={6} xs={6} md={6}>
                                        <Button style={{width: '100%'}} onClick={() => handleSort('price')} endIcon={params.sort === 'price' && (params.direction === 'asc' ? '🔼' : '🔽')}>
                                            Price
                                        </Button>
                                    </Grid>
                                    <Grid item xl={6} xs={6} md={6}>
                                        <Button style={{width: '100%'}} onClick={() => handleSort('discount')} endIcon={params.sort === 'discount' && (params.direction === 'asc' ? '🔼' : '🔽')}>
                                            Discount
                                        </Button>
                                    </Grid>
                                    <Grid item xl={6} xs={6} md={6}>
                                        <Button style={{width: '100%'}} onClick={() => handleSort('averageReviewMark')} endIcon={params.sort === 'averageReviewMark' && (params.direction === 'asc' ? '🔼' : '🔽')}>
                                            Rating
                                        </Button>
                                    </Grid>
                                </Grid>
                            </ButtonGroup>
                        </Grid>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xl={2} xs={2} md={2}>
                                <Typography variant="body1" style={{ textAlign: 'center' }}>Ціна:</Typography>
                            </Grid>
                            <Grid item xl={9} xs={9} md={9}>
                                <Slider
                                    aria-labelledby="price-slider"
                                    getAriaValueText={(value) => `${value}₴`}
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={(value) => `${value}₴`}
                                    min={1}
                                    max={9999}
                                    value={priceRange}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xl={10} xs={10} md={10} >
                    <Grid container spacing={0} >
                        {!products && [...Array(4)].map((_, rowIndex) => (
                            <div key={rowIndex} style={{ display: 'flex', marginBottom: '20px' }}>
                                {[...Array(4)].map((_, colIndex) => (
                                    <div key={colIndex} style={{ marginRight: '20px' }}>
                                        {renderSkeletons().slice(rowIndex * 4 + colIndex, rowIndex * 4 + colIndex + 1)}
                                    </div>
                                ))}
                            </div>
                        ))}
                        {products && products.map((item, index) => (
                            <Grid key={index} item xl={4} xs={4} md={4}>
                                <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}> {/* Wrap ProductShortCut with Link */}
                                    <ProductShortCut product={item} onOverlayOpen={onOverlayOpen}/>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <div style={{ marginTop: '20px' }}>
                <Pagination
                    onChange={onPageChange}
                    color={'secondary'}
                    count={pagesCount}
                    size="large"
                    defaultPage={1}
                />
            </div>
            <BuyOverlay fetchData={fetchCart} cart={cart} setCart={setCart} product={selectedProduct} open={isOverlayOpen} handleClose={onOverlayClose}/>
        </Container>
    );
}

export default Home;
