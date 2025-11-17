import React, { useEffect } from "react";
import { useForm } from "../hooks/useForm";
import { data, Link, useNavigate } from "react-router-dom";


const Login = () => {
    //desestructuramos lo que viene de useForm para utilizarlo
    const { formState, handleChange } = useForm({
        username: "",
        password: ""
    })

    useEffect(() => {
        console.log(formState)
    }, [formState])

    const navigate = useNavigate()


    const handleLogin = async (event) => {
        event.preventDefault()

        try {

            const peticion = await fetch("http://localhost:3000/api/login", {
                //SIEMPRE RECORDAR, method, headers, credentials
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formState)
            })
            
            const data = await peticion.json()
            if (!peticion.ok) {
                alert(data.message)
            }
            alert(data.message)
            navigate("/home")


        } catch (error) {
            <p>error en el fetch de login</p>
            console.log(error)
        }
    }

    // const handleLogin = (event) => {
    //     event.preventDefault()

    //     navigate("/home")
    // }


    return (
        <main>
            <div>
                <div>
                    <h3>
                        ¡Iniciar sesión!
                    </h3>
                    <form onSubmit={handleLogin}>
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