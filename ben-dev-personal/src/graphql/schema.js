import gql from "graphql-tag";

const typeDefs = gql`
  # Schema defs go below here #
  type Query {
    "Get exercises array for display in table on exercise-page"
    exercisesForTable: [Exercise!]!

    "Get workouts array for display in table on workout-page"
    workoutsForTable: [Workout!]!

    "Get sets array for display in table on record-page"
    setsForTable: [Set!]!
  }

  type Mutation {
    addExercise(
      name: String!
      rep_lower_limit: Int!
      rep_upper_limit: Int!
    ): Exercise!

    addWorkout(name: String!, date: String!): Workout!

    addSet(
      workoutId: ID!
      exerciseId: ID!
      set_number: Int!
      weight: Float
      reps: Int!
    ): Set!
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

  type Set {
    id: ID!
    workoutId: Workout!
    exerciseId: Exercise!
    set_number: Int!
    weight: Float
    reps: Int!
  }
`;

export default typeDefs;
