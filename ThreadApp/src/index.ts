import express from "express";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { prismaClient } from "./lib/db";


async function init(){

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(express.json());

const gqlServer = new ApolloServer({
    typeDefs:`
    type Query {
    hello: String
    say(name: String): String
    }
    type Mutation {
    createUser(email: String!, password: String!, firstName: String!, LastName: String!): Boolean
    }
    
    `, // schema 
    resolvers:{
        Query:{
            hello: () => `Hey there! I am a GraphQL Server`,
            say : (_, {name}: {name: string }) => `Hey ${name}, How are you?`
        },
        Mutation : {
            createUser: async(_,{email,password,firstName, LastName}: {email: string, password: string, firstName: string, LastName: string}) => {
                // create a new user 
               await prismaClient.user.create({
                data:{
                    email,
                    password,
                    firstName,
                    LastName,
                    salt: "random_salt",
                },
               });
               return true;
        }
    },
  },
}
);

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

