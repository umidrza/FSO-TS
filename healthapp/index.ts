import express from 'express';
import calculateBmi from './bmiCalculator.ts';
import { isNotNumber } from './util.ts';
import calculateExercises from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  if (isNotNumber(height) || isNotNumber(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  const bmi = calculateBmi(heightNum, weightNum);

  return res.json({
    height: heightNum,
    weight: weightNum,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {target, daily_exercises} = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).json({
      error: "parameters missing"
    });
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((n) => isNotNumber(n)) ||
    isNotNumber(target)
  ) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  // Convert all to numbers
  const targetNum = Number(target);
  const hours: number[] = daily_exercises.map((n) => Number(n));

  const result = calculateExercises(targetNum, hours);

  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});