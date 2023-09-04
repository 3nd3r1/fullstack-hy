import express from "express";
import calculateBmi from "./bmiCalculator";
import { isNumber, isNumberArray } from "./utils";
import calculateExercises from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
	const height = req.query.height;
	const weight = req.query.weight;

	if (!height || !weight)
		return res.status(500).send({ error: "parameters missing" });
	if (!isNumber(height) || !isNumber(weight))
		return res.status(500).send({ error: "malformatted parameters" });

	const bmi = calculateBmi(Number(height), Number(weight));

	return res.send({
		weight: Number(weight),
		height: Number(height),
		bmi,
	});
});

app.post("/exercises", (req, res) => {
	//eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;

	if (!daily_exercises || !target)
		return res.status(500).send({ error: "parameters missing" });
	if (!isNumber(target) || !isNumberArray(daily_exercises))
		return res.status(500).send({ error: "malformatted parameters" });

	const result = calculateExercises(
		daily_exercises as number[],
		Number(target)
	);

	return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
