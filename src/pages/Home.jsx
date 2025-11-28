import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";
// Ubicación: src/pages/Home.jsx
// Requisitos:
// ● Página de bienvenida para usuarios autenticados
// ● Mostrar mensaje de bienvenida con el nombre del usuario
// ● Mostrar resumen estadístico:
// ○ Total de tareas
// ○ Tareas completadas
// ○ Tareas pendientes
// ● Incluir enlaces o botones para navegar a la página de Tasks
// ● Diseño atractivo con cards o tarjetas

export const Home = () => {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener datos del usuario
                const profileResponse = await fetch("http://localhost:3000/api/profile", {
                    credentials: "include"
                });
                if (profileResponse.ok) {
                    const profileData = await profileResponse.json();
                    setUser(profileData.user);
                }

                // Obtener tareas del usuario
                const tasksResponse = await fetch("http://localhost:3000/api/tasks-by-user", {
                    credentials: "include"
                });
                if (tasksResponse.ok) {
                    const tasksData = await tasksResponse.json();
                    // El backend devuelve directamente el array
                    setTasks(Array.isArray(tasksData) ? tasksData : (tasksData.tasks || []));
                }
            } catch (error) {
                console.error("Error cargando datos:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    // Calcular estadísticas
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.is_completed).length;
    const pendingTasks = totalTasks - completedTasks;

    return (
        <main className="container mt-4">
            <div className="mb-4">
                <h1 className="h3">¡Bienvenido, {user?.name || "Usuario"}!</h1>
                <p className="text-muted">Gestiona tus tareas de manera eficiente</p>
            </div>

            <div className="row mb-4">
                <div className="col-12 col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Total de Tareas</h5>
                            <p className="card-text display-6">{totalTasks}</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Tareas Completadas</h5>
                            <p className="card-text display-6">{completedTasks}</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Tareas Pendientes</h5>
                            <p className="card-text display-6">{pendingTasks}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Link to="/tasks" className="btn btn-primary">Ver todas mis tareas</Link>
            </div>
        </main>
    )
}