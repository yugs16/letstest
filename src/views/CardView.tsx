import { useCallback, useState } from 'react';
import CharacterCard from '../components/CharacterCard';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Iterator from '../components/Iterator';
import { useGetCharacters } from '../services/queries';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

interface SelectSmallProps {
	onChange: (val: string) => void;
	value?: string;
}

function SelectSmall(props: SelectSmallProps) {
	const { onChange, value = '' } = props;

	const handleChange = (event: SelectChangeEvent) => {
		onChange(event.target.value);
	};

	return (
		<FormControl sx={{ minWidth: 120 }} size="small">
			<InputLabel id="demo-select-small-label">Crews</InputLabel>
			<Select
				labelId="demo-select-small-label"
				id="demo-select-small"
				value={value}
				label="Crews"
				onChange={handleChange}
			>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				<MenuItem value={'straw_hats'}>Straw Hats</MenuItem>
				<MenuItem value={'law'}>The Heart Pirates</MenuItem>
				<MenuItem value={'cross_guild'}>Cross Guild</MenuItem>
			</Select>
		</FormControl>
	);
}

function CardView() {
	const [characterType, setCharacterType] = useState<string>();
	const { data, isLoading, isError } = useGetCharacters(characterType);

	const filterDataByCrew = useCallback(() => {
		console.log(data, characterType);
		if (Array.isArray(data)) {
			if (characterType === 'straw_hats') {
				return data.filter((d) => d.isStrawHat);
			}
			if (characterType === 'law') {
				return data.filter((d) => d.crew.name.toLowerCase().includes('heart'));
			}
			if (characterType === 'cross_guild') {
				return data.filter((d) => d.crew.name.toLowerCase().includes('cross'));
			}
			return data;
		}
		return [];
	}, [characterType, data]);

	return (
		<Stack gap={2}>
			<Box>
				<SelectSmall onChange={setCharacterType} value={characterType} />
			</Box>
			{isError && <div>Some Error please check!!</div>}
			{isLoading ? (
				<Iterator
					component={CharacterCard}
					data={new Array(10).fill({})}
					isLoading={isLoading}
					containerProps={{
						justifyContent: 'space-between',
					}}
				></Iterator>
			) : (
				<Iterator
					component={CharacterCard}
					data={filterDataByCrew()}
					isLoading={isLoading}
					containerProps={{
						justifyContent: 'space-between',
					}}
				></Iterator>
			)}
		</Stack>
	);
}

export default CardView;
