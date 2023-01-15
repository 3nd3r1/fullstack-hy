import { useState } from "react";

const StatisticLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);
const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;
	if (all === 0) {
		return <p>No feedback given</p>;
	}

	const average = (good - bad) / all;
	const positive = (good / all) * 100 + " %";
	return (
		<>
			<h1>statistics</h1>
			<table>
				<tbody>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={all} />
					<StatisticLine text="average" value={average} />
					<StatisticLine text="positive" value={positive} />
				</tbody>
			</table>
		</>
	);
};

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<div>
				<h1>give feedback</h1>
				<div>
					<Button handleClick={() => setGood(good + 1)} text="good" />
					<Button
						handleClick={() => setNeutral(neutral + 1)}
						text="neutral"
					/>
					<Button handleClick={() => setBad(bad + 1)} text="bad" />
				</div>
			</div>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
