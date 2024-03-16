import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CharactersResponse } from '../models/CardData';
import { Box, Grid, IconButton, Skeleton, Stack } from '@mui/material';

import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';

import { copy } from '../utils';
import { useToast } from './Toast/useToast';

interface CardProps {
	data?: CharactersResponse;
	isLoading: boolean;
}

function CharacterCard(props: CardProps) {
	const { data = {}, isLoading } = props;
	const { image, name, bounty } = data;
	const [isClicked, setIsClicked] = useState(false);
	const [imageData, setImageData] = useState();

	const { toast } = useToast();

	function handleClick() {
		setIsClicked(!isClicked);
	}

	useEffect(() => {
		if (!isLoading) {
			const imageURI = `../assets/posters/${image}`;
			import(imageURI).then((rs) => {
				setImageData(rs.default);
			});
		}
	}, [image, isLoading]);

	return (
		<Card elevation={6} raised sx={{ border: 0, borderRadius: 0 }}>
			<CardContent style={{ padding: 0 }}>
				{imageData ? (
					<Box sx={{ height: 360, width: 250 }}>
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
				) : (
					<Skeleton
						animation="wave"
						variant="rectangular"
						sx={{ height: 360, minWidth: 250 }}
						data-testid={'test-card-media-skeleton'}
					/>
				)}
				{isLoading ? (
					<Box
						sx={{ padding: 1, marginBottom: 1, marginTop: 1 }}
						data-testid={'test-name-skeleton-wrapper'}
					>
						<Skeleton animation="wave" sx={{ paddingTop: 0.5 }} />
						<Skeleton animation="wave" width="60%" sx={{ paddingTop: 0.5 }} />
					</Box>
				) : (
					<Stack padding={1}>
						<Typography variant="h5" color="text.secondary" component="div">
							{name}
						</Typography>
						<Stack direction={'row'} alignItems={'center'} sx={{}}>
							<CurrencyBitcoinIcon sx={{ mb: 0.25 }} />

							<Typography data-testid={'test-bounty'} variant="h6">
								{bounty}
							</Typography>
							<IconButton
								data-testid={'test_copy_btn'}
								aria-label="copy_bounty"
								size={'small'}
								sx={{ ml: 0.2 }}
								onClick={(e) => {
									copy(e, bounty);
									toast('success', 'Copied to clipboard!!');
								}}
							>
								<ContentCopyTwoToneIcon sx={{ fontSize: '1.2rem' }} />
							</IconButton>
						</Stack>
					</Stack>
				)}
			</CardContent>
			{/* <CardActions>
				<Button size="small">Share</Button>
				<Button size="small">Learn More</Button>
			</CardActions> */}
		</Card>
	);
}

export default CharacterCard;
