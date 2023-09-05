import { NonSensitiveDiaryEntry } from "../lib/types";

const Entries = ({
	diaryEntries,
}: {
	diaryEntries: NonSensitiveDiaryEntry[];
}) => {
	return (
		<div>
			<h1>Diary entries</h1>
			<div>
				{diaryEntries.map((diaryEntry) => (
					<div key={diaryEntry.id}>
						<strong>{diaryEntry.date}</strong>
						<div>
							<p>visibility: {diaryEntry.visibility}</p>
							<p>weather: {diaryEntry.weather}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Entries;
