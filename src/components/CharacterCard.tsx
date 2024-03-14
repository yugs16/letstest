import { Suspense, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CharactersResponse } from '../models/CardData';

import SkelRect from './skeletons/rect';
import { Box, Grid, Stack } from '@mui/material';

import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

interface CardProps {
	data: CharactersResponse;
}
function CharacterCard(props: CardProps) {
	const { data } = props;
	const { image, name, bounty } = data;
	const [isClicked, setIsClicked] = useState(false);
	const [imageData, setImageData] = useState();

	function handleClick() {
		setIsClicked(!isClicked);
	}

	useEffect(() => {
		// const src =
		// 'https://static.wikia.nocookie.net/onepiece/images/3/3b/Nami%27s_Current_Wanted_Poster.png/revision/latest?cb=20160619204508';

		const imageURI = `../assets/posters/${image}`;
		import(imageURI).then((rs) => {
			console.log(rs.default);
			setImageData(rs.default);
		});
	}, [image]);

	return (
		<Card elevation={6} raised sx={{ border: 0, borderRadius: 0 }}>
			<CardContent style={{ padding: 0 }}>
				<Box sx={{ height: '420px' }}>
					<CardMedia
						component="img"
						sx={{
							backgroundSize: 'contain',
							height: 'inherit',
							width: '100%',
						}}
						image={imageData}
						title="Bounty Poster"
						alt="bounty poster"
					/>
				</Box>
				<Stack padding={1}>
					<Typography variant="h5" color="text.secondary" component="div">
						{name}
					</Typography>
					<Stack direction={'row'} sx={{ ml: -0.5, mt: 0.5 }}>
						<CurrencyBitcoinIcon />
						<Typography sx={{ mt: 0.1 }} component="span" variant="body1">
							{bounty}
						</Typography>
					</Stack>
				</Stack>
			</CardContent>
			{/* <CardActions>
				<Button size="small">Share</Button>
				<Button size="small">Learn More</Button>
			</CardActions> */}
		</Card>
	);
}

export default CharacterCard;
