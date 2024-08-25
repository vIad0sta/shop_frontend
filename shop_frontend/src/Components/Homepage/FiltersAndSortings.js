import React from 'react';
import {Button, ButtonGroup, Grid, Slider, Typography} from "@mui/material";
import CustomFormControl from "./CustomFormControl";

function FiltersAndSortings({params, categories, sizes, setParams, setPriceRange, priceRange}) {
    const handleSort = (value) => {
        if (value === params.sort) {
            setParams({...params, direction: params.direction === 'asc' ? 'desc' : 'asc'});
        } else if (value !== '') {
            setParams({...params, sort: value, direction: 'asc'});
        } else {
            const {sort: deletedField, direction: deleted, ...updatedParams} = params;
            setParams(updatedParams);
        }
    };
    const handleFiltersChange = (elementName, value, checked) => {
        const oldValue = params.hasOwnProperty(elementName) ? params[elementName] : [];
        const newValue = checked ? [...oldValue, value] : oldValue.filter((c) => c !== value);
        if (newValue.length > 0) {
            setParams({...params, [elementName]: newValue});
        } else {
            const {[elementName]: deletedField, ...updatedParams} = params;
            setParams(updatedParams);
        }
    };
    const handleChange = (event, newValue) => {
        setPriceRange(newValue);
        setParams({...params, minPrice: newValue[0], maxPrice: newValue[1]})
    };

    const buttonsProperties = [
        {label: 'Немає', style: {width: '100%'}, onClick: () => handleSort('')},
        {label: 'Ціна', style: {width: '100%'}, onClick: () => handleSort('price'), sort: 'price'},
        {label: 'Знижка', style: {width: '100%'}, onClick: () => handleSort('discount'), sort: 'discount'},
        {label: 'Рейтинг', style: {width: '100%'}, onClick: () => handleSort('averageReviewMark'), sort: 'averageReviewMark'},
    ];
    return (
        <Grid item xl={2} xs={2} md={2}>
            <Grid container direction={"column"} spacing={2}
                  style={{border: '1px solid #ccc', backgroundColor: '#f9f9f9'}}>
                <Grid item xl={1} xs={1} md={1}>
                    <CustomFormControl handleFiltersChange={handleFiltersChange} params={params}
                                       fieldName={'categories'} items={categories} label={'Категорії'}/>
                </Grid>
                <Grid item xl={1} xs={1} md={1}>
                    <CustomFormControl handleFiltersChange={handleFiltersChange} params={params} fieldName={'sizes'}
                                       items={sizes} label={'Розміри'}/>
                </Grid>
                <Grid item xl={1} xs={1} md={1} style={{paddingLeft: 0}}>
                    <ButtonGroup variant="outlined" color="primary" aria-label="sort">
                        <Grid container spacing={0}>
                            {buttonsProperties && buttonsProperties.map((item, index) => (
                                <Grid item xl={6} xs={6} md={6}>
                                    {index === 0 ?
                                        <Button style={item.style} onClick={item.onClick}
                                                variant={!params.sort ? 'contained' : 'outlined'}>
                                            {item.label}
                                        </Button> :
                                        <Button style={item.style} onClick={item.onClick}
                                                endIcon={params.sort === item.sort && (params.direction === 'asc' ? '🔼' : '🔽')}>
                                            {item.label}
                                        </Button>}
                                </Grid>
                            ))}
                        </Grid>
                    </ButtonGroup>
                </Grid>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xl={2} xs={2} md={2}>
                        <Typography variant="body1" style={{textAlign: 'center'}}>Ціна:</Typography>
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
    );
}

export default FiltersAndSortings;