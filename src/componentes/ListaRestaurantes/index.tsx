import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

// esses são os possíveis parâmetros que podemos enviar para a API
interface IParametrosBusca {
	ordering?: string;
	search?: string;
}

const ListaRestaurantes = () => {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
	const [proximaPagina, setProximaPagina] = useState('');
	const [paginaAnterior, setPaginaAnterior] = useState('');
	const [busca, setBusca] = useState('');
	const [ordenar, setOrdenar] = useState('');

	const handleSelectChange = (event: SelectChangeEvent) => {
		setOrdenar(event.target.value);
	};

	// o carregarDados recebe opcionalmente as opções de configuração do axios
	const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
		axios
			.get<IPaginacao<IRestaurante>>(url, opcoes)
			.then(res => {
				setRestaurantes(res.data.results);
				setProximaPagina(res.data.next);
				setPaginaAnterior(res.data.previous);
			})
			.catch(error => console.log(error));
	};

	const Buscar = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const opcoes = {
			params: {} as IParametrosBusca,
		};
		if (busca) {
			opcoes.params.search = busca;
			opcoes.params.ordering = ordenar;
		}
		carregarDados('http://0.0.0.0:8000/api/v1/restaurantes/', opcoes);
	};

	useEffect(() => {
		carregarDados('http://0.0.0.0:8000/api/v1/restaurantes/');
	}, []);

	return (
		<section className={style.ListaRestaurantes}>
			<h1>
				Os restaurantes mais <em>bacanas</em>!
			</h1>
			{
				<Box
					component='form'
					width='fullWidth'
					onSubmit={Buscar}
					sx={{ display: 'flex', gap: '1.5rem' }}
				>
					<TextField
						value={busca}
						onChange={event => setBusca(event.target.value)}
						id='standard-basic'
						label='Nome do Restaurante'
						variant='standard'
					/>
					<FormControl>
						<InputLabel id='select-label-ordenacao'>Ordenar</InputLabel>
						<Select
							labelId='select-label-ordenacao'
							id='select-ordenacao'
							value={ordenar}
							label='Ordenar'
							onChange={handleSelectChange}
							required
							sx={{ width: '6.5rem' }}
						>
							<MenuItem value={''} selected disabled>
								Escolher
							</MenuItem>
							<MenuItem value={'id'}>ID</MenuItem>
							<MenuItem value={'nome'}>Nome</MenuItem>
						</Select>
					</FormControl>

					<Button type='submit' variant='outlined'>
						Buscar
					</Button>
				</Box>
			}
			{restaurantes?.map(item => (
				<Restaurante restaurante={item} key={item.id} />
			))}
			{
				<button onClick={() => carregarDados(paginaAnterior)}>
					Página anterior
				</button>
			}
			{
				<button onClick={() => carregarDados(proximaPagina)}>
					Próxima página
				</button>
			}
		</section>
	);
};

export default ListaRestaurantes;
