import { useQuery } from '@tanstack/react-query';
import { getCharacters } from './api';

export const useGetCharacters = () => {
	return useQuery({
		queryKey: ['someKey'],
		queryFn: () => getCharacters(),
		staleTime: 2,
	});
};
