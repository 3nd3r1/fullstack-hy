import { useState } from "react";

const PersonSearch = ({ handleChange }) => (
	<form onChange={handleChange}>
		<div>
			Search: <input name="search" />
		</div>
	</form>
);

const PersonForm = ({ handleChange, handleClick }) => (
	<form onChange={handleChange}>
		<table>
			<tbody>
				<tr>
					<td>
						<input
							type="text"
							placeholder="Name"
							name="name"
							required
						/>
					</td>
				</tr>
				<tr>
					<td>
						<input
							type="tel"
							placeholder="Number"
							name="number"
							required
						/>
					</td>
				</tr>
				<tr>
					<td>
						<button
							style={{ width: "100%" }}
							type="submit"
							onClick={handleClick}
						>
							add
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</form>
);

const Persons = ({ persons }) => (
	<table>
		<tbody>
			{persons.map((person) => (
				<tr key={person.name}>
					<td>{person.name}</td>
					<td>{person.number}</td>
				</tr>
			))}
		</tbody>
	</table>
);

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newPerson, setNewPerson] = useState({ name: "", number: "" });
	const [search, setSearch] = useState("");

	const newPersonHandleChange = (event) => {
		if (event.target.name === "name") {
			setNewPerson({ ...newPerson, name: event.target.value });
			if (persons.some((person) => person.name === event.target.value)) {
				event.target.classList.add("error");
			} else if (event.target.classList.contains("error")) {
				event.target.classList.remove("error");
			}
		} else {
			setNewPerson({ ...newPerson, number: event.target.value });
		}
	};

	const newPersonHandleClick = (event) => {
		if (newPerson.name === "" || newPerson.number === "") {
			return;
		}
		event.preventDefault();
		if (persons.some((person) => person.name === newPerson.name)) {
			alert(`The name ${newPerson.name} is already in use!`);
		} else {
			setPersons(persons.concat(newPerson));
		}
	};

	const searchHandleChange = (event) => {
		setSearch(event.target.value);
	};

	return (
		<div style={{ margin: "auto", width: "50%", textAlign: "center" }}>
			<h2>Phonebook</h2>

			<PersonSearch handleChange={searchHandleChange} />

			<h3>New person</h3>

			<PersonForm
				handleChange={newPersonHandleChange}
				handleClick={newPersonHandleClick}
				newPerson={newPerson}
			/>

			<h3>Numbers</h3>
			<Persons
				persons={persons.filter((person) =>
					person.name.toLowerCase().includes(search.toLowerCase())
				)}
			/>
		</div>
	);
};

export default App;
