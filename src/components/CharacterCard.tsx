import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CharactersResponse } from '../models/CardData';

interface CardProps {
	data?: CharactersResponse;
}
function CharacterCard(props: CardProps) {
	const { data } = props;
	const { image, name, bounty } = data;
	const [isClicked, setIsClicked] = useState(false);

	function handleClick() {
		setIsClicked(!isClicked);
	}

	return (
		<Card sx={{ maxWidth: 345 }} elevation={6}>
			<CardMedia
				sx={{ height: 200, backgroundSize: 'contain' }}
				image={image}
				title="green iguana"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					<b>Bounty: {bounty}</b>
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Lizards are a widespread group of squamate reptiles
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Share</Button>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
}

export default CharacterCard;
