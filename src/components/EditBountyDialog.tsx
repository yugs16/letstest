import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useToast } from './Toast/useToast';

interface EditBountyDialogProps {
	open: boolean;
	bounty: string;
	closeDialog?: () => void;
}

export default function EditBountyDialog(props: EditBountyDialogProps) {
	const { open, bounty, closeDialog } = props;
	const [openDialog, setOpen] = React.useState(false);
	const [bountyVal, setBountyVal] = React.useState(bounty);

	const { toast } = useToast();

	const handleClose = () => {
		setOpen(false);
		if (closeDialog) closeDialog();
	};

	const handleSubmit = () => {
		toast('success', 'Saved !!');
		setOpen(false);
		if (closeDialog) closeDialog();
	};

	const handleChange = (e) => {
		console.log('bounty changed');
		setBountyVal(e.target.value);
	};

	React.useEffect(() => {
		if (open) {
			setBountyVal(bounty);
			setOpen(true);
		}
	}, [open]);

	return (
		<React.Fragment>
			<Dialog open={openDialog} onClose={handleClose}>
				<DialogTitle>Edit Bounty</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Any bounty change made here will be reflected after verification
						only.
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin="dense"
						id="name"
						name="bounty"
						label="Edit Bounty"
						type="text"
						fullWidth
						variant="standard"
						value={bountyVal}
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions sx={{ padding: 2 }}>
					<Button variant="outlined" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="contained" onClick={handleSubmit}>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
