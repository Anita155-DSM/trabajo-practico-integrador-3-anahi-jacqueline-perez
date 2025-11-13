import React from "react";
import { useForm } from "../hooks/useForm";

const Login = () => {
    //desestructuramos lo que viene de useForm para utilizarlo
    const { fromState, handleSubmit} = useForm({
        email: "",
        username: "",
        password: ""
    })

    return(
        <main>
        <h1>
            ¡Iniciar sesión!
        </h1>
        <div>
            <form action="">
                <label htmlFor="username"></label>
                <input type="text" name="username" value={fromState.username}  />
                <label htmlFor="password"></label>
                <input type="text" name="password" value={fromState.password}/>
            </form>
            <button onClick={handleSubmit}>Iniciar Sesión</button>
        </div>
        </main>
    )
}

export default Login