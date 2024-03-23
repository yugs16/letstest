import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CharactersResponse } from '../models/CardData';
import { Box, IconButton, Skeleton, Stack } from '@mui/material';

import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import { copy } from '../utils';
import { useToast } from './Toast/useToast';

interface CardProps {
	data?: CharactersResponse;
	isLoading: boolean;
	openEditBountyDialog?: (val: string) => void;
}

const iconSize = {
	fontSize: '1.2rem',
};

function CharacterCard(props: CardProps) {
	const { data = {}, isLoading, openEditBountyDialog } = props;
	const { image, name, bounty } = data;
	const [imageData, setImageData] = useState<string>();

	const { toast } = useToast();

	useEffect(() => {
		if (!isLoading && image) {
			const imageURI = `../assets/images/${image}/`;
			// @vite-ignore
			import(imageURI).then((rs) => {
				// @vite-ignore

				setImageData(rs.default);
			});
			// setImageData(imageURI);
		}
	}, [image, isLoading]);

	return (
		<Card elevation={6} raised sx={{ border: 0, borderRadius: 0 }}>
			<CardContent style={{ padding: 0 }}>
				{imageData ? (
					<Box sx={{ height: 360 }}>
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
						sx={{ height: 360, minWidth: 230, width: 235 }}
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
								<ContentCopyTwoToneIcon sx={{ ...iconSize }} />
							</IconButton>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'flex-end',
								}}
							>
								<IconButton
									size="small"
									aria-label="Edit Bounty"
									onClick={
										openEditBountyDialog
											? () => openEditBountyDialog(bounty || '0')
											: () => {}
									}
								>
									<EditTwoToneIcon sx={{ ...iconSize }} />
								</IconButton>
							</Box>
						</Stack>
					</Stack>
				)}
			</CardContent>
		</Card>
	);
}

export default CharacterCard;
