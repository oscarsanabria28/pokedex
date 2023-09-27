import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface Props {
    id: number;
    name: string;
    description: string;
    baseExperience: number;
    height: number;
    isFavorite: boolean;
}

const PokemonGridItem = (props: Props) => {

    const {id, name, description, isFavorite} = props;

    return (
        <Grid item xs={3} md={3}>
            <Card >
            <CardMedia
                sx={{ height: 140 }}
                image="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
                title={`${id}`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {description}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="add to favorites">
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
            </Card>
        </Grid>
    );
}

export default PokemonGridItem;