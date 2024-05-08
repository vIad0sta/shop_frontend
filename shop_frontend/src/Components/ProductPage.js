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
    CardMedia,
    Rating
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import ProfileInfo from "./ProfileInfo";
import ProfileOrders from "./ProfileOrders";
import TabContext from "@mui/lab/TabContext";
import MainProductInfo from "./MainProductInfo";
import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";
import ReviewRequests from "../Requests/ReviewRequests";
import CartRequests from "../Requests/CartRequests";
import UserRequests from "../Requests/UserRequests";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                padding: "10px",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                zIndex: "1",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: 'lightblue',
                alignItems: 'center',

            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                fontSize: '24px',
                display: "flex",
                padding: "10px",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                zIndex: "1",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                justifyContent: 'right',
                alignItems: 'center',
                backgroundColor: 'lightblue'

            }}
            onClick={onClick}
        />
    );
}
function ProductPage({cart,setCart,fetchCart}) {

    const [product, setProduct] = useState(null);
    const [imageCounter, setImageCounter] = useState(); // State to keep track of the current image counter
    const { id } = useParams();
    const url = 'https://localhost:8080/images';
    const [value, setValue] = useState('1')
    const [reviews, setReviews] = useState()
    const [signedIn,setSignedIn] = useState(localStorage.getItem('signedIn') === 'true')
    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const fetchData = async () => {
        try {
            const productResponse = await ProductRequests.getProduct(id);
            setProduct(productResponse);
            const imagesResponse = await ProductRequests.getProductImagesAmount(id);
            setImageCounter(new Array(imagesResponse).fill(null).map((_, index) => index + 1));
            const reviewResponse = await ProductRequests.getProductReviews(id)
            setReviews(reviewResponse)
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };



    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow  />,
    };


    return (
        <Container maxWidth="md">
            {product && (
                <Card>
                    <Slider {...settings}>
                        {imageCounter && imageCounter.map(index => (
                            <div key={index}>
                                <CardMedia
                                    component="img"
                                    alt={`Product Image ${index}`}
                                    image={`${url}/${id}/${id}_${index}.png`}
                                    style={{ width: '100%', height: '70vh' }} // Set image width to 100% and height to auto
                                />
                            </div>
                        ))}
                    </Slider>
                    <TabContext value={value} >
                        <Box sx={{borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Main" value="1" />
                                <Tab label="Description" value="2" />
                                <Tab label="Reviews" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><MainProductInfo product={product} cart={cart} setCart={setCart} fetchData={fetchCart}/></TabPanel>
                        <TabPanel value="2"><ProductDescription /></TabPanel>
                        <TabPanel value="3"><ProductReviews reviews={reviews} setReviews={setReviews}/></TabPanel>
                    </TabContext>
                </Card>
            )}
        </Container>
    );
}

export default ProductPage;
