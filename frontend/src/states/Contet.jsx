import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { userActor } from "./Actors/UserActor";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const dispatch = useDispatch();

    const getUser = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            const res = await fetch("http://localhost:5000/api/user/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token,
                },
            });
            const data = await res.json();
            if (data.success) {
                dispatch(userActor(data.user));
                setIsAuthenticated(true); 
            } else {
                toast.error(data.message);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    };

    return (
        <AppContext.Provider
            value={{
                getUser,
                filteredSongs,
                setFilteredSongs,
                isAuthenticated
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};
