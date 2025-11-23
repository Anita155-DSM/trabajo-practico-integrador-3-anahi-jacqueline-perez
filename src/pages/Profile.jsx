import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
// Ubicación: src/pages/Profile.jsx
// Requisitos:
// ● Mostrar información del usuario:
// ○ id
// ○ name
// ○ lastname
// ● Incluir botón de Logout que consulte al endpoint /api/logout
// ● Después del logout, redireccionar a /login
// ● Mostrar componente Loading mientras se cargan los datos
export const Profile = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    //debemos hacer un get de profile para que nos traiga el profile
    const getProfile = async () => {
        try {
            const peticion = await fetch("http://localhost:3000/api/profile", {
                credentials: "include"
            })
            if (!peticion.ok) {
                console.log("error en el fetch")
                navigate("/home")
            }
            const data = await peticion.json();
            setUser(data.user);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            navigate("/login");
        }
    }

    // Llamar getProfile cuando el componente se monta
    useEffect(() => {
        getProfile();
    }, []);

    //dbemos hacer un handleLogout para manejar el boton de cerrar sesión en profile

    const handleLogout = async () => {
        const peticion = await fetch("http://localhost:3000/api/logout", {
            method: "POST",
            credentials: "include"
        })
        if (peticion.ok) {
            navigate("/login")
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    if (!user) {
        return <div>No se pudo cargar el perfil</div>;
    }

    return (
        <main>
            <div>
                <div>
                    <h1>profile</h1>
                </div>
                <div>
                    <div>
                        <h3>info del usuario</h3>
                        <ul>
                            <li>
                                <strong>id:</strong> {user.id}
                            </li>
                            <li>
                                <strong>name:</strong> {user.name}
                            </li>
                            <li>
                                <strong>lastname:</strong> {user.lastname}
                            </li>
                        </ul>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </main>
    )
}