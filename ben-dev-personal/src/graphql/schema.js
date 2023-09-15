import gql from "graphql-tag";

const typeDefs = gql`
  # Schema defs go below here #
  type Query {
    "Get exercises array for display in table on exercise-page"
    exercisesForTable: [Exercise!]!

    "Get workouts array for display in table on workout-page"
    workoutsForTable: [Workout!]!
  }

  type Mutation {
    addExercise(name: String!, rep_lower_limit: Int!, rep_upper_limit: Int!): Exercise!

    addWorkout(name: String!, date: String!): Workout!
  }

  type Exercise {
    id: ID!
    name: String!
    rep_lower_limit: Int!
    rep_upper_limit: Int!
  }

  type Workout {
    id: ID!
    name: String!
    date: String!
  }
`;

export default typeDefs;
