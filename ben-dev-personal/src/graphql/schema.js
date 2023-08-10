import gql from "graphql-tag";

const typeDefs = gql`
  # Schema defs go here
  type Query {
    "Get exercises array for display in table on exercise-page"
    exercisesForTable: [Exercise!]!
  }

  "An exercise is a physical movement and has a number of sets and reps associated"
  type Exercise {
    id: ID!
    name: String!
    sets: Int
    reps: Int
  }
`;

export default typeDefs;
