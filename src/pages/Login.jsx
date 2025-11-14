import React, { useEffect } from "react";
import { useForm } from "../hooks/useForm";
import { Navigate } from "react-router-dom";


const Login = () => {
    //desestructuramos lo que viene de useForm para utilizarlo
    const { formState, handleSubmit, handleChange } = useForm({
        username: "",
        password: ""
    })
    


    useEffect(() =>{
        console.log(formState)
    })


    const handleLogin = (event) => {
        event.preventDefault()

        Navigate("/home")
    }

    return (
        <main>
            <div>
                <h3>
                    ¡Iniciar sesión!
                </h3>
                <div>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="username">username</label>
                            <input type="text" name="username" value={formState.username} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="password">password</label>
                            <input type="text" name="password" value={formState.password} onChange={handleChange}  />
                        </div>
                    </form>
                    <button onClick={handleSubmit}>Iniciar Sesión</button>
                </div>
            </div >
        </main>
    )
    
}

export default Login