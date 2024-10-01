import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const axios = useAxiosPublic();
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function to handle Google login
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    };

    // Function for user login
    const login = async (email, password) => {
        const response = await axios.post("/login", { email, password });
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        setIsLoading(false);
        return response;
    };

    // Function for user signup
    const signUp = async (firstname, lastname, email, password) => {
        try {
            const response = await axios.post("/signup", {
                firstname,
                lastname,
                email,
                password,
            });
            setUser(response.data.user);
            return response;
        } catch (error) {
            console.error("Sign up error:", error);
            setIsLoading(false);
            throw error;
        }
    };

    // Function for user logout
    const logout = async () => {
        setUser(null);
        localStorage.removeItem("token");
        setIsLoading(false);
    };

    // Effect to verify token on mount
    useEffect(() => {
        const unSubscribe = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    setIsLoading(true);
                    const response = await axios.post("/token-verify", { token });
                    setUser(response.data);
                } catch (error) {
                    console.error("Token verification failed:", error);
                    setUser(null);
                    localStorage.removeItem("token");
                } finally {
                    setIsLoading(false);
                }
            } else {
                setUser(null);
                setIsLoading(false);
            }
        };

        unSubscribe();
    }, [axios]);

    // Context value that will be provided to components
    const userInfo = {
        login,
        signUp,
        logout,
        user,
        isLoading,
        googleLogin,
    };

    // Return the AuthContext.Provider with its value
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
