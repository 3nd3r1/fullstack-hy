import { useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Divider,
	Alert,
	Button,
} from "@mui/material";

import { Diagnose, EntryFormValues, Patient } from "../../../types";

import AddEntryForm from "./AddEntryForm";

import patientService from "../../../services/patients";

const AddEntryModal = ({
	patient,
	setPatient,
	diagnoses,
}: {
	patient: Patient;
	setPatient: (patient: Patient) => void;
	diagnoses: Diagnose[];
}) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const onSubmit = (values: EntryFormValues) => {
		patientService
			.createEntry(patient.id, values)
			.then((entry) => {
				setModalOpen(false);
				setPatient({
					...patient,
					entries: patient.entries.concat(entry),
				});
			})
			.catch((error) => {
				console.log(error);
				setError(error.response.data);
			});
	};

	if (!modalOpen)
		return (
			<Button variant="contained" onClick={() => setModalOpen(true)}>
				Add Entry
			</Button>
		);

	return (
		<Dialog
			fullWidth={true}
			open={modalOpen}
			onClose={() => setModalOpen(false)}
		>
			<DialogTitle>Add a new entry</DialogTitle>
			<Divider />
			<DialogContent>
				{error && <Alert severity="error">{error}</Alert>}
				<AddEntryForm
					onSubmit={onSubmit}
					onCancel={() => setModalOpen(false)}
					diagnoses={diagnoses}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default AddEntryModal;
