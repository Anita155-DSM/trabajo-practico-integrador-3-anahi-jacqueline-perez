// ACA MANEJAMOS TOOODAS LAS RUTAS. E IMPORTAMOS TODAS LAS PAGINAS PORQ MANEJAMOS TODAS LAS PAGINAS
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { PrivateRoute } from "./PrivateRoute";
import { Home } from "../pages/Home";
import { Tasks } from "../pages/Tasks";
import { Profile } from "../pages/Profile";
import { TaskCreate } from "../pages/TaskCreate";
import { TaskEdit } from "../pages/TaskEdit";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";

export const AppRouter = () =>{

    return(
        <>
        <Navbar/>
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
            </Route>
            <Route element={<PrivateRoute />}>

                <Route path="/home" element={<Home/>}></Route>
                <Route path="/tasks" element={<Tasks/>}></Route>
                <Route path="/tasks/create" element={<TaskCreate />} />
                <Route path="/tasks/edit" element={<TaskEdit />} />
                <Route path="/profile" element={<Profile/>}></Route>
            </Route>
            {/* ruta por default */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Footer/>
        </>
    )
}

