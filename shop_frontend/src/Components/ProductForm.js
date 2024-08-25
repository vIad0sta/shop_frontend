import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Box } from '@mui/material';
import CategoryRequests from '../Requests/CategoryRequests';
import ProductRequests from "../Requests/ProductRequests";

const ProductForm = () => {
    const [formValues, setFormValues] = useState({
        id: 0,
        name: '',
        article: '',
        price: 0,
        discount: 0,
        category: {},
        clothingSizes: [],
        gender: '',
        averageReviewMark: 0,
        description: ''
    });
    const [categories, setCategories] = useState([]);
    const [newClothingSize, setNewClothingSize] = useState({ name: '', quantity: 0 });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await CategoryRequests.getCategories();
        setCategories(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleClothingSizeChange = (e) => {
        const { name, value } = e.target;
        setNewClothingSize({ ...newClothingSize, [name]: value });
    };

    const addClothingSize = () => {
        setFormValues((prevState) => ({
            ...prevState,
            clothingSizes: [...prevState.clothingSizes, newClothingSize]
        }));
        setNewClothingSize({ name: '', quantity: 0 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const convertedFormValues = {
            ...formValues,
            id: Number(formValues.id),
            price: Number(formValues.price),
            discount: Number(formValues.discount),
            averageReviewMark: Number(formValues.averageReviewMark),
            clothingSizes: formValues.clothingSizes.map(size => ({
                ...size,
                quantity: Number(size.quantity)
            }))
        };

        console.log('Form values:', convertedFormValues);
        const resp = await ProductRequests.addProduct(convertedFormValues);
    };

    return (
        <Box maxWidth={400} mx="auto" p={2}>
            <Typography variant="h4" gutterBottom>
                Product Form
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box mb={1}>
                    <TextField
                        required
                        label="ID"
                        name="id"
                        value={formValues.id}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Box>
                <Box mb={1}>
                    <TextField
                        required
                        label="Name"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Box>
                <Box mb={1}>
                    <TextField
                        required
                        label="Article"
                        name="article"
                        value={formValues.article}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Box>
                <Box mb={1}>
                    <TextField
                        required
                        label="Price"
                        name="price"
                        type="number"
                        value={formValues.price}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Box>
                <Box mb={1}>
                    <TextField
                        required
                        label="Discount"
                        name="discount"
                        type="number"
                        value={formValues.discount}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Box>
                <Box mb={1}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            required
                            label="Category"
                            name="category"
                            value={formValues.category}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categories.length && categories.map((item, index) => (
                                <MenuItem key={index} value={item.id}>
                                    <em>{item.label}</em>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box mb={1}>
                    <FormControl fullWidth>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            required
                            label="Gender"
                            name="gender"
                            value={formValues.gender}
                            onChange={handleInputChange}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="MEN">MEN</MenuItem>
                            <MenuItem value="WOMEN">WOMEN</MenuItem>
                            <MenuItem value="BOYS">BOYS</MenuItem>
                            <MenuItem value="GIRLS">GIRLS</MenuItem>
                            <MenuItem value="UNISEX">UNISEX</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box mb={1}>
                    <TextField
                        required
                        label="Average Review Mark"
                        name="averageReviewMark"
                        type="number"
                        value={formValues.averageReviewMark}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Box>
                <Box mb={1}>
                    <TextField
                        required
                        label="Description"
                        name="description"
                        value={formValues.description}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        fullWidth
                    />
                </Box>
                <Box mb={1}>
                    <Typography variant="h6" gutterBottom>
                        Add Clothing Sizes
                    </Typography>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <TextField
                            label="Size"
                            name="name"
                            value={newClothingSize.name}
                            onChange={handleClothingSizeChange}
                            fullWidth
                            sx={{ mr: 1 }}
                        />
                        <TextField
                            label="Quantity"
                            name="quantity"
                            type="number"
                            value={newClothingSize.quantity}
                            onChange={handleClothingSizeChange}
                            fullWidth
                        />
                    </Box>
                    <Button variant="contained" color="primary" onClick={addClothingSize} fullWidth>
                        Add Size
                    </Button>
                </Box>
                <Button variant="contained" color="primary" type="submit" fullWidth disabled={!formValues.clothingSizes.length}>
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default ProductForm;
