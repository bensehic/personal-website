import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./schema.js";

async function startApolloServer() {
  const server = new ApolloServer({
    schema: addMocksToSchema({
      schema: makeExecutableSchema({ typeDefs }),
      mocks,
    }),
  });
  const { url } = await startStandaloneServer(server);
  console.log(`
    Server is running!
    Query at ${url}
 `);
}

const mocks = {
  Query: () => ({
    exercisesForTable: () => [...new Array(5)],
    workoutsForTable: () => [...new Array(5)],
  }),
  Exercise: () => ({
    id: () => "ex_1",
    name: () => "Testing",
    sets: () => 3,
    reps: () => 10
  }),
  Workout: () => ({
    id: () => "wo_1",
    name: () => "Test"
  })
}

startApolloServer();
