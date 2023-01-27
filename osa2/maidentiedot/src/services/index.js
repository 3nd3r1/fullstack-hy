import axios from "axios";

export const getCountries = () => {
	const req = axios.get("https://restcountries.com/v3.1/all");
	return req.then((response) => response.data);
};

export const getCityWeather = (city) => {
	const apiKey = process.env.REACT_APP_API_KEY;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	const req = axios.get(url);
	return req.then((response) => response.data);
};
