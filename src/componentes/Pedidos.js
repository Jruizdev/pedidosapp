import { useEffect, useState } from "react";

function actualizarPedidos (fetchAPI, setHoraActualizacion) {

    // Obtener pedidos del servicio web
    fetchAPI ()

    // Actualizar última hora de actualización
    const hora = new Date ()
    setHoraActualizacion (hora.getHours() + ":" + hora.getMinutes())
}

export const Pedidos = () => {

    const [pedidos, setPedidos] = useState([]);
    const [horaActualizacion, setHoraActualizacion] = useState ("")

    // Recuperar pedidos
    useEffect (() => {

        const fetchAPI = async () => {
            const response = await fetch ('https://pedidostaqueria.x10.mx/?tipo=pedidos', {
                method: 'GET',
                mode: 'cors'
            })
            .catch ((error) => (console.error(error)))

            const data = await response.json()
            setPedidos (data)
        }
        // Actualizar al cargar la página
        actualizarPedidos (fetchAPI, setHoraActualizacion)

        // Actualizar de forma periodica cada minuto
        const actualizacion_periodica = setInterval (function () {
            actualizarPedidos (fetchAPI, setHoraActualizacion)
        }, 60000)
    }, [])

    // Lista de pedidos recuperados 
    const lista_pedidos = []
    
    // Listar nombres de los clientes que realizaron pedidos
    for(let i = 0; i < pedidos.length;  i++) {
        lista_pedidos.push(<h3 key={i}>{pedidos[i].nombre}</h3>)
    }

    return (
        <div className="pedidos">
            <h1>Pedidos recibidos</h1>
            <p>{horaActualizacion}</p>
            <div>{lista_pedidos}</div>
        </div>
    );
}