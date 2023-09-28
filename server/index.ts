//const { ApolloServer, gql } = require("apollo-server");
//const axios = require("axios");
const POKEMON_API = "https://pokeapi.co/api/v2/";
import axios from "axios";
//import { readFile } from 'fs/promises';
import fs from "fs";


import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
/*
const typeDefs = gql`
  ${require('fs').readFileSync(require.resolve('./src/schema.graphql'), 'utf8')}
`;
*/
const typeDefs = fs.readFileSync('./src/schema.graphql', 'utf8');
//const content = await readFile('./file.json');

const getPokemonIdFromUrl = (url: string) : string => {
  const parts = url.split("/");
  console.log("parts:"+parts);
  const id = parts[parts.length-2];
  console.log("id:"+id);
  return id;
}

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await axios.get("https://api.github.com/users")
        return users.data.map(({ id, login, avatar_url }) => ({
          id,
          login,
          avatar_url,
        }))
      } catch (error) {
        throw error
      }
    },
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
        console.log("url-"+url);
        const res = await axios.get(POKEMON_API+"pokemon/"+id);
        const pokemon = res.data;
        console.log(pokemon.sprites.other.home.front_default);
        return {
          id: pokemon.id,
          name: pokemon.name,
          base_experience:pokemon.base_experience,
          image_url:pokemon.sprites.other.home.front_default,
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