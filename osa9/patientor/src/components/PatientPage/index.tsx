import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
	Grid,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { Female, Male } from "@mui/icons-material";

import { Patient, Gender, Diagnose } from "../../types";
import patientService from "../../services/patients";

import HealthRatingBar from "../HealthRatingBar";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "./AddEntryModal";

const PatientPage = ({ diagnoses }: { diagnoses: Diagnose[] }) => {
	const { id } = useParams<{ id: string }>();
	const [patient, setPatient] = useState<Patient | undefined>();

	useEffect(() => {
		if (id) {
			patientService
				.getPatient(id)
				.then((patient) => setPatient(patient))
				.catch((error) => console.log(error));
		}
	}, [id]);

	if (!patient)
		return <Typography variant="h6">Patient not found</Typography>;
	return (
		<Grid container boxShadow={2} padding={4}>
			<Grid container rowSpacing={2} marginY={5} flexGrow={1}>
				<Grid
					item
					xs={12}
					display="flex"
					marginBottom={2}
					alignItems="center"
					justifyContent="center"
				>
					<Typography variant="h4">{patient.name}</Typography>
					{patient.gender === Gender.Female ? (
						<Female fontSize="large" />
					) : (
						<Male fontSize="large" />
					)}
				</Grid>
				<Grid item xs>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>
									<strong>Date of birth</strong>
								</TableCell>
								<TableCell>{patient.dateOfBirth}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<strong>SSN</strong>
								</TableCell>
								<TableCell>{patient.ssn}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<strong>Occupation</strong>
								</TableCell>
								<TableCell>{patient.occupation}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<strong>Health rating</strong>
								</TableCell>
								<TableCell>
									<HealthRatingBar
										rating={1}
										showText={true}
									/>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Grid>
			</Grid>
			<Grid container marginTop={4} marginBottom={4}>
				<Grid
					flexGrow={1}
					marginBottom={2}
					display="flex"
					justifyContent="center"
				>
					<Typography variant="h5" textAlign="center" flexGrow={1}>
						Entries
					</Typography>
					<AddEntryModal
						diagnoses={diagnoses}
						patient={patient}
						setPatient={setPatient}
					/>
				</Grid>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell width="5%">
								<strong>Type</strong>
							</TableCell>
							<TableCell width="10%">
								<strong>Date</strong>
							</TableCell>
							<TableCell width="25%">
								<strong>Description</strong>
							</TableCell>
							<TableCell width="25%">
								<strong>Diagnosis</strong>
							</TableCell>
							<TableCell width="25%">
								<strong>Comment</strong>
							</TableCell>
							<TableCell width="10%">
								<strong>Specialist</strong>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{patient.entries.map((entry) => (
							<EntryDetails
								entry={entry}
								diagnoses={diagnoses}
								key={entry.id}
							/>
						))}
					</TableBody>
				</Table>
			</Grid>
		</Grid>
	);
};

export default PatientPage;
