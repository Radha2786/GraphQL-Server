import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
const server = new ApolloServer({
    typeDefs, // this tells what the graph should  look like
    // resolvers,  // resolver functions are responsibel for handling incoming request and return data to the client 
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀 Server ready at: ${url}`);
