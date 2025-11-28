//con esto, tenemos la estructura de una funcion con react: rfc
// ● Footer con información básica: copyright, año actual, nombre del alumno

import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-light text-center py-3 mt-auto">
            <div className="container">
                <p className="mb-0">© TLP-integrador. 2025 Perez Anahi Jacqueline.</p>
            </div>
        </footer>
    )
}