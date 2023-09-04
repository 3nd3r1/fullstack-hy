import { isNumber } from "./utils";

const calculateBmi = (height: number, weight: number): string => {
	const bmi = weight / (height / 100) ** 2;

	if (bmi < 18.5) {
		return "Underweight";
	} else if (bmi >= 18.5 && bmi < 25) {
		return "Normal (healthy weight)";
	} else if (bmi >= 25 && bmi < 30) {
		return "Overweight";
	} else {
		return "Obese";
	}
};

if (process.argv.length < 4) throw new Error("Not enough arguments");

if (process.argv.length > 4) throw new Error("Too many arguments");

if (!isNumber(process.argv[2]) || !isNumber(process.argv[3]))
	throw new Error("Provided values were not numbers!");

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);
console.log(calculateBmi(height, weight));
