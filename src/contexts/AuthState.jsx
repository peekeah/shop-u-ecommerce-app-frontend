import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
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
        <AuthContext.Provider value={{ auth, toggleAuth }}>
        {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
