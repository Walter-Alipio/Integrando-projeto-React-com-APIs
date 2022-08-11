import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';
import Modal from '../../../componentes/Modal';

const FormularioRestaurante = () => {
	const [nomeRestaurante, setNomeRestaurante] = useState('');
	const [mensagem, setMensagem] = useState('');
	const [statusOk, setStatusOk] = useState(false);

	const parametros = useParams();

	useEffect(() => {
		if (parametros.id) {
			http
				.get<IRestaurante>(`restaurantes/${parametros.id}/`)
				.then(res => setNomeRestaurante(res.data.nome));
		}
	}, [parametros]);

	const aoSubmiterForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (parametros.id) {
			http
				.put(`restaurantes/${parametros.id}/`, {
					nome: nomeRestaurante,
				})
				.then(res => {
					setMensagem('Alterado com sucesso!');
					setStatusOk(true);
					console.log(res.status + 'Alterado com sucesso!');
				});
		} else {
			http
				.post('restaurantes/', {
					nome: nomeRestaurante,
				})
				.then(res => {
					setMensagem('Cadastrado com sucesso!');
					setStatusOk(true);
					console.log(res.status + 'Cadastrado com sucesso!');
				});
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				flexGrow: 1,
			}}
		>
			{statusOk ? (
				<Modal setStatusOk={setStatusOk} statusOk={statusOk}>
					{mensagem}
				</Modal>
			) : (
				''
			)}
			<Typography component='h1' variant='h6'>
				Formulário de Restaurantes
			</Typography>
			<Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmiterForm}>
				<TextField
					value={nomeRestaurante}
					onChange={event => setNomeRestaurante(event.target.value)}
					id='standard-basic'
					label='Nome do Restaurante'
					variant='standard'
					fullWidth
					required
				/>
				<Button
					sx={{ marginTop: 1 }}
					type='submit'
					variant='outlined'
					fullWidth
				>
					Salvar
				</Button>
			</Box>
		</Box>
	);
};

export default FormularioRestaurante;
