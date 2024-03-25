import { Grid } from '@mui/material';
export interface IteratorProps {
	id?: string;
	component: React.FC<any>;
	data: any;
	isLoading?: boolean;
	spacing?: number;
	itemViewPortSizes?: Record<string, string>;
	containerProps?: Record<string, string>;
}

function Iterator(props: IteratorProps & any) {
	const {
		component,
		id,
		data,
		spacing = 2,
		containerProps = {},
		itemViewPortSizes = {},
		...rest
	} = props;

	const Component = component;

	return (
		<Grid
			container
			spacing={spacing}
			{...containerProps}
			data-testid={id || 'iterator-container'}
		>
			{data.map((item: any, index: number) => {
				return (
					<Grid key={`g_${index}`} item {...itemViewPortSizes}>
						<Component key={`d_comp_${index}`} data={item} {...rest} />
					</Grid>
				);
			})}
		</Grid>
	);
}

export default Iterator;
