// Si el usuario NO está autenticado, redireccionar a Login
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";

//aca verificamos si está logeado consultando /api/profile
export const PrivateRoute = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/profile", {
                    credentials: "include"
                });
                
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error verificando autenticación:", error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}