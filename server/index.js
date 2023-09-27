const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  ${require('fs').readFileSync(require.resolve('./src/schema.graphql'), 'utf8')}
`;

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
  },
  Query: {
    pokemons: async () => {
      try {
        const pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon")
        return pokemons.data;
      } catch (error) {
        throw error
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))