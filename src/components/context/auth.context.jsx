import { createContext, useState } from 'react';

// 1. create context
export const AuthContext = createContext({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
});

// 2.1 create wrapper
export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
    });

    const [isAppLoading, setIsAppLoading] = useState(true);

    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading, setIsAppLoading }}>
            {props.children}
            {/* <RouterProvider router={router} /> */}
        </AuthContext.Provider>
    );
}
