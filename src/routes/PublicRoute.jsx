// ● Mostrar logo o nombre de la aplicación
// ● Si el usuario está autenticado, mostrar enlaces a: Home, Tasks, Profile
// ● Si el usuario está autenticado, mostrar botón de Logout
import { Navigate,  } from "react-router-dom";
import React from "react";

export const PublicRoute = () => {
//aca debo hacer la logica de ver si está logeado

    const isLogged = localStorage.getItem("token")

    return ! isLogged ? (
        <>
        <Outlet></Outlet>
        </> 
    ) : (
        <Navigate to={"/login"}></Navigate>
    )
}
