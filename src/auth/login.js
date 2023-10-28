import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.jpg";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import axios from "axios";
import Host from '../components/api';

const clientId = "329607877296-pe2k6qp6ncs83ptv0k918709vq6qc13b.apps.googleusercontent.com";

const buttonStyle = {
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    padding: '10px 30px',
    cursor: 'pointer',
};

const Login = () => {
    const [loginSuccess, setLoginSuccess] = useState(null);

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        };
        gapi.load('client:auth2', start);
    }, []);

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS!", res.profileObj);
        var user_id = sessionStorage.getItem('user_id');
        console.log(user_id);
        axios({
            url: `${Host}/auth/login`,
            data: {
                "email": res.profileObj.email
            },
            method: "POST"
        }).then((res1) => {
            console.log(res1);
            let data = res1.data;
            if (data.success) {
                sessionStorage.setItem('email', data.user.email);
                sessionStorage.setItem('user_id', data.user.user_id);
                sessionStorage.setItem('name', data.user.name);
                setLoginSuccess(true);

                setTimeout(() => {
                    navigate('/Homepage');
                }, 1000); // Redirect after 3 seconds
            } else {
                setLoginSuccess(false);

                setTimeout(() => {
                    setLoginSuccess(null);
                }, 1000); // Remove message after 3 seconds
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res:", res);
        setLoginSuccess(false);

        setTimeout(() => {
            setLoginSuccess(null);
        }, 1000); // Remove message after 3 seconds
    }

    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {loginSuccess !== null && (
                <div className={`absolute top-4 right-4 p-2 rounded ${loginSuccess ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {loginSuccess ? 'Login Successful' : 'Login Failed'}
                </div>
            )}
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-6 md:space-x-6 w-full max-w-3xl">
                <div className="w-full md:w-1/2 flex-1">
                    <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                    <div className="w-full border-b mb-5 border-gray-300"></div>

                    <form className="w-full">
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-medium mb-1">
                                Email
                            </label>
                            <input
                                required
                                type="email"
                                id="email"
                                className="w-full border border-gray-300 rounded-md p-2  input-focus"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block font-medium mb-1">
                                Password
                            </label>
                            <input
                                required
                                type="password"
                                id="password"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button variant="contained" className="font-sans" style={buttonStyle}>
                                SignIn
                            </Button>
                        </div>
                    </form>

                    <div className="flex items-center w-full mt-5 space-x-4">
                        <div className="flex-1 border-b border-gray-300"></div>
                        <div className="font-bold text-gray-400">Or</div>
                        <div className="flex-1 border-b border-gray-300"></div>
                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Continue with Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        />
                    </div>
                </div>
                <div className="border-l border-gray-300 pl-6 hidden md:block flex-1">
                    <img
                        src={Logo}
                        alt="Company"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
