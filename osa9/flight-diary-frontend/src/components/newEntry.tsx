import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../lib/types";
import { addDiaryEntry } from "../lib/services";

const NewEntry = ({ setDiaryEntries }: { setDiaryEntries: ReactD }) => {
	const [date, setDate] = useState<string>("");
	const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
	const [weather, setWeather] = useState<Weather>(Weather.Sunny);
	const [comment, setComment] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newEntry: NewDiaryEntry = { date, visibility, weather, comment };

		try {
			const addedEntry = await addDiaryEntry(newEntry);
		} catch (error) {
			console.log(error);
		}
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
					<label htmlFor="visibility">Visibility</label>
					<select
						id="visibility"
						value={visibility}
						onChange={(e) =>
							setVisibility(
								Visibility[
									e.target.value as keyof typeof Visibility
								]
							)
						}
					>
						{Object.values(Visibility).map((v) => (
							<option key={v}>{v}</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="weather">Weather</label>
					<select
						id="weather"
						value={weather}
						onChange={(e) =>
							setWeather(
								Weather[e.target.value as keyof typeof Weather]
							)
						}
					>
						{Object.values(Weather).map((v) => (
							<option key={v} value={v}>
								{v}
							</option>
						))}
					</select>
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
