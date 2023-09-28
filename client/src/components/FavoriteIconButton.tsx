import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
interface Props {
    isFavorite: boolean;
    id: string;
}

const FavoritePokemonIconButton = (props: Props) => {

    return (
        <IconButton aria-label="add to favorites">
            {true ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>  
    );

}

export default FavoritePokemonIconButton;