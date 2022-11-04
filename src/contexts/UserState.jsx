import axios from "axios";
import { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {
    const URL = process.env.REACT_APP_API;
    
    const token =  localStorage.getItem("token") ? localStorage.getItem("token") : "";
    const config = {
        headers: {
            'access-token': token
        }
    }
    
    const [auth, setAuth] = useState(
        localStorage.getItem("token") ? true : false
    );

    const [userData, setUserData] = useState([]);

    const handleLogin = (token) => {
        localStorage.setItem("token", token);
        setAuth(true);
    }

    const handleLogout = () => {
        if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
        }
        setAuth(false);
    }

    const getUser = async () => {
        try {
            const res = await axios.get(`${URL}/users/get-user`, config);
            setUserData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <UserContext.Provider value={{ auth, toggleAuth, userData, getUser, token, config, handleLogin, handleLogout }}>
        {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
