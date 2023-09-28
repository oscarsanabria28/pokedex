import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import usePokemonQuery from '../queries/usePokemonQuery';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import FavoritePokemonIconButton from './FavoriteIconButton';
interface Props {
    id: string;
}

const ImgStyled = styled('img')(({ theme }) => ({
    width: '80%',
    maxHeight: '50vh',
    overflowY: 'hidden'
}));

const Pokemon = (props: Props) => {

    const { id } = props;

    const userId = localStorage.getItem('userUIID') || "";

    const { loading, error, data } = usePokemonQuery({ id, userId});

    if (loading) return <div>Loading ...</div>;

    if (error) return <div>{`Error! ${error.message}`}</div>;

    const pokemon = data && data.pokemon ? data.pokemon : null;

    if (!pokemon) {
        return <div>Pokemon `$(id)` NOT found 404 ...</div>;
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ bgcolor: '#eeeeee', height: '100vh' }}>
                {pokemon.image_url && <ImgStyled src={pokemon.image_url} alt='pokemon_background' />}
                <Grid container>
                    <FavoritePokemonIconButton isFavorite={pokemon.isFavorite!} id={pokemon.id} userId={userId}/>
                </Grid>
                <Grid container>
                    <Typography gutterBottom variant="h3" component="div" align='center'>
                        {pokemon.name}
                    </Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={6} md={6} lg={6}>
                        <Typography gutterBottom variant="h5" component="div">
                            Abilities
                        </Typography>
                        {pokemon.abilities && pokemon.abilities.map((ability) => {
                            if (ability) {
                                return <div>{ability.name} - {ability.slot}</div>
                            }
                            return null;
                        })}
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Typography gutterBottom variant="h5" component="div">
                            Stats
                        </Typography>
                        {pokemon.stats && pokemon.stats.map((stat) => {
                            if (stat) {
                                return <div>{stat.name} - {stat.base_stat}</div>
                            }
                            return null;
                        })}
                    </Grid>
                </Grid>

            </Box>
        </Container>
    );
};

export default Pokemon;