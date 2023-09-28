import { gql } from "../__generated__";
import { useQuery } from "@apollo/client";

interface Props {
    id: string;
    userId: string;
}

const POKEMON_QUERY = gql(`
query GetPokemon($id: String!, $userId: String!) {
    pokemon(id: $id, userId: $userId) {
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



const usePokemonQuery = (props: Props) => {
    const {id, userId} = props;

    const { loading, error, data } = useQuery(POKEMON_QUERY, {
        variables: { id, userId }
      });

    return {
        loading,
        error,
        data,
      };
}

export default usePokemonQuery;
