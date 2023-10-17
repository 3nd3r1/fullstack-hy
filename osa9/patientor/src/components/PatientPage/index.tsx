import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
	Grid,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from "@mui/material";
import { Female, Male } from "@mui/icons-material";

import { Patient, Gender } from "../../types";
import patientService from "../../services/patients";
import HealthRatingBar from "../HealthRatingBar";

const PatientPage = () => {
	const { id } = useParams<{ id: string }>();
	const [patient, setPatient] = useState<Patient | undefined>();

	useEffect(() => {
		if (!id) return;
		patientService
			.getPatient(id)
			.then((patient) => setPatient(patient))
			.catch((error) => {
				console.log(error);
			});
	}, [id]);

	if (!patient) return <div>Patient not found</div>;
	return (
		<Grid
			container
			rowSpacing={2}
			marginY={5}
			sx={{ flexGrow: 1 }}
			boxShadow={2}
			padding={4}
		>
			<Grid xs={4} display="flex" alignItems="center">
				<Typography variant="h4">{patient.name}</Typography>
				{patient.gender === Gender.Female ? (
					<Female fontSize="large" />
				) : (
					<Male fontSize="large" />
				)}
			</Grid>
			<Grid xs>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Date of birth</TableCell>
							<TableCell>{patient.dateOfBirth}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>SSN</TableCell>
							<TableCell>{patient.ssn}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Occupation</TableCell>
							<TableCell>{patient.occupation}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Health rating</TableCell>
							<TableCell>
								<HealthRatingBar rating={1} showText={true} />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Grid>
		</Grid>
	);
};

export default PatientPage;
