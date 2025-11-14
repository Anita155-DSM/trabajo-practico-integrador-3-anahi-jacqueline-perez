import React, { use } from "react";
import { useForm } from "../hooks/useForm";

export const TaskCreate = () => {

    const { handleChange, handleSubmit, handleReset, formState } = useForm({
        title: "",
        description: "",
        status: "",
        date: ""
    })
    
    const handleCreateTask = (event) =>{
        event.preventDefault()
        
        handleReset()
    }
    
    return (
        <main>
        <div>
            <form onSubmit={handleCreateTask}>
                <div>
                    <div>
                        <label htmlFor="title">titulo</label>
                        <input type="text" name="description" onChange={handleChange} value={formState.description} />
                    </div>
                    <div>
                        <label htmlFor="">descripción</label>
                        <input type="text" name="title" onChange={handleChange} value={formState.title} />
                    </div>
                    <div>
                        <label htmlFor="status">estado</label>
                        <input type="text" name="status" onChange={handleChange} value={formState.status} />
                    </div>
                    <div>
                        <label htmlFor="date">fecha</label>
                        <input type="text" name="date" onChange={handleChange} value={formState.date} />
                    </div>
                </div>
            </form>
            <button onClick={handleSubmit}>Crear tarea</button>
        </div>
    </main>
)
}