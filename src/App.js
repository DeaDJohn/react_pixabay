import React, { useState, useEffect } from 'react';

import Buscador from './componentes/Buscador';
import ListadoImagenes from './componentes/ListadoImagenes';

function App() {

    const [busqueda, guardarBusqueda] = useState('');
    const [imagenes, guardarImagenes] = useState([]);
    const [paginaActual, guardarPaginaActual] = useState(1)
    const [totalPaginas, guardarTotalPaginas] = useState(1)


    useEffect(() => {
        const consultarApi = async() => {

            if (busqueda === '') return;

            const imagenesPorPagina = 30;
            const key = '2956503-1ed3653fdbe46767be292acbd';
            const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            // console.log(resultado);
            guardarImagenes(resultado.hits);

            // calcular el numero total de paginas
            const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
            console.log(paginaActual);
			guardarTotalPaginas(calcularTotalPaginas);
			
			// Mover la pagina a la parte superior
			const jumbotron = document.querySelector('.jumbotron');
			jumbotron.scrollIntoView({behavior: 'smooth', block: 'start'});

        }

        consultarApi();

    }, [busqueda, paginaActual]);


	const paginaAnterior = () => {
		let nuevaPaginaActual = paginaActual - 1;

		// colocarlo en el state
		guardarPaginaActual(nuevaPaginaActual);
	}

	const paginaSiguiente = () => {
		let nuevaPaginaActual = paginaActual + 1;

		// colocarlo en el state
		guardarPaginaActual(nuevaPaginaActual);
	}
	return (
		<div className="app container">
			<div className="jumbotron">
				<p className="lead text-center">Buscador de imágenes</p>

				<Buscador 
					guardarBusqueda={guardarBusqueda}	
				/>
			</div>
			<div className="row justify-content-center">
				<ListadoImagenes 
					imagenes={imagenes}
				/>
				{ (paginaActual === 1)? null : (
					<button onClick={paginaAnterior} className="btn btn-info mr-1">&laquo; Anterior</button>
				) }
				{ (paginaActual === totalPaginas)? null : (
					<button onClick={paginaSiguiente} className="btn btn-info">Siguiente &raquo;</button>
				) }
			</div>
		</div>
	);
}

export default App;