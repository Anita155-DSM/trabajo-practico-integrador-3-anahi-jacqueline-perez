// ACA MANEJAMOS TOOODAS LAS RUTAS. E IMPORTAMOS TODAS LAS PAGINAS PORQ MANEJAMOS TODAS LAS PAGINAS
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { PrivateRoute } from "./PrivateRoute";
import { Home } from "../pages/Home";
import { Tasks } from "../pages/Tasks";
import { Profile } from "../pages/Profile";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Loading } from "../components/Loading";

// RootRedirect: decide si enviar a /home o /login según la sesión en el servidor
const RootRedirect = () => {
    const [checking, setChecking] = useState(true);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const check = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/profile", { credentials: "include" });
                setAuth(res.ok);
            } catch (err) {
                setAuth(false);
            } finally {
                setChecking(false);
            }
        };
        check();
    }, []);

    if (checking) return <Loading />;
    return <Navigate to={auth ? "/home" : "/login"} />;
};

export const AppRouter = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<RootRedirect />} />

                <Route element={<PublicRoute />}> 
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Route>

                <Route element={<PrivateRoute />}> 
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/tasks" element={<Tasks />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                </Route>

                {/* Si cae en cualquier otra ruta, le delegamos a RootRedirect */}
                <Route path="*" element={<RootRedirect />} />
            </Routes>
            <Footer />
        </>
    );
};

