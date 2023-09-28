import React from 'react';
import Pokemon from './pokemon';
import { gql } from "../__generated__/";
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
        <Grid container >

            {
                pokemons.map((pokemon) => {
                    return (
                        <Pokemon 
                            id={`${pokemon.id}`} 
                            name={pokemon.name} 
                            description={pokemon.id}
                            baseExperience={1000}
                            height={50}
                            isFavorite={true} 
                        />  
                    );
                })
            }

      </Grid>
    );
}

export default PokemonGrid;