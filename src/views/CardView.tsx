import React, { useEffect, useState } from 'react';
import CharacterCard from '../components/CharacterCard';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Iterator from '../components/Iterator';
import { useGetCharacters } from '../services/queries';

interface SelectSmallProps {
	onChange: (val: string) => void;
	value?: string;
}

function SelectSmall(props: SelectSmallProps) {
	const { onChange, value } = props;

	const handleChange = (event: SelectChangeEvent) => {
		onChange(event.target.value);
	};

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
			<InputLabel id="demo-select-small-label">Age</InputLabel>
			<Select
				labelId="demo-select-small-label"
				id="demo-select-small"
				value={value}
				label="Age"
				onChange={handleChange}
			>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				<MenuItem value={'pairates'}>Pirates</MenuItem>
				<MenuItem value={'navy'}>Navy</MenuItem>
			</Select>
		</FormControl>
	);
}

function CardView() {
	const [characterType, setCharacterType] = useState<string>();
	const { data, isLoading, isError } = useGetCharacters(characterType);
	console.log('isLoading.. ', isLoading, data);
	return (
		<>
			<SelectSmall onChange={setCharacterType} value={characterType} />
			{data && (
				<Iterator
					component={CharacterCard}
					data={data}
					isLoading={isLoading}
				></Iterator>
			)}
			{isError && <div>Some Error please check!!</div>}
		</>
	);
}

export default CardView;
