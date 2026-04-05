import { isNotNumber } from "./util.ts";

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  target: number,
  exercises: number[],
): ExerciseResult => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((exercise) => exercise > 0).length;
  const totalHours = exercises.reduce((sum, exercise) => sum + exercise, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating;
  let ratingDescription;
  if (average >= target) {
    rating = 3;
    ratingDescription = "Excellent! You've met your target.";
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = "Not bad, but there's room for improvement.";
  } else {
    rating = 1;
    ratingDescription = "You need to work harder to meet your target.";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

interface Values {
  target: number;
  exercises: number[];
}

const parseArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const values = args.slice(2).map((arg) => {
    if (isNotNumber(arg)) {
      throw new Error("Provided values were not numbers!");
    }
    return Number(arg);
  });

  return {
    target: values[0],
    exercises: values.slice(1),
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, exercises } = parseArguments(process.argv);
    console.log(calculateExercises(target, exercises));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

// console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));
// npm run calculateExercises 2 3, 0, 2, 4.5, 0, 3, 1

export default calculateExercises;
