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
            <div>
                <h3>
                    ¡Registrate!
                </h3>
                {error && (
                    <div style={{ color: "red", padding: "10px", marginBottom: "10px" }}>
                        {error}
                    </div>
                )}
                <div>
                    <form onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="username">username</label>
                            <input type="text" name="username" value={formState.username} onChange={handleChange} required />
                        </div>

                        <div>
                            <label htmlFor="password">password</label>
                            <input type="password" name="password" value={formState.password} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="email">email</label>
                            <input type="email" name="email" value={formState.email} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="name">first name</label>
                            <input type="text" name="name" value={formState.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="lastname">last name</label>
                            <input type="text" name="lastname" value={formState.lastname} onChange={handleChange} required />
                        </div>
                        {/* el modelo de user en el backend no tiene dni */}
                        <span>
                            <p>¿ya tienes una cuenta?</p>
                            <Link to="/login"> Inicia Sesion</Link>
                        </span>
                        <button type="submit">Registrate</button>
                    </form>
                </div>
            </div >
        </main>
    )
}

export default Register