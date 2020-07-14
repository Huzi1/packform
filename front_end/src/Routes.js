import React from "react";
import View from "./componenets/View";
import { Switch, Route } from "react-router-dom";
import Landing from "./componenets/Landing"



const Routes = () => {

    return (
        <>
            <Switch>
                <Route path={"/"} component={Landing} exact />
                <Route path={"/Orders"} component={View} exact />
            </Switch>


        </>
    );
};

export default Routes;