import { useState } from 'react';
import estilos from './Login.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import http from '../../../http';
import { useNavigate } from 'react-router-dom';

interface IProps {
	setLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

type Inputs = {
	email: string;
	username: string;
	password: string;
};

const Login = ({ setLogged }: IProps) => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const handle: SubmitHandler<Inputs> = event => {
		const localUser = {
			email,
			username: userName,
		};

		http
			.get('user/')
			.then(res => {
				console.log(res.data);
				let existe = false;
				for (let i = 0; i <= res.data.length; i++) {
					if (
						res.data[i].username === localUser.username &&
						res.data[i].email === localUser.email
					) {
						existe = true;
						break;
					}
				}
				console.log(existe);
				if (existe) {
					setLogged(true);
					navigate('restaurantes');
				}
			})
			.catch(err => console.log(err));
	};

	return (
		<section className={estilos.Login}>
			<form onSubmit={handleSubmit(handle)}>
				<label htmlFor='email'>E-mail:</label>
				<input
					placeholder='E-email'
					{...register('email', {
						onChange(event) {
							setEmail(event.target.value);
						},
						maxLength: 254,
						pattern: {
							value:
								/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
							message: 'Formato de email inválido.',
						},
					})}
				/>
				{errors.email?.message?.length !== 0 ? (
					<p>{errors.email?.message}</p>
				) : (
					''
				)}
				{/* Obrigatório. 150 ca
        racteres ou menos. Letras, números e @/./+/-/_
				apenas. */}
				<label htmlFor='username'>Nome de usuário:</label>
				<input
					placeholder='Nome de usuário*'
					{...register('username', {
						onChange(event) {
							setUserName(event.target.value);
						},
						maxLength: 150,
						required: 'Obrigatório',
						pattern: {
							value: /^[\w.@+-]+$/g,
							message: 'Formato inválido. Letras, números e @/./+/-/_ apenas.',
						},
					})}
				/>
				<label htmlFor='password'>Senha:</label>
				<input
					type='password'
					placeholder='Senha*'
					{...register('password', {
						maxLength: 128,
						minLength: 1,
						required: 'Campo obrigatório',
						onChange(event) {
							setPassword(event.target.value);
						},
					})}
				/>
				<button>Entrar</button>
			</form>
		</section>
	);
};

export default Login;
