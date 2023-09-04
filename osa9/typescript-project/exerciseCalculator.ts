interface CalculationsResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercises = (
	dailyExercise: number[],
	target: number
): CalculationsResult => {
	const periodLength: number = dailyExercise.length;
	const trainingDays: number = dailyExercise.filter(
		(day) => day !== 0
	).length;
	const average: number =
		dailyExercise.reduce((sum, cur) => sum + cur) / periodLength;
	const success: boolean = average >= target;
	const rating: number = Math.min(3, 1 + (average / target) * 2);

	let ratingDescription: string;
	if (rating < 1.5) {
		ratingDescription = "bad";
	} else if (1.5 <= rating && rating < 2) {
		ratingDescription = "bad but could be worse";
	} else if (2 <= rating && rating < 2.5) {
		ratingDescription = "not too bad but could be better";
	} else if (2.5 <= rating && rating < 3) {
		ratingDescription = "good";
	} else {
		ratingDescription = "excellent";
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

export default calculateExercises;
