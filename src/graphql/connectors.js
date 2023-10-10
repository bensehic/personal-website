import { Sequelize, DataTypes } from "sequelize";

// TODO: Create a cloud hosted RDS Postgres
// TODO: Figure out a way to get the credentials without hard coding and storing in Git
const sequelize = new Sequelize("bendev", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});

const Exercise = sequelize.define("exercise", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rep_lower_limit: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  rep_upper_limit: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn("NOW"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn("NOW"),
  },
}, {
  tableName: 'exercises'
});

const Workout = sequelize.define(
  "workout",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
  },
  {
    tableName: "workouts",
  }
);

const Set = sequelize.define("set", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  workoutId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "workouts",
      key: "id",
    },
  },
  exerciseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "exercises",
      key: "id",
    },
  },
  set_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.DECIMAL,
  },
  reps: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn("NOW"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn("NOW"),
  },
}, {
  tableName: 'sets'
});

Set.belongsTo(Workout);
Set.belongsTo(Exercise);

sequelize.sync();

export { Exercise, Workout, Set };
