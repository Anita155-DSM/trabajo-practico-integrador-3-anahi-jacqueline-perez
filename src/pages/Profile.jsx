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
        try {
            const peticion = await fetch("http://localhost:3000/api/logout", {
                method: "POST",
                credentials: "include"
            });

            if (peticion.ok) {
                navigate("/login");
            } else {
                console.error("Logout falló en el servidor");
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    if (!user) {
        return <div>No se pudo cargar el perfil</div>;
    }

    return (
        <main className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 80, height: 80, fontSize: 32 }}>
                                    <i className="bi bi-person-circle"></i>
                                </div>
                                <h3 className="mb-0">{user.name} {user.lastname}</h3>
                                <p className="text-muted">@{user.username || 'usuario'}</p>
                            </div>

                            <div className="mb-4">
                                <h5 className="border-bottom pb-2 mb-3">Información del usuario</h5>
                                <div className="mb-2">
                                    <strong>ID:</strong> <span className="text-muted">{user.id}</span>
                                </div>
                                <div className="mb-2">
                                    <strong>Nombre:</strong> <span className="text-muted">{user.name}</span>
                                </div>
                                <div className="mb-2">
                                    <strong>Apellido:</strong> <span className="text-muted">{user.lastname}</span>
                                </div>
                                {user.email && (
                                    <div className="mb-2">
                                        <strong>Email:</strong> <span className="text-muted">{user.email}</span>
                                    </div>
                                )}
                            </div>

                            <div className="d-grid">
                                <button className="btn btn-outline-danger" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right me-2"></i>Cerrar sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}