import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
// ○ username
// ○ email
// ○ password
// ○ firstname
// ○ lastname
// ○ dni
const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    //desestructuramos lo que viene de useForm para utilizarlo
    const { formState, handleChange } = useForm({
        username: "",
        email: "",
        password: "",
        name: "",
        lastname: "",
        // dni: ""  np lo uso porq en el modelo de user no tiene dni
    })


    const navigate = useNavigate()

    // const handleRegister = (event) => {
    //     event.preventDefault()


    //     navigate("/login")
    // }

    const handleRegister = async (event) => {
        event.preventDefault();
        setError(null);

        // Validaciones ANTES de enviar
        if (!formState.username || !formState.email || !formState.password || !formState.name || !formState.lastname) {
            return alert("Todos los campos son obligatorios");
        }

        setIsLoading(true);
        try {
            const peticion = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formState),
                credentials: "include"
            });

            if (!peticion.ok) {
                const errorData = await peticion.json();
                throw new Error(errorData.message || "Error al registrarse");
            }
            
            console.log("Registro exitoso");
            setIsLoading(false);
            navigate("/home");
        } catch (error) {
            console.error("Error en registro:", error);
            setError(error.message);
            setIsLoading(false);
        }
    }


    if (isLoading) {
        return <Loading />;
    }

    return (
        <main>
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '75vh' }}>
                <div className="w-100" style={{ maxWidth: 520, padding: '0 16px' }}>
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title mb-3 text-center">¡Regístrate!</h3>
                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleRegister}>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label htmlFor="username" className="form-label">usuario</label>
                                        <input className="form-control" type="text" name="username" value={formState.username} onChange={handleChange} required />
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label htmlFor="email" className="form-label">email</label>
                                        <input className="form-control" type="email" name="email" value={formState.email} onChange={handleChange} required />
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label htmlFor="password" className="form-label">contraseña</label>
                                        <input className="form-control" type="password" name="password" value={formState.password} onChange={handleChange} required />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="name" className="form-label">nombre</label>
                                        <input className="form-control" type="text" name="name" value={formState.name} onChange={handleChange} required />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastname" className="form-label">apellido</label>
                                        <input className="form-control" type="text" name="lastname" value={formState.lastname} onChange={handleChange} required />
                                    </div>
                                </div>

                                <div className="mb-3 text-center">
                                    <p className="mb-0">¿ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Regístrate</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Register