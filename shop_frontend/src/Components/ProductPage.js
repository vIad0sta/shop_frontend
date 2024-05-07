import React, { useEffect, useState } from 'react';
import ProductRequests from "../Requests/ProductRequests";
import { useParams } from "react-router-dom";
import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    Divider,
    CardMedia
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductPage(props) {
    const [product, setProduct] = useState(null);
    const [imageCounter, setImageCounter] = useState(); // State to keep track of the current image counter
    const { id } = useParams();
    const url = 'https://localhost:8080/images';
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const productResponse = await ProductRequests.getProduct(id);
            setProduct(productResponse);
            const imagesResponse = await ProductRequests.getProductImagesAmount(id);
            setImageCounter(new Array(imagesResponse).fill(null).map((_, index) => index + 1));
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };



    return (
        <Container maxWidth="md">
            {product && (
                <Card>
                    <Slider {...settings}>
                        {imageCounter && imageCounter.map(index => (
                            <div key={index} style={{ width: '100%'}}>
                                <CardMedia
                                    component="img"
                                    alt={`Product Image ${index}`}
                                    image={`${url}/${id}/${id}_${index}.png`}
                                    style={{ width: '100%', height: '40vh' }} // Set image width to 100% and height to auto
                                />
                            </div>
                        ))}
                    </Slider>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>{product.name}</Typography>
                        <Typography variant="body1" color="textSecondary">Article: {product.article}</Typography>
                        <Typography variant="h6" color="primary">Price: ${product.price}</Typography>
                        {product.discount > 0 && (
                            <Typography variant="body1" color="error">Discount: {product.discount * 100}%</Typography>
                        )}
                        <Typography variant="body1" color="textSecondary">Category: {product.category.label}</Typography>
                        <Typography variant="body1" color="textSecondary">Gender: {product.gender}</Typography>
                        <Typography variant="body1" color="textSecondary">Average Review Mark: {product.averageReviewMark}</Typography>
                        <Divider style={{ margin: "20px 0" }} />
                        <Typography variant="h6" gutterBottom>Clothing Sizes:</Typography>
                        <Grid container spacing={1}>
                            {product.clothingSizes.map((size) => (
                                <Grid item key={size.id}>
                                    <Chip label={size.name} />
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
}

export default ProductPage;
