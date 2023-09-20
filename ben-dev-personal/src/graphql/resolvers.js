import { Exercise, Workout, Set } from "./connectors.js";

const resolvers = {
  Query: {
    exercisesForTable: async () => {
      return await Exercise.findAll();
    },
    workoutsForTable: async () => {
      return await Workout.findAll();
    },
    setsForTable: async () => {
      try {
        const data = await Set.findAll({
          // PROBLEM IS HERE!!!!! FML
          include: [Workout, Exercise],
        });
        return data;
        // return await Set.findAll({
        //   include: [Workout, Exercise],
        // });
      } catch (err) {
        console.log(err);
      }
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
    addSet: async (_, args) => {
      try {
        const set = await Set.create({
          workoutId: args.workoutId,
          exerciseId: args.exerciseId,
          set_number: args.set_number,
          weight: args.weight,
          reps: args.reps,
        });
        return set;
      } catch (error) {
        throw new Error("Failed to add set: ", error.message);
      }
    },
  },
};

export default resolvers;
