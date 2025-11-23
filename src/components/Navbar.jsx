import React from "react";
import { useNavigate, Link } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    //logica de logout
    const handleLogout = async () => {
        try {
            const peticion = await fetch("http://localhost:3000/api/logout", {
                method: "POST",
                credentials: "include"
            });
            
            if (peticion.ok) {
                navigate("/login");
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <nav>
            <div>
                <Link to="/home">Home</Link>
            </div>
            <div>
                <Link to="/profile">Profile</Link>
            </div>
            <div>
                <Link to="/tasks">Tasks</Link>
            </div>
            {/* botón de logout */}
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}