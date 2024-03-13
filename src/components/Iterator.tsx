import Grid from '@mui/material/Grid';
interface IteratorProps {
	component: React.FC<any>;
	data: any;
	isLoading?: boolean;
}

function Iterator(props: IteratorProps) {
	const { component, data, ...rest } = props;

	const Component = component;

	return (
		<Grid container spacing={2}>
			{data.map((item: any, index: number) => {
				return (
					<Grid item xs={1} sm={4} md={3}>
						<Component key={`d_comp_${index}`} data={item} {...rest} />
					</Grid>
				);
			})}
		</Grid>
	);
}

export default Iterator;
