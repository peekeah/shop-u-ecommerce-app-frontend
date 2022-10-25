import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
    const token =  localStorage.getItem("token") ? localStorage.getItem("token") : "";
    const config = {
        headers: {
            'access-token': token
        }
    }
    
    const [auth, setAuth] = useState(
        localStorage.getItem("token") ? true : false
    );

    const toggleAuth = () => {
        if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        }
        setAuth(!auth);
    };

    return (
        <AuthContext.Provider value={{ auth, toggleAuth, token, config }}>
        {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
