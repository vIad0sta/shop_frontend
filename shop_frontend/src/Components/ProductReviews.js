import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Rating,
    Divider
} from '@mui/material';
import ReviewRequests from "../Requests/ReviewRequests";
import {useParams} from "react-router-dom";
import ProductRequests from "../Requests/ProductRequests";

function ProductReviews({ reviews, setReviews}) {
    const { id } = useParams();

    const [newReview, setNewReview] = useState({
        clothingId: id,
        mark: 0,
        reviewText: ''
    });

    const handleReviewChange = (e) => {
        setNewReview({
            ...newReview,
            [e.target.name]: e.target.value
        });
    };

    const handleReviewSubmit = async () => {
        await ReviewRequests.addReview(newReview)
        setNewReview({
            mark: 0,
            reviewText: ''
        });
        const reviewResponse = await ProductRequests.getProductReviews(id)
        setReviews(reviewResponse)
    };

    return (
        <div>
            <Typography variant="h6">Reviews</Typography>
            {reviews.map(review => (
                <Box key={review.id} sx={{ my: 2 }}>
                    <Rating value={review.mark} readOnly precision={0.1}/>
                    <Typography variant="body1">{review.reviewText}</Typography>
                    <Divider sx={{ my: 1 }} />
                </Box>
            ))}
            <Typography variant="h6">Leave a Review</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Rating
                    name="mark"
                    value={newReview.mark}
                    onChange={(event, newValue) => {
                        setNewReview({
                            ...newReview,
                            mark: newValue
                        });
                    }}
                    precision={0.1}

                />
                <TextField
                    name="reviewText"
                    value={newReview.reviewText}
                    onChange={handleReviewChange}
                    label="Your Review"
                    variant="outlined"
                    multiline
                    rows={4}
                    sx={{ mt: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReviewSubmit}
                    sx={{ mt: 2 }}
                >
                    Submit Review
                </Button>
            </Box>
        </div>
    );
}

export default ProductReviews;
