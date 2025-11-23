import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";


export const Login = () => {
    const { formState, handleChange } = useForm({
        username: '',
        password: ''
    });

    // Estado para manejar la carga y errores
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {    //ESTO SOLO DE REFERENCIA 
        e.preventDefault();
        setError(null);
        //validaciones 
        if (!formState.username || !formState.password) {
            return alert("Todos los campos son obligatorios");
        }

        setLoading(true);
        try {
            // primer fetch: para guardar la cookie de login 
            const response = await fetch("http://localhost:3000/api/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formState)
            });
            //si la respuesta no es correcta
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al iniciar sesión");
            }
            // si es correcto, paso dos
            // segundo fetch: pedir los datos del perfil para asegurarnos de q la cookie funcione
            const profileResponse = await fetch("http://localhost:3000/api/profile", {
                credentials: "include",
            });//si no se puede cargar profile
            if (!profileResponse.ok) {
                throw new Error("Login exitoso, pero no se pudo obtener el perfil.");
            }
            
            const profileData = await profileResponse.json();
            console.log(profileData);
            setLoading(false);
            navigate("/home");
        } catch (error) {
            console.error(error);
            setError(error.message);
            setLoading(false);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <main>
            <div>
                <div>
                    <h3>
                        ¡Iniciar sesión!
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">username</label>
                            <input type="text" name="username" value={formState.username} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="password">password</label>
                            <input type="text" name="password" value={formState.password} onChange={handleChange} />
                        </div>

                        <span>
                            <p>¿no tienes una cuenta?</p>
                            <Link to="/register"> Registrate</Link>
                        </span>
                        <button type="submit">Iniciar Sesión</button>
                    </form>

                </div>
            </div >
        </main>
    )
}

export default Login