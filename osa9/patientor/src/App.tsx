import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { Diagnose, Patient } from "./types";

import patientService from "./services/patients";
import diagnoseService from "./services/diagnoses";
import { ping } from "./services/ping";

import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
	const [failedPing, setFailedPing] = useState<boolean>(false);
	const [patients, setPatients] = useState<Patient[]>([]);
	const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

	useEffect(() => {
		ping()
			.then(() => {
				setFailedPing(false);
				patientService
					.getAll()
					.then((patients) => setPatients(patients))
					.catch((error) => console.log(error));
				diagnoseService
					.getAll()
					.then((diagnoses) => setDiagnoses(diagnoses))
					.catch((error) => console.log(error));
			})
			.catch((error) => {
				console.log(error);
				setFailedPing(true);
			});
	}, []);

	return (
		<div className="App">
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Router>
					<Container>
						<Typography
							variant="h3"
							style={{ marginBottom: "0.5em" }}
						>
							Patientor
						</Typography>
						<Button
							component={Link}
							to="/"
							variant="contained"
							color="primary"
						>
							Home
						</Button>
						<Divider hidden />
						{failedPing ? (
							<Typography variant="h6">
								Server is not answering
							</Typography>
						) : (
							<Routes>
								<Route
									path="/"
									element={
										<PatientListPage
											patients={patients}
											setPatients={setPatients}
										/>
									}
								/>
								<Route
									path="/patients/:id"
									element={
										<PatientPage diagnoses={diagnoses} />
									}
								/>
							</Routes>
						)}
					</Container>
				</Router>
			</LocalizationProvider>
		</div>
	);
};

export default App;
