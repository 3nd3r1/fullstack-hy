import express from "express";
import calculateBmi from "./bmiCalculator";
import { isNumber } from "./utils";

const app = express();

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
	const height = req.query.height;
	const weight = req.query.weight;

	if (!height || !weight)
		return res.status(500).send({ error: "Missing height or weight" });
	if (!isNumber(height) || !isNumber(weight))
		return res
			.status(500)
			.send({ error: "Height and weight must be numbers" });

	const bmi = calculateBmi(Number(height), Number(weight));

	return res.send({
		weight: Number(weight),
		height: Number(height),
		bmi,
	});
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
