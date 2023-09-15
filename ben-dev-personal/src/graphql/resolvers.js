import { Exercise, Workout } from "./connectors.js";

const resolvers = {
  Query: {
    exercisesForTable: async () => {
      return await Exercise.findAll();
    },
    workoutsForTable: async () => {
      return await Workout.findAll();
    },
  },
  Mutation: {
    addExercise: async (_, args) => {
      try {
        const exercise = await Exercise.create({
          name: args.name,
          rep_lower_limit: args.rep_lower_limit,
          rep_upper_limit: args.rep_upper_limit,
        });
        return exercise;
      } catch (error) {
        throw new Error("Failed to add exercise: ${error.message}");
      }
    },
    addWorkout: async (_, args) => {
      try {
        const workout = await Workout.create({
          name: args.name,
          date: args.date,
        });
        return workout;
      } catch (error) {
        throw new Error("Failed to add workout: ${error.message}");
      }
    },
  },
};

export default resolvers;
