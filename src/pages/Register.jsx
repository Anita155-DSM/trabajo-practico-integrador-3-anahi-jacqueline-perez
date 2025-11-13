import React from "react";
import { useForm } from "../hooks/useForm";

const Register = () => {
    //desestructuramos lo que viene de useForm para utilizarlo
    const { fromState, handleSubmit} = useForm({
        username: "",
        password: ""
    })

    return(
        <main>
        <h1>
            ¡Registrate!
        </h1>
        <div>
            <form action="">
                <label htmlFor="email"></label>
                <input type="text" name="email" value={fromState.email}/>
                <label htmlFor="username"></label>
                <input type="text" name="username" value={fromState.username}  />
                <label htmlFor="password"></label>
                <input type="text" name="password" value={fromState.password}/>
            </form>
            <button onClick={handleSubmit}>Registrate</button>
        </div>
        </main>
    )
}

export default Register