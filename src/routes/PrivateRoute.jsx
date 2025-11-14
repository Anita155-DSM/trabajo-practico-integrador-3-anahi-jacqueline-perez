// Si el usuario NO está autenticado, mostrar enlaces a: Login, Register
import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";

//aca debo hacer la logica de ver si está logeado
export const PrivateRoute = () => {
    const isLogged = localStorage.getItem("token")

    return isLogged ? (
        <>
        <Navbar></Navbar>
        <Outlet></Outlet>
        </> 
    ) : (
        <Navigate to={"/login"}></Navigate>
    )
}