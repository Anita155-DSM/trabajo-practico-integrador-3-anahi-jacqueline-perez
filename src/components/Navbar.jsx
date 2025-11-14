import React from "react";
import { useNavigate, Link } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate()
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
                <Link to="/home">logout</Link>
            </div>
        </nav>
    )
}