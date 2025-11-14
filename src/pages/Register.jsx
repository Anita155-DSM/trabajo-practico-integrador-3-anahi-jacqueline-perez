import React from "react";
import { useForm } from "../hooks/useForm";
// ○ username
// ○ email
// ○ password
// ○ firstname
// ○ lastname
// ○ dni
const Register = () => {
    //desestructuramos lo que viene de useForm para utilizarlo
    const { formState, handleSubmit, handleChange } = useForm({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dni: ""
    })

    const handleRegister = (event) => {
        event.preventDefault()

        Navigate("/login")
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
                            <input type="text" name="username" value={formState.username} onChange={handleChange}/>
                        </div>
                
                        <div>
                            <label htmlFor="password">password</label>
                            <input type="text" name="password" value={formState.password} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="email">email</label>
                            <input type="text" name="email" value={formState.email} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="firstName">first name</label>
                            <input type="text" name="firstName" value={formState.firstName} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="lastName">last name</label>
                            <input type="text" name="lastName" value={formState.lastName} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="dni">dni</label>
                            <input type="number" name="dni" value={formState.dni} onChange={handleChange}/>
                        </div>
                    </form>
                    <button onClick={handleSubmit}>Registrate</button>
                </div>
            </div >
        </main>
    )
}

export default Register