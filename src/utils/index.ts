export const copyEvent = (val: any) => (event: React.MouseEvent<HTMLElement>) =>
	copy(event, val);

export const copy = (event: React.MouseEvent<HTMLElement>, val: any) => {
	event.stopPropagation();
	navigator.clipboard.writeText(val);
};
