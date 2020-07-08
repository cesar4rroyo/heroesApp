import React, { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import LoginScreen from "../components/login/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "../auth/PrivateRoute";
import { PublicRoute } from "../auth/PublicRoute";
import { AuthContext } from "../auth/AuthContext";

const AppRouter = () => {
    const { user } = useContext(AuthContext);
    return (
        <Router>
            <Switch>
                <PublicRoute
                    exact
                    path="/login"
                    component={LoginScreen}
                    isAuthenticated={user.logged}
                ></PublicRoute>
                <PrivateRoute
                    path="/"
                    component={DashboardRoutes}
                    isAuthenticated={user.logged}
                ></PrivateRoute>
            </Switch>
        </Router>
    );
};

export default AppRouter;
