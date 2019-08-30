import React, {useState, useEffect} from 'react';

import Buscador from './componentes/Buscador';
import ListadoImagenes from './componentes/ListadoImagenes';

function App() {

	const [busqueda, guardarBusqueda] = useState('');
	const [imagenes, guardarImagenes] = useState([]);

	useEffect(() => {
		const consultarApi = async () => {

			if(busqueda === '') return;

			const imagenesPorPagina = 30;
			const key = '2956503-1ed3653fdbe46767be292acbd';
			const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

			const respuesta = await fetch(url);
			const resultado = await respuesta.json();

			// console.log(resultado);
			guardarImagenes(resultado.hits);
		}

		consultarApi();

	}, [busqueda]);


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
			</div>
		</div>
	);
}

export default App;
