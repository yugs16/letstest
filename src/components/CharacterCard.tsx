import { Suspense, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CharactersResponse } from '../models/CardData';

import SkelRect from './skeletons/rect';
import { Box, Grid, IconButton, Stack } from '@mui/material';

import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';

import { copy, copyEvent } from '../utils';

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
					<Stack direction={'row'} alignItems={'center'} sx={{}}>
						<CurrencyBitcoinIcon sx={{ mb: 0.75 }} />
						<Box>
							<Typography data-testid={'test-bounty'} variant="h6">
								{bounty}
							</Typography>
							<IconButton
								data-testid={'test_copy_btn'}
								aria-label="copy_bounty"
								size={'small'}
								sx={{ mb: 0.5, ml: 0.2 }}
								onClick={copyEvent(bounty)}
							>
								<ContentCopyTwoToneIcon />
							</IconButton>
						</Box>
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
