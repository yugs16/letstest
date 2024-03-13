import { useQuery } from '@tanstack/react-query';
import { getCharacters } from './api';

export const useGetCharacters = (characterType?: string) => {
	return useQuery({
		queryKey: ['someKey'],
		queryFn: () => getCharacters(characterType),
		staleTime: 2,
	});
};
