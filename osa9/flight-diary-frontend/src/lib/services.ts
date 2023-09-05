import axios from "axios";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";

const API_URL = "http://localhost:3001";

export const ping = async (): Promise<string> => {
	const res = await axios.get<string>(API_URL + "/ping");
	return res.data;
};

export const getDiaryEntries = async (): Promise<NonSensitiveDiaryEntry[]> => {
	const res = await axios.get<NonSensitiveDiaryEntry[]>(
		API_URL + "/api/diaries"
	);
	return res.data;
};

export const addDiaryEntry = async (
	newDiaryEntry: NewDiaryEntry
): Promise<NonSensitiveDiaryEntry> => {
	const res = await axios.post<NonSensitiveDiaryEntry>(
		API_URL + "/api/diaries",
		newDiaryEntry
	);

	return res.data;
};
