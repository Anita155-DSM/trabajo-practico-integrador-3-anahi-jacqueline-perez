import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

export const Login = () => {
    // Validación simple: campos obligatorios
    const validate = (values) => {
        const errors = {};
        if (!values.username) errors.username = "El usuario es obligatorio";
        if (!values.password) errors.password = "La contraseña es obligatoria";
        return errors;
    };

    const { formState, handleChange, handleReset, handleSubmit, errors, isSubmitting } = useForm(
        {
            username: "",
            password: "",
        },
        validate
    );

    const [serverError, setServerError] = useState(null);
    const navigate = useNavigate();

    // onSubmit que pasamos al hook
    const onSubmit = async (values) => {
        setServerError(null);
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || "Error al iniciar sesión");
            }

            // Verificamos el perfil para asegurarnos de que la cookie de sesión esté activa
            const profileRes = await fetch("http://localhost:3000/api/profile", {
                credentials: "include",
            });
            if (!profileRes.ok) throw new Error("No se pudo obtener el perfil después del login");

            navigate("/home");
            handleReset();
        } catch (err) {
            setServerError(err.message || "Error en inicio de sesión");
        }
    };

    if (isSubmitting) return <Loading />;

            return (
                <main>
                    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '75vh' }}>
                        <div className="w-100" style={{ maxWidth: 480, padding: '0 16px' }}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h3 className="card-title mb-3 text-center">¡Iniciar sesión!</h3>
                                    {serverError && <div className="alert alert-danger">{serverError}</div>}
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="username" className="form-label">usuario</label>
                                            <input className="form-control" type="text" name="username" value={formState.username} onChange={handleChange} />
                                            {errors.username && <div className="form-text text-danger">{errors.username}</div>}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">contraseña</label>
                                            <input className="form-control" type="password" name="password" value={formState.password} onChange={handleChange} />
                                            {errors.password && <div className="form-text text-danger">{errors.password}</div>}
                                        </div>

                                        <div className="mb-3 text-center">
                                            <p className="mb-0">¿no tienes una cuenta? <Link to="/register">Regístrate</Link></p>
                                        </div>

                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                Iniciar Sesión
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            );
};

export default Login;