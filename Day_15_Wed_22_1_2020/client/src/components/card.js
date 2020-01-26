import React, { Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { convert } from "../utils/convertUnixToDate";
import Image from "../images/heal-2.jpg";
import { Card, Icon, Avatar } from 'antd';


export const FoodCard = (props) => {
    const { Meta } = Card;

    const Desc = (
        <Fragment>
            <p>Date: {convert(props.date)} <br /> Cal: {props.calorie}</p>
        </Fragment>
    );

    return (
        <Fragment key={props.index}>
            <Card
                style={{ width: '100%' }}
                loading={props.loading}
                cover={
                    <img
                        alt="example"
                        src={props.image}
                    />
                }
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={props.foodName}
                    description={Desc}
                />
            </Card>
        </Fragment>
    );
}