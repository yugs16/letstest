const prepare = async () => {
	// if (process.env.NODE_ENV !== 'development') {
	// 	return;
	// 	// return Promise.resolve();
	// }

	const { worker } = await import('../config/browser');
	worker.start({
		onUnhandledRequest: 'bypass',
	});
};

export { prepare };
