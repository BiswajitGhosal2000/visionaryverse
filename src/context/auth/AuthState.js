import React from 'react';
import AuthContext from "./AuthContext";

function AuthState(props) {
    const host = "http://127.0.0.1:5000"

    const signup = async (name, email, password) => {
        const url = `${host}/api/auth/signup`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        localStorage.setItem('token', json.authToken);
        return json.success;
    }

    const updateUser = async (name, email, profileImage) => {
        const url = `${host}/api/auth/updateuser`
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('profileImage', profileImage);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem('token')
            },
            body: formData
        });
        const json = await response.json();
        return json.success;
    }

    const login = async (email, password) => {
        const url = `${host}/api/auth/login`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        localStorage.setItem('token', json.authToken);
        return json.success;
    }
    const getUser = async () => {
        const url = `${host}/api/auth/getuserinfo`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        return json;
    }
    const getUserById = async (id) => {
        const url = `${host}/api/auth/getuserinfobyid`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        });
        const json = await response.json();
        return json;
    }
    return (
        <AuthContext.Provider value={{ login, signup, updateUser, getUser, getUserById }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;