import { useEffect, useState } from "react";
import { getPersons, addPerson, updatePerson, deletePerson } from "./services";

const Notification = ({ notification }) => {
	return (
		<div
			className={
				"notification " +
				(notification.type === null ? "hidden" : notification.type)
			}
		>
			{notification.message}
		</div>
	);
};

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
						<button
							onClick={() => {
								if (
									window.confirm(
										`Are you sure you want to delete ${person.name}?`
									)
								) {
									handleDelete(person.id);
								}
							}}
						>
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
	const [notification, setNotification] = useState({
		type: null,
		message: null,
	});

	useEffect(() => {
		getPersons().then((data) => setPersons(data));
	}, []);

	const alertMessage = (type, message) => {
		setNotification({ type: type, message: message });
		setTimeout(() => setNotification({ type: null, message: null }), 5000);
	};

	const newPersonHandleChange = (event) => {
		if (event.target.name === "name") {
			setNewPerson({ ...newPerson, name: event.target.value });
		} else {
			setNewPerson({ ...newPerson, number: event.target.value });
		}
	};

	const newPersonHandleClick = (event) => {
		if (newPerson.name === "" || newPerson.number === "") {
			return;
		}
		event.preventDefault();

		//Jos emme tässä kohtaa hae käyttäjiä serveriltä on mahdollista, että saman niminen käyttäjä lisätään kahteen kertaan.
		getPersons().then((serverPersons) => {
			if (
				serverPersons.some((person) => person.name === newPerson.name)
			) {
				if (
					window.confirm(
						`${newPerson.name} is already in use, replace the old number with the new one?`
					)
				) {
					const id = serverPersons.find(
						(person) => person.name === newPerson.name
					).id;

					updatePerson(id, newPerson)
						.then((data) => {
							setPersons(
								serverPersons.map((person) =>
									person.id === id ? data : person
								)
							);
							alertMessage("success", `Updated ${data.name}`);
						})
						.catch((error) => {
							setPersons(serverPersons);
							alertMessage(
								"error",
								`${newPerson.name} couldn't be updated!`
							);
						});
				}
			}
			//Tämä on turha, mutta tehtävänannossa pyydetään ilmoittamaan tästä virheestä
			else if (persons.some((person) => person.name === newPerson.name)) {
				setPersons(serverPersons);
				alertMessage(
					"error",
					`${newPerson.name} has already been deleted from server!`
				);
			} else {
				addPerson(newPerson).then((data) => {
					setPersons(serverPersons.concat(data));
					alertMessage("success", `Added ${data.name}`);
				});
			}
		});
	};

	const searchHandleChange = (event) => {
		setSearch(event.target.value);
	};

	const handleDelete = (id) => {
		const deletedPerson = persons.find((person) => person.id === id);
		deletePerson(id)
			.then(() => {
				setPersons(persons.filter((person) => person.id !== id));
				alertMessage("success", `Deleted ${deletedPerson.name}`);
			})
			.catch((error) => {
				setPersons(persons.filter((person) => person.id !== id));
				alertMessage(
					"error",
					`${deletedPerson.name} has already been removed from server!`
				);
			});
	};

	return (
		<div style={{ margin: "auto", width: "50%", textAlign: "center" }}>
			<h2>Phonebook</h2>
			<Notification notification={notification} />
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
