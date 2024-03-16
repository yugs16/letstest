enum RolesProps {
	Attack = 'attack',
}

export interface DataProps {
	name: string;
	type: string;
	roles: RolesProps;
}

export interface CharactersResponse {
	name?: string;
	image?: string;
	bounty?: string;
}
