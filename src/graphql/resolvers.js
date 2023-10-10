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
        const data = await Set.findAll();

        const setsWithDetails = await Promise.all(
          data.map(async (set) => {
            const workout = await Workout.findByPk(set.workoutId);
            const exercise = await Exercise.findByPk(set.exerciseId);
            return {
              ...set.dataValues,
              workout,
              exercise,
            };
          })
        );
        return setsWithDetails;
      } catch (err) {
        throw new Error("Failed to fetch data: " + err.message);
      }
    },
    getWorkoutById: async (parent, { id }) => {
      try {
        const workout = await Workout.findByPk(id);
        return workout;
      } catch (err) {
        throw new Error("Failed to fetch workout by ID: " + err.message);
      }
    },
    getExerciseById: async (parent, { id }) => {
      try {
        const exercise = await Exercise.findByPk(id);
        return exercise;
      } catch (err) {
        throw new Error("Faield to fetch exercise by ID: " + err.message);
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
          workout: args.workoutId,
          exercise: args.exerciseId,
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
