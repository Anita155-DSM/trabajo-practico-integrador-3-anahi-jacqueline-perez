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
    const { formState, handleSubmit, handleChange } = useForm({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dni: ""
    })
    
    const navigate = useNavigate()

    // const handleRegister = (event) => {
    //     event.preventDefault()


    //     navigate("/login")
    // }

    const handleRegister = async (event) => {
        event.preventDefault()

        try {
            const peticion = await fetch("http://localhost:api/register", {
                method: "POST",       
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify
            })
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
                        {/* el modelo de user en el backend no tiene dni */}
                    <button onClick={handleSubmit}>Registrate</button>
                    <span>
                        <p>Ya tienes una cuenta?</p>
                        <Link to="/login"/> Inicia Sesión<Link/>
                        <button>inicia sesion</button>
                    </span>
                    </form>
                </div>
            </div >
        </main>
    )
}

export default Register