import React, { useState } from 'react';
import AuthContext from "./AuthContext";

function AuthState(props) {
    const host = "http://127.0.0.1:5000"
    const [user, setUser] = useState({
        name: "", email: ""
    })

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
        setUser({
            name: json.name,
            email: json.email
        });
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
        <AuthContext.Provider value={{ user, login, signup, getUser, getUserById }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;