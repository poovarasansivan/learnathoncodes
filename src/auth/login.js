import React from 'react';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import axios from "axios";
import Host from '../components/api';
import { useState, useEffect } from 'react';
function Login() {
    const clientId = "329607877296-pe2k6qp6ncs83ptv0k918709vq6qc13b.apps.googleusercontent.com";
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
        // console.log("LOGIN SUCCESS!", res.profileObj);
        // var user_id = sessionStorage.getItem('user_id');
        // console.log(user_id);
        axios({
            url: `${Host}/auth/login`,
            data: {
                "email": res.profileObj.email
            },
            method: "POST"
        }).then((res1) => {
            // console.log(res1);
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
        // console.log("LOGIN FAILED! res:", res);
        setLoginSuccess(false);

        setTimeout(() => {
            setLoginSuccess(null);
        }, 1000);
    }

    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {loginSuccess !== null && (
                <div className={`absolute top-4 right-4 p-2 rounded ${loginSuccess ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {loginSuccess ? 'Login Successful' : 'Login Failed'}
                </div>
            )}
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                {/* left side */}
                <div className="flex flex-col justify-center p-8 md:p-14">
                    <span className="mb-3 text-4xl font-bold">SignIn</span>
                    <span className="font-light text-gray-400 mb-8">
                        Welcome! Please SignIn to Continue
                    </span>
                    <div className="py-4">
                        <span className="mb-2 text-md">Email</span>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                            name="email"
                            id="email"
                        />
                    </div>
                    <div className="py-4">
                        <span className="mb-2 text-md">Password</span>
                        <input
                            type="password"
                            name="pass"
                            id="pass"
                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                        />
                    </div>

                    <button
                        className="w-full bg-blue-500 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
                    >
                        Sign in
                    </button>
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
                {/* right side */}
                <div className="relative">
                    <img
                        src="logo.png"
                        alt="img"
                        className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
                    />
                    {/* text on image */}
                    <div
                        className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
                    >
                        <span className="text-white text-xl">
                            Learnathon is One day Event<br />
                            You can learn your favourite <br />
                            Domain
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
