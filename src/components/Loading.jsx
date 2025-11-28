import React from "react";

export const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <div className="mt-2">Cargando...</div>
            </div>
        </div>
    )
}