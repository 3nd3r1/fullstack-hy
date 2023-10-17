import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../lib/types";

const NewEntry = ({
	addDiaryEntry,
}: {
	addDiaryEntry: (entry: NewDiaryEntry) => void;
}) => {
	const [date, setDate] = useState<string>("");
	const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
	const [weather, setWeather] = useState<Weather>(Weather.Sunny);
	const [comment, setComment] = useState<string>("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newEntry: NewDiaryEntry = { date, visibility, weather, comment };
		addDiaryEntry(newEntry);
	};

	return (
		<div>
			<h1>Add new entry</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="date">Date</label>
					<input
						type="date"
						id="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>
				<div>
					<span>Visibility: </span>
					{Object.values(Visibility).map((v) => (
						<label htmlFor={v} key={v}>
							{v}
							<input
								type="radio"
								id={v}
								value={v}
								name="visibility"
								checked={visibility === v}
								onChange={(e) =>
									setVisibility(e.target.value as Visibility)
								}
							/>
						</label>
					))}
				</div>
				<div>
					<span>Weather: </span>
					{Object.values(Weather).map((w) => (
						<label htmlFor={w} key={w}>
							{w}
							<input
								type="radio"
								id={w}
								value={w}
								name="weather"
								checked={weather === w}
								onChange={(e) =>
									setWeather(e.target.value as Weather)
								}
							/>
						</label>
					))}
				</div>
				<div>
					<label htmlFor="comment">Comment</label>
					<input
						type="text"
						id="comment"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
				</div>
				<div>
					<input type="submit" value="Add" />
				</div>
			</form>
		</div>
	);
};

export default NewEntry;
