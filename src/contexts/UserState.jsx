import axios from "axios";
import { useEffect, useState } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {
    const URL = process.env.REACT_APP_API;

    const token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";
    const config = {
        headers: {
        "access-token": token,
        },
    };

    const [auth, setAuth] = useState(
        localStorage.getItem("token") ? true : false
    );

    const [userData, setUserData] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState({});

    useEffect(() => {
        getUser();
    }, [auth]);

    const handleLogin = (token) => {
        localStorage.setItem("token", token);
        setAuth(true);
    };

    const handleLogout = () => {
        if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        }
        setAuth(false);
    };

    const getUser = async () => {
        try {
            const res = await axios.get(`${URL}/users/get-user`, config);
            setUserData(res.data);
            setAddresses(res.data.addresses);
            if (res.data.addresses.length > 0) {
                setSelectedAddressId(res.data.addresses[0]._id);
            }
            } catch (err) {
            console.log(err);
        }
    };

    return (
        <UserContext.Provider
            value={{
                auth,
                userData,
                addresses,
                getUser,
                token,
                config,
                handleLogin,
                handleLogout,
                selectedAddressId,
                setSelectedAddressId,
                selectedAddress,
                setSelectedAddress,
            }}
            >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
