import {useEffect, useState} from "react";
import ProductRequests from "../Requests/ProductRequests";
import {
    Autocomplete,
    Button, ButtonGroup,
    Container,
    css, Grid,
    MenuItem,
    Pagination,
    Select,
    Skeleton,
    TextField,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import CategoryRequests from "../Requests/CategoryRequests";

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

function Home(){
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [sizes, setSizes] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('');
    const [gender, setGender] = useState('');
    const [params, setParams] = useState({});
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const productsData = await ProductRequests.getAllProducts({});
        setProducts(productsData);
        const categoriesData = await CategoryRequests.getCategories();
        setCategories(categoriesData);
        const sizesData = await ProductRequests.getProductsSizes();
        setSizes(sizesData);
        const pagesData = await ProductRequests.getProductsPages();
        setPagesCount(pagesData);
    }
    useEffect(() => {
        fetchProducts();
    }, [params]);
    const fetchProducts = async () => {
        console.log(params)
        const productsData = await ProductRequests.getAllProducts(params);
        setProducts(productsData);
    }
    const onPageChange = (event, value) => {
        event.preventDefault()
        setCurrentPage(value);
        setParams({...params, page: value});
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

    const handleFilterChange = (elementName, value) => {
        if (value === '' || value.length === 0) {
            const { [elementName]: deletedField, ...updatedParams } = params;
            setParams(updatedParams);
        } else {
            setParams({...params, [elementName]: value});
        }
    };
    const handleGenderChange = (value) => {
        if (value === '') {
            const { gender: deletedField, ...updatedParams } = params;
            setParams(updatedParams);        }
        else {
            const genderArr = params.gender ? [...params.gender] : [];
            if (!genderArr.includes(value)) {
                setParams({ ...params, gender: [...genderArr, value] });
            } else {
                const updatedGenderArr = genderArr.filter((item) => item !== value);
                const updatedParams = updatedGenderArr.length > 0 ? { ...params, gender: updatedGenderArr } : { ...params, gender: undefined };
                setParams(updatedParams);
            }
        }
    }
    return (
        <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div>
                    <Grid container>
                        <Grid item xs={6}>
                            {categories && (
                                <Autocomplete
                                    id="category"
                                    multiple
                                    options={categories}
                                    disableCloseOnSelect
                                    onChange={(event, value, reason, details) => handleFilterChange('category',value.map((item) =>  item.value))}
                                    renderInput={(params) => <TextField {...params} label="Categories" />}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    getOptionLabel={(option) => option.label}
                                    getOptionSelected={(option, value) => option.value === value.value}
                                />
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            {sizes && (
                                <Autocomplete
                                    id="size"
                                    multiple
                                    options={sizes}
                                    disableCloseOnSelect
                                    onChange={(event, value, reason, details) => handleFilterChange('sizes',value.map((item) =>  item.name))}
                                    renderInput={(params) => <TextField {...params} label="Sizes" />}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    getOptionLabel={(option) => option.name}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                />
                            )}
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item>
                            <ButtonGroup variant="outlined" color="primary" aria-label="sort">
                                <Button
                                    onClick={() => handleSort('')}
                                    variant={ !params.sort ? 'contained' : 'outlined'}
                                >
                                    None
                                </Button>
                                <Button
                                    onClick={() => handleSort('price')}
                                    endIcon={ params.sort === 'price' && (params.direction === 'asc' ? '🔼' : '🔽')}
                                >
                                    Price
                                </Button>
                                <Button
                                    onClick={() => handleSort('discount')}
                                    endIcon={ params.sort === 'discount' && (params.direction === 'asc' ? '🔼' : '🔽')}
                                >
                                    Discount
                                </Button>
                                <Button
                                    onClick={() => handleSort('averageReviewMark')}
                                    endIcon={ params.sort === 'averageReviewMark' && (params.direction === 'asc' ? '🔼' : '🔽')}
                                >
                                    Rating
                                </Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item>
                            <ButtonGroup variant="contained" color="primary" aria-label="gender">
                                <Button
                                    onClick={() => handleGenderChange('')}
                                    variant={ !params.gender ? 'contained' : 'outlined'}
                                >
                                    None
                                </Button>
                                <Button
                                    onClick={() => handleGenderChange('MEN')}
                                    variant={ params.gender && params.gender.includes('MEN') ? 'contained' : 'outlined'}
                                >
                                    Men
                                </Button>
                                <Button
                                    onClick={() => handleGenderChange('WOMEN')}
                                    variant={ params.gender && params.gender.includes('WOMEN') ? 'contained' : 'outlined'}
                                >
                                    Women
                                </Button>
                                <Button
                                    onClick={() => handleGenderChange('UNISEX')}
                                    variant={ params.gender && params.gender.includes('UNISEX') ? 'contained' : 'outlined'}
                                >
                                    Unisex
                                </Button>
                                <Button
                                    onClick={() => handleGenderChange('BOYS')}
                                    variant={ params.gender && params.gender.includes('BOYS') ? 'contained' : 'outlined'}
                                >
                                    Boys
                                </Button>
                                <Button
                                    onClick={() => handleGenderChange('GIRLS')}
                                    variant={ params.gender && params.gender.includes('GIRLS') ? 'contained' : 'outlined'}
                                >
                                    Girls
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>

                    <TextField id="minPrice" label="Min price" type="number"
                               inputProps={{ min: 1 }}
                               variant="standard" />
                    <TextField id="maxPrice" label="Max price" type="number"
                               inputProps={{ min: 1 }}
                               variant="standard" />

                </div>
            </div>
            {!products && [...Array(4)].map((_, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex', marginBottom: '20px' }}>
                    {[...Array(4)].map((_, colIndex) => (
                        <div key={colIndex} style={{ marginRight: '20px' }}>
                            {renderSkeletons().slice(rowIndex * 4 + colIndex, rowIndex * 4 + colIndex + 1)}
                        </div>
                    ))}
                </div>
            ))}
            <Pagination
                onChange={onPageChange}
                color={'secondary'}
                count={pagesCount}
                size="large"
                defaultPage={1}
            />
        </Container>
    );
}

export default Home;