import React, { useEffect, useState } from "react";
import { getCountries, getCityWeather } from "./services";
import "./global.css";

const CountrySearch = ({ searchHandler, searchName }) => (
	<div>
		<form onSubmit={(event) => event.preventDefault()}>
			<label htmlFor="search-country">
				find countries
				<input
					id="search-country"
					style={{ marginLeft: "15px" }}
					type="text"
					value={searchName}
					onChange={searchHandler}
				/>
			</label>
		</form>
	</div>
);

const CountryInfo = ({ country, weather }) => {
	return (
		<table
			className={`country-info ${
				country == null ? "" : "country-info-show"
			}`}
		>
			<tbody>
				{country == null ? (
					<></>
				) : (
					<>
						<tr>
							<th style={{ textAlign: "center" }}>
								<h2
									style={{
										fontSize: "50px",
									}}
								>
									{country.name.common}
								</h2>
							</th>
							<th>
								<img
									alt={`Flag of ${country.name.common}`}
									src={country.flags.png}
									width="200px"
								/>
							</th>
						</tr>
						<tr>
							<td>
								<h3>Capital</h3>
							</td>
							<td>
								<h4>{country.capital[0]}</h4>
							</td>
						</tr>
						<tr>
							<td>
								<h3>Area</h3>
							</td>
							<td>
								<h4>{country.area} km&sup2;</h4>
							</td>
						</tr>
						<tr>
							<td>
								<h3>Languages</h3>
							</td>
							<td>
								<h4>
									{Object.values(country.languages).join(
										", "
									)}
								</h4>
							</td>
						</tr>
						<tr>
							<td>
								<h3>Weather in {country.capital[0]}</h3>
							</td>
							<td>
								{weather == null ? (
									<p>Loading...</p>
								) : (
									<div className="weather-info">
										<div>
											<img
												alt={`Weather in ${country.capital[0]}`}
												src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
											/>
										</div>
										<div>
											<div>
												<p>
													<span>Temperature:</span>{" "}
													{weather.temp} Celcius
												</p>
												<p>
													<span>Wind:</span>{" "}
													{weather.wind} m/s
												</p>
											</div>
										</div>
									</div>
								)}
							</td>
						</tr>
					</>
				)}
			</tbody>
		</table>
	);
};

const CountriesTable = ({ countries, weather, selectHandler }) => {
	if (countries.length > 10) {
		return (
			<div>
				<h3>Too many matches, specify another filter</h3>
			</div>
		);
	} else if (countries.length === 0) {
		return (
			<div>
				<h3>No matches!</h3>
			</div>
		);
	} else if (countries.length === 1) {
		return <></>;
	}
	return (
		<table style={{ minWidth: "200px" }}>
			<tbody>
				{countries.map((country) => (
					<tr key={country.ccn3}>
						<td>
							<img
								alt={`Flag of ${country.name.common}`}
								width="30px"
								src={country.flags.png}
							/>
						</td>
						<td style={{ textAlign: "left", textIndent: "1rem" }}>
							{country.name.common}
						</td>
						<td>
							<button
								onClick={() =>
									selectHandler(
										country.name.common,
										country.ccn3
									)
								}
							>
								select
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

const App = () => {
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [search, setSearch] = useState({ name: "", ccn3: null });
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		getCountries()
			.then((response) => setCountries(response))
			.catch((error) => alert(error));
	}, []);

	useEffect(() => {
		if (search.ccn3 !== null) {
			setFilteredCountries(
				countries.filter((country) => country.ccn3 === search.ccn3)
			);
		} else {
			setFilteredCountries(
				countries.filter((country) =>
					country.name.common
						.toLowerCase()
						.includes(search.name.toLowerCase())
				)
			);
		}
	}, [search, countries]);

	useEffect(() => {
		if (filteredCountries.length === 1 && weather === null) {
			getCityWeather(filteredCountries[0].capital[0].toLowerCase()).then(
				(response) => {
					setWeather({
						icon: response.weather[0].icon,
						temp: response.main.temp,
						wind: response.wind.speed,
					});
				}
			);
		} else if (filteredCountries.length !== 1 && weather !== null) {
			setWeather(null);
		}
	}, [filteredCountries, weather]);

	return (
		<div style={{ margin: "auto", width: "50%", textAlign: "center" }}>
			<h1>Country Info</h1>
			<CountrySearch
				searchHandler={(evt) =>
					setSearch({ name: evt.target.value, ccn3: null })
				}
				searchName={search.name}
			/>
			<hr style={{ margin: "30px 5px " }}></hr>
			<CountriesTable
				countries={filteredCountries}
				selectHandler={(name, ccn3) =>
					setSearch({ name: name, ccn3: ccn3 })
				}
			/>
			<CountryInfo
				country={
					filteredCountries.length === 1 ? filteredCountries[0] : null
				}
				weather={weather}
			/>
		</div>
	);
};

export default App;
