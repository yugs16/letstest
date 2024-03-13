function Iterator(props) {
	const { component, data, ...rest } = props;

	const Component = component;

	return (
		<>
			{data.map((item, index) => {
				return <Component data={item} {...rest} />;
			})}
		</>
	);
}

export default Iterator;
