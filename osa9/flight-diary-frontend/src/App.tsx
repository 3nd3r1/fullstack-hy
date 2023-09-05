import { useEffect, useState } from "react";
import { NonSensitiveDiaryEntry } from "./lib/types";
import { getDiaryEntries, ping } from "./lib/services";
import Entries from "./components/entries";
import NewEntry from "./components/newEntry";

const App = () => {
	const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
		[]
	);

	const [failedPing, setFailedPing] = useState<boolean>(false);

	useEffect(() => {
		ping()
			.then(() => {
				getDiaryEntries().then((data) => setDiaryEntries(data));
			})
			.catch((error) => {
				console.log(error);
				setFailedPing(true);
			});
	}, []);

	if (failedPing) {
		return <strong>Server is not responding</strong>;
	}

	return (
		<div>
			<NewEntry />
			<Entries diaryEntries={diaryEntries} />
		</div>
	);
};

export default App;
