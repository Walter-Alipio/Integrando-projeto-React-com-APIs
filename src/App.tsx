import { Routes, Route } from 'react-router-dom';
import AdministracaoRestaurantes from './paginas/AdministracaoRestaurantes/Restaurantes/AdminstracaoRestaurantes';
import FormularioRestaurante from './paginas/AdministracaoRestaurantes/Restaurantes/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import PaginaBaseAdmin from './paginas/AdministracaoRestaurantes/PaginaBaseAdmin';
import AdministracaoPratos from './paginas/AdministracaoRestaurantes/Pratos/AdminstracaoPratos';
import FormularioPrato from './paginas/AdministracaoRestaurantes/Pratos/FormularioPrato';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/restaurantes' element={<VitrineRestaurantes />} />
			<Route path='/admin' element={<PaginaBaseAdmin />}>
				<Route path='restaurantes' element={<AdministracaoRestaurantes />} />
				<Route path='restaurantes/novo' element={<FormularioRestaurante />} />
				<Route path='restaurantes/:id' element={<FormularioRestaurante />} />
				<Route path='pratos' element={<AdministracaoPratos />} />
				<Route path='pratos/novo' element={<FormularioPrato />} />
				<Route path='pratos/:id' element={<FormularioPrato />} />
			</Route>
		</Routes>
	);
}

export default App;
