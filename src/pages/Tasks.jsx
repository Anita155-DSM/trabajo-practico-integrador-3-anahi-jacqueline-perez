import React, { useState, useEffect } from "react";
import { useForm } from "../hooks/useForm";
import { Loading } from "../components/Loading";

export const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [message, setMessage] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

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
                // El backend devuelve directamente el array, no un objeto con propiedad tasks
                setTasks(Array.isArray(data) ? data : (data.tasks || []));
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

    // Eliminar tarea (realiza la petición). No confirma aquí: la confirmación se maneja por modal
    const handleDeleteTask = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                method: "DELETE",
                credentials: "include"
            });

            if (response.ok) {
                setMessage("Tarea eliminada exitosamente");
                await fetchTasks();
                setTimeout(() => setMessage(null), 3000);
                return true;
            } else {
                alert("Error al eliminar tarea");
                return false;
            }
        } catch (error) {
            console.error("Error:", error);
            return false;
        }
    };

    // Abre modal de confirmación y guarda id de la tarea a eliminar
    const openDeleteModal = (taskId) => {
        setSelectedTaskId(taskId);
        const modalEl = document.getElementById('confirmDeleteModal');
        if (modalEl && window.bootstrap) {
            const modal = new window.bootstrap.Modal(modalEl);
            modal.show();
        }
    };

    // Confirmar eliminación desde modal
    const confirmDelete = async () => {
        if (!selectedTaskId) return;
        const modalEl = document.getElementById('confirmDeleteModal');
        let modalInstance = null;
        if (modalEl && window.bootstrap) {
            modalInstance = window.bootstrap.Modal.getInstance(modalEl);
        }

        const success = await handleDeleteTask(selectedTaskId);
        if (modalInstance) modalInstance.hide();
        setSelectedTaskId(null);
        return success;
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
        <main className="container mt-4 mb-5">
            <div className="row">
                <div className="col-12 col-lg-4 mb-4">
                    <div className="card shadow-sm sticky-top" style={{ top: 80 }}>
                        <div className="card-body">
                            <h4 className="card-title mb-3">
                                <i className={`bi ${isEditing ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
                                {isEditing ? "Editar Tarea" : "Nueva Tarea"}
                            </h4>
                            {message && <div className="alert alert-success alert-dismissible fade show" role="alert">{message}</div>}
                            <form onSubmit={isEditing ? handleEditTask : handleCreateTask}>
                                <div className="mb-3">
                                    <label className="form-label">Título</label>
                                    <input className="form-control" type="text" name="title" value={formState.title} onChange={handleChange} required placeholder="Ej: Comprar materiales" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea className="form-control" rows="3" name="description" value={formState.description} onChange={handleChange} required placeholder="Describe los detalles..." />
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" id="is_completed" name="is_completed" checked={formState.is_completed} onChange={(e) => handleChange({ target: { name: "is_completed", type: 'checkbox', checked: e.target.checked, value: e.target.checked } })} />
                                    <label className="form-check-label" htmlFor="is_completed">Marcar como completada</label>
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary" type="submit">
                                        <i className={`bi ${isEditing ? 'bi-check-lg' : 'bi-plus-lg'} me-1`}></i>
                                        {isEditing ? "Actualizar" : "Crear Tarea"}
                                    </button>
                                    {isEditing && <button className="btn btn-outline-secondary" type="button" onClick={cancelEdit}>Cancelar</button>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-8">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="mb-0"><i className="bi bi-list-task me-2"></i>Mis Tareas</h3>
                        <span className="badge bg-primary rounded-pill">{tasks.length}</span>
                    </div>
                    
                    {tasks.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="bi bi-inbox" style={{ fontSize: 64, color: '#6c757d' }}></i>
                            <p className="text-muted mt-3">No tienes tareas aún. ¡Crea tu primera tarea!</p>
                        </div>
                    ) : (
                        <div className="row">
                            {tasks.map(task => (
                                <div key={task.id} className="col-12 mb-3">
                                    <div className={`card h-100 ${task.is_completed ? 'task-completed' : ''}`}>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h5 className={`card-title mb-1 ${task.is_completed ? 'text-strike' : ''}`}>
                                                    {task.is_completed && <i className="bi bi-check-circle-fill text-success me-2"></i>}
                                                    {task.title}
                                                </h5>
                                                <span className={`badge ${task.is_completed ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                    {task.is_completed ? "Completada" : "Pendiente"}
                                                </span>
                                            </div>
                                            <p className={`card-text text-muted ${task.is_completed ? 'text-strike' : ''}`}>{task.description}</p>
                                            <div className="d-flex flex-wrap gap-2 mt-3">
                                                <button className="btn btn-sm btn-outline-primary" onClick={() => handleToggleComplete(task)}>
                                                    <i className={`bi ${task.is_completed ? 'bi-arrow-counterclockwise' : 'bi-check2'} me-1`}></i>
                                                    {task.is_completed ? "Reabrir" : "Completar"}
                                                </button>
                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => startEditTask(task)}>
                                                    <i className="bi bi-pencil me-1"></i>Editar
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => openDeleteModal(task.id)}>
                                                    <i className="bi bi-trash me-1"></i>Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de confirmación para eliminar tarea */}
            <div className="modal fade" id="confirmDeleteModal" tabIndex="-1" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmDeleteModalLabel">Confirmar eliminación</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div className="modal-body">
                            ¿Estás seguro/a de que quieres eliminar esta tarea? Esta acción no se puede deshacer.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                                <i className="bi bi-trash me-1" />Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}