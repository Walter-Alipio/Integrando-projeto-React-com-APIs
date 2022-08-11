import { useNavigate } from 'react-router-dom';
import estilos from './Modal.module.scss';

interface Props {
	children: string;
	setStatusOk: React.Dispatch<React.SetStateAction<boolean>>;
	statusOk: boolean;
}
const Modal = ({ children, setStatusOk }: Props) => {
	const navigate = useNavigate();
	return (
		<div className={estilos.modal}>
			<article>
				<h2>{children}</h2>
				<button
					onClick={event => {
						event.preventDefault();
						setStatusOk(false);
						navigate('/admin/restaurantes');
					}}
				>
					OK
				</button>
			</article>
		</div>
	);
};

export default Modal;
