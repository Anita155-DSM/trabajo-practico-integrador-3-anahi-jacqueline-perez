import React from "react";
import { useForm } from "../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
// ○ username
// ○ email
// ○ password
// ○ firstname
// ○ lastname
// ○ dni
const Register = () => {
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
        event.preventDefault()

        try {
            const peticion = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formState),
                credentials: "include"
            })

            
            if (!formState.username || !formState.email || !formState.password || !formState.name || !formState.lastname) {
                return alert("no puedes enviar campos vacios")
            }
            if (peticion.ok) {
                console.log("todo okey")
                console.log(formState)
                navigate("/login")
            } else {
                console.error()
            }
        } catch (error) {
            console.error();
        }
    }


    return (
        <main>
            <div>
                <h3>
                    ¡Registrate!
                </h3>
                <div>
                    <form onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="username">username</label>
                            <input type="text" name="username" value={formState.username} onChange={handleChange} />
                        </div>

                        <div>
                            <label htmlFor="password">password</label>
                            <input type="text" name="password" value={formState.password} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="email">email</label>
                            <input type="text" name="email" value={formState.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="name">first name</label>
                            <input type="text" name="name" value={formState.firstName} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="lastname">last name</label>
                            <input type="text" name="lastname" value={formState.lastName} onChange={handleChange} />
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