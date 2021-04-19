/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from './Auth';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useState(false);
    const auth = useAuth();

    const history = useHistory()
    const location = useLocation()
    const {from} = location.state || {from: {pathname: '/'}};

    // handle google signin
    const handleGoogleSignIn = () => {
        auth.signInWithPopUp()
        .then(res => {
            handleResponse(res, true);
        })
    }
    const handleResponse = (res, redirect) => {
        setLoggedInUser(res);
        if(redirect) {
            history.replace(from)
        }
    }
    return (
        <div className="App">
            <button type="button" onClick={handleGoogleSignIn}>Login</button>
        </div>
    );
};

export default Login;