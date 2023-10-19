import axios from "axios";
import { apiBaseUrl } from "../constants";

export const ping = async () => {
	void axios.get<void>(`${apiBaseUrl}/ping`);
};
