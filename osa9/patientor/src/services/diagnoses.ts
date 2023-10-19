import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Diagnose } from "../types";

const getAll = async () => {
	const { data } = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`);
	return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getAll,
};
