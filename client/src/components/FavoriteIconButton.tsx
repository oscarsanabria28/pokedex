import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';

interface Props {
    isFavorite: boolean;
    id: string;
    userId: string;
}

const SET_FAVORITE = gql`
  mutation SetFavorite($isFav: Boolean!, $userId: String!, $pokemonId: String!) {
    setFavorite(isFav: $isFav, userId: $userId, pokemonId: $pokemonId) {
      isFav
    }
  }
`;

const FavoritePokemonIconButton = (props: Props) => {

    const [isFav, setFav] = useState(props.isFavorite);
    const [setFavorite, { data, loading, error }] = useMutation(SET_FAVORITE,
        {
            refetchQueries: [
                "GetPokemon"
            ]
        });

    if (loading) return "...";
    if (error) return "x";

    if(isFav) {
        return (
            <IconButton aria-label="add to favorites" onClick={() => {
                    setFavorite({ variables: {isFav: false, userId: props.userId, pokemonId: props.id} });
                    setFav(false);
                }}>
                <FavoriteIcon />
            </IconButton>
        );
    } else {
        return (
            <IconButton aria-label="remove from favorites" onClick={() => {
                    setFavorite({ variables: {isFav: true, userId: props.userId, pokemonId: props.id} });
                    setFav(true);
                }}>
                <FavoriteBorderIcon />
            </IconButton>
        );
    }
}

export default FavoritePokemonIconButton;