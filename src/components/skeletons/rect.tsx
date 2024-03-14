import Skeleton from '@mui/material/Skeleton';

export default function SkelRect() {
	return (
		<Skeleton variant="rectangular" width="100%">
			<div style={{ paddingTop: '57%' }} />
		</Skeleton>
	);
}
