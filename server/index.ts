import db from "./src/db/conn.js";
import axios from "axios";
import fs from "fs";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import getUserOrCreateIt from "./src/db/db_queries.js";
import isFavorite from "./src/db/isFavoriteQuery.js";
import setFavorite from "./src/db/setFavorite.js";

const POKEMON_API = "https://pokeapi.co/api/v2/";
const typeDefs = fs.readFileSync('./src/schema.graphql', 'utf8');

const getPokemonIdFromUrl = (url: string) : string => {
  const parts = url.split("/");
  return parts[parts.length-2];
}

const resolvers = {
  Mutation: {
    setFavorite: async (parent, args, contextValue, info) => {
      await setFavorite(args.userId, args.pokemonId, args.isFav);
      return {isFav: !args.isFav};
    },
  },
  Query: {
    pokemons: async () => {
      try {
        const pokemons = await axios.get(POKEMON_API+"pokemon")
        return {
          next: pokemons.data.next,
          previous: pokemons.data.previous,
          results: pokemons.data.results.map((pokemon) => {
            return {
              name: pokemon.name,
              id: getPokemonIdFromUrl(pokemon.url)
            }
          }),
        };
      } catch (error) {
        throw error
      }
    },
    pokemon: async (parent, args, contextValue, info) => {
      try {
        const id = args.id;
        const url = POKEMON_API+"pokemon/"+id;
        
        const res = await axios.get(POKEMON_API+"pokemon/"+id);
        const pokemon = res.data;
        
        const user = await getUserOrCreateIt(args.userId);
        const isFav = await isFavorite(args.userId, pokemon.id);
      
        return {
          id: pokemon.id,
          name: pokemon.name,
          base_experience:pokemon.base_experience,
          image_url:pokemon.sprites.other.home.front_default || pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
          abilities:pokemon.abilities.map((ability) => {
            return {
              name: ability.ability.name,
              slot: ability.slot
            }
          }),
          stats:pokemon.stats.map((stat) => {
            return {
              name: stat.stat.name,
              base_stat: stat.base_stat
            }
          }),
          isFavorite: isFav
        }

      } catch (error) {
        throw error
      }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);