import { Routes, Route } from 'react-router-dom';
import AdministracaoRestaurantes from './paginas/AdministracaoRestaurantes/Restaurantes/AdminstracaoRestaurantes';
import FormularioRestaurante from './paginas/AdministracaoRestaurantes/Restaurantes/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import PaginaBaseAdmin from './paginas/AdministracaoRestaurantes/PaginaBaseAdmin';
import AdministracaoPratos from './paginas/AdministracaoRestaurantes/Pratos/AdminstracaoPratos';
import FormularioPrato from './paginas/AdministracaoRestaurantes/Pratos/FormularioPrato';
import Login from './paginas/AdministracaoRestaurantes/Login';
import { useState } from 'react';
import Protected from './componentes/Protected';

function App() {
	const [logged, setLogged] = useState(false);
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/restaurantes' element={<VitrineRestaurantes />} />

			<Route
				path='/admin'
				element={<PaginaBaseAdmin logged={logged} setLogged={setLogged} />}
			>
				<Route index element={<Login setLogged={setLogged} />} />

				<Route
					path='restaurantes'
					element={
						<Protected logged={logged}>
							<AdministracaoRestaurantes />
						</Protected>
					}
				/>
				<Route
					path='restaurantes/novo'
					element={
						<Protected logged={logged}>
							<FormularioRestaurante />
						</Protected>
					}
				/>
				<Route
					path='restaurantes/:id'
					element={
						<Protected logged={logged}>
							<FormularioRestaurante />
						</Protected>
					}
				/>
				<Route
					path='pratos'
					element={
						<Protected logged={logged}>
							<AdministracaoPratos />
						</Protected>
					}
				/>
				<Route
					path='pratos/novo'
					element={
						<Protected logged={logged}>
							<FormularioPrato />
						</Protected>
					}
				/>
				<Route
					path='pratos/:id'
					element={
						<Protected logged={logged}>
							<FormularioPrato />
						</Protected>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
