const baseURI = 'http://myserver/api/v1';
const headers = ['Content-Type', 'application/json'];

export const getCharacters = async (characterType = '') => {
	return (await fetch(`/characters${characterType}`)).json();
};
