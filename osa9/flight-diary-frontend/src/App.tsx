import { useEffect, useState } from "react";
import {
	NewDiaryEntry,
	NonSensitiveDiaryEntry,
	Notification,
} from "./lib/types";
import { addDiaryEntry, getDiaryEntries, ping } from "./lib/services";

import Entries from "./components/entries";
import NewEntry from "./components/newEntry";
import NotificationDisplay from "./components/notificationDisplay";

const App = () => {
	const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
		[]
	);
	const [notification, setNotification] = useState<Notification | null>(null);
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

	useEffect(() => {
		if (notification) {
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	}, [notification]);

	const addEntry = (entry: NewDiaryEntry) => {
		addDiaryEntry(entry)
			.then((NewEntry) => {
				setDiaryEntries(diaryEntries.concat(NewEntry));
				setNotification({
					message: "Entry added successfully",
					type: "success",
				});
			})
			.catch((error) => {
				setNotification({
					message: error.response.data,
					type: "error",
				});
				console.log(error);
			});
	};

	if (failedPing) {
		return <strong>Server is not responding</strong>;
	}

	return (
		<div>
			{!!notification && (
				<NotificationDisplay notification={notification} />
			)}
			<NewEntry addDiaryEntry={addEntry} />
			<Entries diaryEntries={diaryEntries} />
		</div>
	);
};

export default App;
