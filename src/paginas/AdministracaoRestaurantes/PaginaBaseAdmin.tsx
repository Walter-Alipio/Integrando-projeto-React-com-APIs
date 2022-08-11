import {
	AppBar,
	Box,
	Button,
	Typography,
	Link,
	Container,
	Toolbar,
	Paper,
} from '@mui/material';
import { Link as RouterLink, Navigate, Outlet } from 'react-router-dom';

interface IProps {
	logged: boolean;
	setLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaginaBaseAdmin = ({ logged, setLogged }: IProps) => {
	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.defaultPrevented;
		setLogged(false);
		<Navigate to={'/admin'} />;
	};
	return (
		<>
			<AppBar position='static'>
				<Container
					maxWidth='xl'
					sx={{ display: 'flex', justifyContent: 'space-between' }}
				>
					<Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
						<Typography variant='h6'>Administração</Typography>
						<Box sx={{ display: 'flex', flexGrow: 1 }}>
							<Link component={RouterLink} to='/admin/restaurantes'>
								<Button sx={{ my: 2, color: 'white' }}>Restaurantes</Button>
							</Link>
							<Link component={RouterLink} to='/admin/restaurantes/novo'>
								<Button sx={{ my: 2, color: 'white' }}>Novo Restaurante</Button>
							</Link>
							<Link component={RouterLink} to='/admin/pratos'>
								<Button sx={{ my: 2, color: 'white' }}>Pratos</Button>
							</Link>
							<Link component={RouterLink} to='/admin/pratos/novo'>
								<Button sx={{ my: 2, color: 'white' }}>Novo Prato</Button>
							</Link>
						</Box>
					</Toolbar>
					{logged ? (
						<Button color='inherit' onClick={handleClick}>
							Sair
						</Button>
					) : (
						''
					)}
				</Container>
			</AppBar>
			<Box>
				<Container maxWidth='lg' sx={{ mt: 1 }}>
					<Paper sx={{ p: 2 }}>
						{/* contúdo dá página */}
						<Outlet />
					</Paper>
				</Container>
			</Box>
		</>
	);
};

export default PaginaBaseAdmin;
