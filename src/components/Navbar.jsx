import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Loading } from "../components/Loading";

// Navbar: muestra diferentes enlaces según si el usuario está autenticado.
export const Navbar = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Verificamos si hay sesión activa consultando /api/profile
        const checkAuth = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/profile", {
                    credentials: "include",
                });
                setIsAuthenticated(res.ok);
            } catch (err) {
                // Si falla la verificación, asumimos no autenticado
                setIsAuthenticated(false);
            } finally {
                setIsChecking(false);
            }
        };

        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            // mientras se procesa, bloqueamos la UI mínima
            setIsChecking(true);
            const res = await fetch("http://localhost:3000/api/logout", {
                method: "POST",
                credentials: "include",
            });
            if (res.ok) {
                // volver a la pantalla de login
                navigate("/login");
                setIsAuthenticated(false);
            } else {
                console.error("No se pudo cerrar sesión");
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            setIsChecking(false);
        }
    };

        if (isChecking) return <Loading />;

            return (
                <nav className="navbar navbar-expand-lg navbar-custom navbar-dark mb-3">
                    <div className="container">
                        <NavLink className="navbar-brand d-flex align-items-center" to="/">
                            <i className="bi bi-app" style={{ fontSize: 20, marginRight: 8 }}></i>
                            <span>TLP App</span>
                        </NavLink>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                                {isAuthenticated ? (
                                    <>
                                        <li className="nav-item"><NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to="/home">Home</NavLink></li>
                                        <li className="nav-item"><NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to="/tasks">Tasks</NavLink></li>
                                        <li className="nav-item"><NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to="/profile">Profile</NavLink></li>
                                        <li className="nav-item ms-2"><button className="btn btn-outline-light btn-sm" onClick={handleLogout}><i className="bi bi-box-arrow-right me-1"></i>Logout</button></li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item"><NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to="/login">Login</NavLink></li>
                                        <li className="nav-item"><NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to="/register">Register</NavLink></li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            );
};