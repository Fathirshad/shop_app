import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import api from '../../api';
import Spinner from "./Spinner";

const ProductedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const location = useLocation();

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    async function refreshToken() {
        const refreshToken = localStorage.getItem("refresh");

        try {
            const res = await api.post("/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem("access", res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    }

    async function auth() {
        const token = localStorage.getItem("access");
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token);
        const expiryData = decoded.exp;
        const currentTime = Date.now() / 1000; // Fixed Date.now()

        if (currentTime > expiryData) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null) {
        return <Spinner />;
    }

    return (
        isAuthorized ? children : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProductedRoute;
