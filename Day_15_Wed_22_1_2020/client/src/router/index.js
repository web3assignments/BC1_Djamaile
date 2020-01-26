import React, { Fragment, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../utils/history";
import App from "../views/home/App";
import Grid from '@material-ui/core/Grid';
import SideNav from "../components/sidenav";
import AddFood from "../views/add-food-item/AddFood";
import BurnCal from "../views/burn/BurnCalorie";

const AppRouter = () => {
    return(
        <Fragment>
            <Router history={history}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <SideNav/>
                    </Grid>
                    <Grid item xs={7}>
                        <Switch>
                            <Route path="/" exact component={App} />
                            <Route path="/burn-cal" exact component={BurnCal}/>
                            <Route path="/add-food" exact component={AddFood}/>
                        </Switch>
                    </Grid>
                </Grid>
            </Router>
        </Fragment>
    );
};

export default AppRouter;
