import { useEffect, useState } from "react";
import { getPersons, addPerson, updatePerson, deletePerson } from "./services";

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

const Persons = ({ persons, handleDelete }) => (
	<table>
		<tbody>
			{persons.map((person) => (
				<tr key={person.name}>
					<td>{person.name}</td>
					<td>{person.number}</td>
					<td>
						<button onClick={() => handleDelete(person.id)}>
							Delete
						</button>
					</td>
				</tr>
			))}
		</tbody>
	</table>
);

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newPerson, setNewPerson] = useState({ name: "", number: "" });
	const [search, setSearch] = useState("");

	useEffect(() => {
		getPersons().then((data) => setPersons(data));
	}, []);

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
			if (
				window.confirm(
					`${newPerson.name} is already in use, replace the old number with the new one?`
				)
			) {
				const id = persons.find(
					(person) => person.name === newPerson.name
				).id;
				updatePerson(id, newPerson)
					.then((data) =>
						setPersons(
							persons.map((person) =>
								person.id === id ? data : person
							)
						)
					)
					.catch((error) => {
						alert(`Couldn't update person with id ${id}`);
						setPersons(
							persons.filter((person) => person.id !== id)
						);
					});
			}
		} else {
			addPerson(newPerson).then((data) =>
				setPersons(persons.concat(data))
			);
		}
	};

	const searchHandleChange = (event) => {
		setSearch(event.target.value);
	};

	const handleDelete = (id) => {
		deletePerson(id)
			.then(() =>
				setPersons(persons.filter((person) => person.id !== id))
			)
			.catch((error) => {
				alert(`Couldn't delete person with id ${id}`);
			});
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
				handleDelete={handleDelete}
			/>
		</div>
	);
};

export default App;
