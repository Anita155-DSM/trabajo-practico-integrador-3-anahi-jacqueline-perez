import React from "react";
import { useNavigate, Link } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate()

    const isLogged = () =>{ 
        
    }
    
    return (
        <nav>
            <div>
                <Link to="/home">home</Link>
            </div>
            <div>
                <Link to="/profile">profile</Link>
            </div>
            <div>
                <Link to="/tasks">tasks</Link>
            </div>
            <div>
                <Link to="/login">logout</Link>
            </div>
        </nav>
    )
}