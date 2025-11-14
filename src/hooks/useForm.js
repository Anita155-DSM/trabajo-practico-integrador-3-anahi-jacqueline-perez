//DISCULPE SI PONGO MUCHOS COMENTARIOS, ES PARA ENTENDER Y NO OLVIDAR EL PROCESO DE DESARROLLO 
//¿QUE TIENE QUE TENER UN useForm?
// ● Gestionar estado del formulario con múltiples campos. USAMOS useSate, que gestiona los estados
// ● Función para actualizar valores de inputs al escribir
// ● Función para resetear el formulario a valores iniciales
// ● Retornar el estado actual del formulario y las funciones de manejo
// El hook debe ser lo suficientemente genérico para manejar diferentes formularios (login,
// register, tasks).

import React, { useState } from "react";

// useForm tiene como parametro inicial: initialState
export const useForm = (initialState = {}) => {
    const [formState, setFormState] = useState(initialState)
    //const { username, password } = formState  // este np es necesario porq no lo estamos usando ahorita

    // ● Función para actualizar valores de inputs al escribir
    // VALORES de los inputs {target} viene del objeto event y aca con llaves, tomamos solo target, que es el input sobre el cual estamos escribiendo
    const handleChange = ({target}) => {
        const {name, value} = target
        // del target vienen name y value(o sea del input)
        
        // aca solo actualizamos los valores que editamos del formState
        setFormState({
            ...formState,
            //puede venir cualquiera de los input, y cambiar su valor
            [name]: value
        })

    }
    // ● Función para resetear el formulario a valores iniciales
    //vuelve el formulario al estado inicial (o sea a nada)
    const handleReset = () => {
        //los cambios van al setFormState porq es el que capta los valores cambiantes
        setFormState(initialState)
    }   
    //el handleSubmit recibe un event del formulario. sirve para enviar los datos
    const handleSubmit = (event) => {
        event.preventDefault()

        // onLogin(formState)
        //evita que la pagina se recargue
        handleReset()

        console.log(formState)

    }

    //siempre va un return, no olvidar, en el caso de los customHooks retornan funciones, ej: handleReset
    // ● Retornar el estado actual del formulario y las funciones de manejo
    return {
        ...formState,
        formState,
        handleChange,
        handleReset,
        handleSubmit
    }
}

