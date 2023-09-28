import { gql } from "../__generated__";
import { useQuery } from "@apollo/client";

interface Props {
    id: string;
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



const usePokemonQuery = (props: Props) => {
    const {id} = props;

    const { loading, error, data } = useQuery(POKEMON_QUERY, {
        variables: { id }
      });

    return {
        loading,
        error,
        data,
      };
}

export default usePokemonQuery;
