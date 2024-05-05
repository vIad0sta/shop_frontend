import {Card, CardContent, CardMedia, Typography} from "@mui/material";

function ProductShortCut(props){
    return (
        <Card variant="outlined">
            <CardMedia
                component="img"
                height="200"
                image={`https://localhost:8080/images/${props.product.id}/${props.product.id}_1.png`}
                alt={props.product.name}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.product.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Price: {props.product.price.toFixed(2)}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Discount: {props.product.discount.toFixed(2)}
                </Typography>
            </CardContent>
        </Card>
    );
}
export default ProductShortCut;