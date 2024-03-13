export const getCharacters = async (characterType = '') => {
	return (await fetch(`/api/v1/characters${characterType}`)).json();
};
