import React from 'react';
import PokemonGridItem from './PokemonGridItem';
import { gql } from "../__generated__";
import Grid from '@mui/material/Grid';
import { useQuery } from "@apollo/client";

const POKEMONS_QUERY = gql(`
query GetPokemons {
    pokemons {
      next,
      previous,
      results {
          name,
          id
      }
    }
}`);

const PokemonGrid = () => {

    const { loading, error, data } = useQuery(POKEMONS_QUERY);
    
    if (loading) return <div>Loading ...</div>;

    if (error) return <div>{`Error! ${error.message}`}</div>;

    const pokemons = data && data.pokemons && data.pokemons.results ? data.pokemons.results : [];


    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 8}}>

            {
                pokemons.map((pokemon) => {
                    return (
                        <PokemonGridItem 
                            id={`${pokemon.id}`} 
                        />  
                    );
                })
            }

      </Grid>
    );
}

export default PokemonGrid;