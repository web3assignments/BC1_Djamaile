import React, { Fragment } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../utils/history";
import App from "../App";
import Grid from '@material-ui/core/Grid';
import SideNav from "../components/sidenav";
import Opera from "../Opera";

const AppRouter = () => (
    <Fragment>
        <Router history={history}>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <SideNav/>
                </Grid>
                <Grid item xs={10}>
                    <Switch>
                        <Route path="/"  exact component={App} />
                        <Route path="/opera" component={Opera} />
                    </Switch>
                </Grid>
            </Grid>
        </Router>
    </Fragment>
);

export default AppRouter;
