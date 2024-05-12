import React from "react";
import AuthContext from "./AuthContext";

function AuthState(props) {
    const host = "https://visionaryverse.onrender.com"
    const [user, setUser] = React.useState({
        name: "",
        email: "",
        role: "",
        profileImage: null
    });

    const signup = async (name, email, password) => {
        const url = `${host}/api/auth/signup`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        localStorage.setItem("token", json.authToken);
        return json.success;
    }

    const updateUser = async (user) => {
        const url = `${host}/api/auth/updateuser`
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("role", user.role)
        formData.append("profileImage", user.profileImage);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem("token")
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
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        localStorage.setItem("token", json.authToken);
        await getUser();
        console.log("User Details:" + user)
        return json.success;
    }
    const getUser = async () => {
        const url = `${host}/api/auth/getuserinfo`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });
        const json = await response.json();
        setUser({
            name: json.name,
            email: json.email,
            role: json.role,
            profileImage: json.profileImage
        });
        return json;
    }
    const getUserById = async (id) => {
        const url = `${host}/api/auth/getuserinfobyid`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id })
        });
        const json = await response.json();
        return json;
    }

    const contactInfo = async (email) => {
        const url = `${host}/api/contact/contactinfo`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        });
        const json = await response.json();
        return json;
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, updateUser, getUser, getUserById, contactInfo }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
