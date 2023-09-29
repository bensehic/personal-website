import gql from "graphql-tag";

const typeDefs = gql`
  # Schema defs go below here #
  type Query {
    "Get exercises array for display in table on exercise-page"
    exercisesForTable: [exercise!]!

    "Get workouts array for display in table on workout-page"
    workoutsForTable: [workout!]!

    "Get sets array for display in table on record-page"
    setsForTable: [set!]!

    "Get workout by ID"
    getWorkoutById(id: ID!): workout!

    "Get exercise by ID"
    getExerciseById(id: ID!): exercise!
  }

  type Mutation {
    addExercise(
      name: String!
      rep_lower_limit: Int!
      rep_upper_limit: Int!
    ): exercise!

    addWorkout(name: String!, date: String!): workout!

    addSet(
      workoutId: ID!
      exerciseId: ID!
      set_number: Int!
      weight: Float
      reps: Int!
    ): set!
  }

  type exercise {
    id: ID!
    name: String!
    rep_lower_limit: Int!
    rep_upper_limit: Int!
  }

  type workout {
    id: ID!
    name: String!
    date: String!
  }

  type set {
    id: ID!
    workout: workout!
    exercise: exercise!
    set_number: Int!
    weight: Float
    reps: Int!
  }
`;

export default typeDefs;
