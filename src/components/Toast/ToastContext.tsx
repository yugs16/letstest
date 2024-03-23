import { AlertColor } from '@mui/material/Alert';
import { createContext } from 'react';

export const ToastContext = createContext({
	//@ts-ignore
	toast: (type: AlertColor, content: string) => {},
});
