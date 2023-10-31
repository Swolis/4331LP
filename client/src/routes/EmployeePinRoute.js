// client/src/routes/EmployeePinRoute.js

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EmployeeLogin from '../components/Login/EmployeeLogin.';

const EmployeePinRoute = () => {
    return (
        <Switch>
            {/* A route that navigates to the emplyee login page */}
            <Route path="/employee-login" component={EmployeeLogin} />
        </Switch>
    );
};

export default EmployeePinRoute;