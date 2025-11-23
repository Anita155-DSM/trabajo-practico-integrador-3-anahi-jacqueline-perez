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
                    setTasks(tasksData.tasks || []);
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
        <main>
            <div>
                <h1>¡Bienvenido, {user?.name || "Usuario"}!</h1>
                <p>Gestiona tus tareas de manera eficiente</p>
            </div>

            <div>
                <h2>Resumen de Tareas</h2>
                <div>
                    <div>
                        <h3>Total de Tareas</h3>
                        <p>{totalTasks}</p>
                    </div>
                    <div>
                        <h3>Tareas Completadas</h3>
                        <p>{completedTasks}</p>
                    </div>
                    <div>
                        <h3>Tareas Pendientes</h3>
                        <p>{pendingTasks}</p>
                    </div>
                </div>
            </div>

            <div>
                <Link to="/tasks">
                    <button>Ver todas mis tareas</button>
                </Link>
            </div>
        </main>
    )
}