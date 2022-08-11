import { Navigate } from 'react-router-dom';

interface Props {
	logged: boolean;
	children: JSX.Element;
}

export default function Protected({ logged, children }: Props) {
	if (!logged) {
		return <Navigate to={'/admin'} />;
	}

	return children;
}
