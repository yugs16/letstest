import { useState, ReactElement, useMemo } from 'react';
import { ToastContext } from './ToastContext';
import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export interface ToastProps {
	id?: string;
	type: AlertColor;
	message: string;
	close?: (val?: string) => void;
	open: boolean;
}

const initialToast: ToastProps = {
	id: 'single_alert',
	message: '',
	type: 'info',
	open: false,
};

export const ToastProvider = (props: any) => {
	const { children }: { children?: ReactElement } = props;
	const [alert, setAlert] = useState<ToastProps>(initialToast);

	const toast = (type: AlertColor, content: string) => {
		return setAlert({ message: content, type, open: true });
	};
	const contextValue = useMemo(() => ({ toast }), []);

	const close = () => setAlert({ ...alert, open: false });

	return (
		<ToastContext.Provider value={contextValue}>
			{children}
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={alert.open}
				onClose={close}
				key={`s_${alert.id}`}
				autoHideDuration={6000}
			>
				<Alert
					onClose={close}
					severity={alert.type}
					variant="filled"
					sx={{ width: '100%' }}
				>
					{alert.open ? alert.message : null}
				</Alert>
			</Snackbar>
		</ToastContext.Provider>
	);
};
