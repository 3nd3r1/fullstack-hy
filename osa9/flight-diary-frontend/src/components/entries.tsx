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
					<div key={diaryEntry.id} style={{ marginBottom: 20 }}>
						<strong>{diaryEntry.date}</strong>
						<div>
							<p style={{ margin: 0 }}>
								visibility: {diaryEntry.visibility}
							</p>
							<p style={{ margin: 0 }}>
								weather: {diaryEntry.weather}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Entries;
