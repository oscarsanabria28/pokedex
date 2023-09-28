/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation SetFavorite($isFav: Boolean!, $userId: String!, $pokemonId: String!) {\n    setFavorite(isFav: $isFav, userId: $userId, pokemonId: $pokemonId) {\n      isFav\n    }\n  }\n": types.SetFavoriteDocument,
    "\nquery GetPokemons {\n    pokemons {\n      next,\n      previous,\n      results {\n          name,\n          id\n      }\n    }\n}": types.GetPokemonsDocument,
    "\nquery GetPokemon($id: String!, $userId: String!) {\n    pokemon(id: $id, userId: $userId) {\n      id,\n      name,\n      base_experience,\n      image_url,\n      abilities {\n        name,\n        slot\n      },\n      stats {\n        name,\n        base_stat\n      },\n      isFavorite\n    }\n}": types.GetPokemonDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SetFavorite($isFav: Boolean!, $userId: String!, $pokemonId: String!) {\n    setFavorite(isFav: $isFav, userId: $userId, pokemonId: $pokemonId) {\n      isFav\n    }\n  }\n"): (typeof documents)["\n  mutation SetFavorite($isFav: Boolean!, $userId: String!, $pokemonId: String!) {\n    setFavorite(isFav: $isFav, userId: $userId, pokemonId: $pokemonId) {\n      isFav\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetPokemons {\n    pokemons {\n      next,\n      previous,\n      results {\n          name,\n          id\n      }\n    }\n}"): (typeof documents)["\nquery GetPokemons {\n    pokemons {\n      next,\n      previous,\n      results {\n          name,\n          id\n      }\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetPokemon($id: String!, $userId: String!) {\n    pokemon(id: $id, userId: $userId) {\n      id,\n      name,\n      base_experience,\n      image_url,\n      abilities {\n        name,\n        slot\n      },\n      stats {\n        name,\n        base_stat\n      },\n      isFavorite\n    }\n}"): (typeof documents)["\nquery GetPokemon($id: String!, $userId: String!) {\n    pokemon(id: $id, userId: $userId) {\n      id,\n      name,\n      base_experience,\n      image_url,\n      abilities {\n        name,\n        slot\n      },\n      stats {\n        name,\n        base_stat\n      },\n      isFavorite\n    }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;