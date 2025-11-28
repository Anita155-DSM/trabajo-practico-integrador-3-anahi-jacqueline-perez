//DISCULPE SI PONGO MUCHOS COMENTARIOS, ES PARA ENTENDER Y NO OLVIDAR EL PROCESO DE DESARROLLO 
//¿QUE TIENE QUE TENER UN useForm?
// ● Gestionar estado del formulario con múltiples campos. USAMOS useSate, que gestiona los estados
// ● Función para actualizar valores de inputs al escribir
// ● Función para resetear el formulario a valores iniciales
// ● Retornar el estado actual del formulario y las funciones de manejo
// El hook debe ser lo suficientemente genérico para manejar diferentes formularios (login,
// register, tasks).

import React, { useState } from "react";

/*
    useForm: hook reutilizable para manejar formularios.
    - initialState: objeto con los valores iniciales del formulario
    - validate (opcional): función (values) => errors   // devuelve objeto con errores por campo

    Retorna:
    - formState: valores actuales
    - errors: objeto con errores de validación
    - isSubmitting: boolean
    - handleChange(event): actualizar campo
    - handleReset(): volver al estado inicial
    - handleSubmit(onSubmit): devuelve una función que puede usarse como onSubmit del form

    Nota: handleSubmit recibe una función async (onSubmit) que ejecuta la petición.
    El hook se encarga de validación previa y del estado de envío.
*/
export const useForm = (initialState = {}, validate = null) => {
    const [formState, setFormState] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Actualiza valores del formulario. Funciona para inputs normales y checkbox.
    const handleChange = (event) => {
        const { target } = event;
        const { name, type } = target;
        const value = type === "checkbox" ? target.checked : target.value;

        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Resetea el formulario a los valores iniciales y limpia errores.
    const handleReset = () => {
        setFormState(initialState);
        setErrors({});
    };

    // Devuelve un handler para el submit del formulario.
    // Uso: <form onSubmit={handleSubmit(async (values) => { ... })}>
    const handleSubmit = (onSubmit) => {
        return async (event) => {
            if (event && event.preventDefault) event.preventDefault();

            // Validación opcional
            if (typeof validate === "function") {
                const validationErrors = validate(formState) || {};
                setErrors(validationErrors);
                if (Object.keys(validationErrors).length > 0) {
                    // Si hay errores, no ejecutamos la petición
                    return;
                }
            }

            setIsSubmitting(true);
            try {
                if (typeof onSubmit === "function") {
                    await onSubmit(formState);
                }
            } catch (err) {
                // Propagamos el error para que el componente lo maneje si quiere
                throw err;
            } finally {
                setIsSubmitting(false);
            }
        };
    };

    return {
        formState,
        errors,
        isSubmitting,
        handleChange,
        handleReset,
        handleSubmit,
    };
};

