import React, { useState, useEffect } from "react";
import { useForm } from "../hooks/useForm";
import { Loading } from "../components/Loading";

export const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [message, setMessage] = useState(null);

    const { formState, handleChange, handleReset } = useForm({
        title: "",
        description: "",
        is_completed: false
    });

    // Cargar tareas al montar el componente
    useEffect(() => {
        fetchTasks();
    }, []);

    // Función para obtener todas las tareas
    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:3000/api/tasks-by-user", {
                credentials: "include"
            });
            
            if (response.ok) {
                const data = await response.json();
                setTasks(data.tasks || []);
            } else {
                console.error("Error al cargar tareas");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Crear nueva tarea
    const handleCreateTask = async (e) => {
        e.preventDefault();
        
        if (!formState.title || !formState.description) {
            return alert("Título y descripción son obligatorios");
        }

        try {
            const response = await fetch("http://localhost:3000/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formState)
            });

            if (response.ok) {
                setMessage("Tarea creada exitosamente");
                handleReset();
                fetchTasks();
                setTimeout(() => setMessage(null), 3000);
            } else {
                alert("Error al crear tarea");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Editar tarea existente
    const handleEditTask = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${editingTaskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formState)
            });

            if (response.ok) {
                setMessage("Tarea actualizada exitosamente");
                setIsEditing(false);
                setEditingTaskId(null);
                handleReset();
                fetchTasks();
                setTimeout(() => setMessage(null), 3000);
            } else {
                alert("Error al actualizar tarea");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Eliminar tarea
    const handleDeleteTask = async (taskId) => {
        if (!confirm("¿Estás seguro de eliminar esta tarea?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                method: "DELETE",
                credentials: "include"
            });

            if (response.ok) {
                setMessage("Tarea eliminada exitosamente");
                fetchTasks();
                setTimeout(() => setMessage(null), 3000);
            } else {
                alert("Error al eliminar tarea");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Marcar tarea como completada/pendiente
    const handleToggleComplete = async (task) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    ...task,
                    is_completed: !task.is_completed
                })
            });

            if (response.ok) {
                fetchTasks();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Preparar formulario para editar
    const startEditTask = (task) => {
        setIsEditing(true);
        setEditingTaskId(task.id);
        // Llenar el formulario con los datos de la tarea
        Object.keys(formState).forEach(key => {
            const event = {
                target: {
                    name: key,
                    value: task[key]
                }
            };
            handleChange(event);
        });
    };

    // Cancelar edición
    const cancelEdit = () => {
        setIsEditing(false);
        setEditingTaskId(null);
        handleReset();
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <main>
            <div>
                <h1>Gestión de Tareas</h1>
                
                {message && (
                    <div style={{ padding: "10px", background: "#4caf50", color: "white", marginBottom: "10px" }}>
                        {message}
                    </div>
                )}

                {/* Formulario para crear/editar tarea */}
                <div>
                    <h2>{isEditing ? "Editar Tarea" : "Crear Nueva Tarea"}</h2>
                    <form onSubmit={isEditing ? handleEditTask : handleCreateTask}>
                        <div>
                            <label htmlFor="title">Título:</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={formState.title} 
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Descripción:</label>
                            <textarea 
                                name="description" 
                                value={formState.description} 
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="is_completed" 
                                    checked={formState.is_completed}
                                    onChange={(e) => handleChange({
                                        target: {
                                            name: "is_completed",
                                            value: e.target.checked
                                        }
                                    })}
                                />
                                Completada
                            </label>
                        </div>
                        <button type="submit">
                            {isEditing ? "Actualizar Tarea" : "Crear Tarea"}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={cancelEdit}>
                                Cancelar
                            </button>
                        )}
                    </form>
                </div>

                {/* Lista de tareas */}
                <div>
                    <h2>Mis Tareas</h2>
                    {tasks.length === 0 ? (
                        <p>No tienes tareas aún. ¡Crea tu primera tarea!</p>
                    ) : (
                        <div>
                            {tasks.map(task => (
                                <div 
                                    key={task.id}
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "15px",
                                        marginBottom: "10px",
                                        background: task.is_completed ? "#f0f0f0" : "white"
                                    }}
                                >
                                    <h3 style={{ 
                                        textDecoration: task.is_completed ? "line-through" : "none"
                                    }}>
                                        {task.title}
                                    </h3>
                                    <p style={{ 
                                        textDecoration: task.is_completed ? "line-through" : "none"
                                    }}>
                                        {task.description}
                                    </p>
                                    <p>
                                        <strong>Estado:</strong> {task.is_completed ? "Completada" : "Pendiente"}
                                    </p>
                                    <div>
                                        <button onClick={() => handleToggleComplete(task)}>
                                            {task.is_completed ? "Marcar como Pendiente" : "Marcar como Completada"}
                                        </button>
                                        <button onClick={() => startEditTask(task)}>
                                            Editar
                                        </button>
                                        <button onClick={() => handleDeleteTask(task.id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}