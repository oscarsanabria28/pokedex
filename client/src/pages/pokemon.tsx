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
import { gql } from "../__generated__/";
import { useQuery } from "@apollo/client";

interface Props {
    id: string;
    name: string;
    description: string;
    baseExperience: number;
    height: number;
    isFavorite: boolean;
}

const POKEMON_QUERY = gql(`
query GetPokemon($id: String!) {
    pokemon(id: $id) {
      id,
      name,
      base_experience,
      image_url,
      abilities {
        name,
        slot
      },
      stats {
        name,
        base_stat
      }
    }
}`);

const PokemonGridItem = (props: Props) => {

    const {id, isFavorite} = props;

    const { loading, error, data } = useQuery(POKEMON_QUERY, {
        variables: { id }
      });
    
    if (loading) return <div>Loading ...</div>;

    if (error) return <div>{`Error! ${error.message}`}</div>;

    const pokemon = data && data.pokemon ? data.pokemon : null;

    if(!pokemon) {
        return null;
    }

    return (
        <Grid item xs={3} md={3}>
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
                <IconButton aria-label="add to favorites">
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>        
                <Button size="small">See details</Button>
            </CardActions>
            </Card>
        </Grid>
    );
}

export default PokemonGridItem;