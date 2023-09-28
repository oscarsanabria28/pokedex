import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import usePokemonQuery from '../queries/usePokemonQuery';
import FavoritePokemonIconButton from './FavoriteIconButton';

interface Props {
    id: string;
}
const PokemonGridItem = (props: Props) => {

    const {id} = props;

    const { loading, error, data } = usePokemonQuery({id});
    
    if (loading) return <div>Loading ...</div>;

    if (error) return <div>{`Error! ${error.message}`}</div>;

    const pokemon = data && data.pokemon ? data.pokemon : null;

    if(!pokemon) {
        return null;
    }

    return (
        <Grid item xs={3} md={3} lg={3}>
            <Card >
            <CardMedia
                sx={{ height: 140, backgroundSize: '40%' }}
                image={pokemon.image_url}
                title={`${pokemon.id}`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {pokemon.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {pokemon.abilities && pokemon.abilities.map((ability) => {
                    if(ability) {
                        return <div>{ability.name} - {ability.slot}</div>
                    }
                    return null;
                })}
                </Typography>
            </CardContent>
            <CardActions>
                <FavoritePokemonIconButton isFavorite={true} id={pokemon.id}/>      
            </CardActions>
            </Card>
        </Grid>
    );
}

export default PokemonGridItem;