const baseURI = 'http://localhost:4000/api/v1';
// const headers = ['Content-Type', 'application/json'];

export const getCharacters = async () => {
	return (await fetch(`${baseURI}/characters`)).json();
};
