import { useState, useEffect } from "react";

const useUserState = () => {
    const [userState, setUserState] = useState({
        id: 0,
        name: "",
        email: "",
        password: "",
        token: "",
    });

    const addUser = (payload) => {        
        setUserState({
            ...userState,
            id: payload.id,
            name: payload.name,
            email: payload.email,
            password: payload.password,
            // token: "",
        });    
    }

    return {
        addUser,
        setUserState,
        userState
    };
}

export default useUserState;