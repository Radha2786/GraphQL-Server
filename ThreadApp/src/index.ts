import express from "express";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

async function init(){

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(express.json());

const gqlServer = new ApolloServer({
    typeDefs:"", // schema 
    resolvers:{},
  });

  // start the gql server
  await gqlServer.start();

app.get('/', (req,res)=>{
    res.json({message: "Server is Up & Running"});
})

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
})

}

init();

