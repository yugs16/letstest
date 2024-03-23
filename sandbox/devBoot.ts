const prepare = async () => {
	console.log('in prepare======');
	// if (process.env.NODE_ENV !== 'development') {
	// 	return;
	// 	// return Promise.resolve();
	// }

	console.log('chec============================');
	const { worker } = await import('../config/browser');
	worker.start({
		onUnhandledRequest: 'bypass',
	});
	return worker.start();
};

export { prepare };
