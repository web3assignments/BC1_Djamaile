import React, { Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {convert} from "../utils/convertUnixToDate";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Image from "../images/salad.jpg";

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export const FoodCard = (props) => {
    const classes = useStyles();
    return (
        <Fragment key={props.index}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={Image}
                        title={props.food}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.food}
                         </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                           {convert(props.date)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Fragment>
    );
}