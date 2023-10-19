import { useState } from "react";

import {
	InputLabel,
	MenuItem,
	Select,
	Grid,
	Button,
	FormControl,
} from "@mui/material";
import { Diagnose, Entry, EntryFormValues } from "../../../../types";
import AddHospitalEntryForm from "./Hospital";
import AddOccupationalHealthcareEntryForm from "./OccupationalHealthcare";
import AddHealthCheckEntry from "./HealthCheck";
import { assertNever } from "../../../../utils";

interface Props {
	onCancel: () => void;
	onSubmit: (values: EntryFormValues) => void;
	diagnoses: Diagnose[];
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
	const [type, setType] = useState<Entry["type"]>("HealthCheck");

	const typeEntryForm = (type: Entry["type"]) => {
		switch (type) {
			case "Hospital":
				return (
					<AddHospitalEntryForm
						onSubmit={onSubmit}
						diagnoses={diagnoses}
					/>
				);
			case "OccupationalHealthcare":
				return (
					<AddOccupationalHealthcareEntryForm
						onSubmit={onSubmit}
						diagnoses={diagnoses}
					/>
				);
			case "HealthCheck":
				return (
					<AddHealthCheckEntry
						onSubmit={onSubmit}
						diagnoses={diagnoses}
					/>
				);
			default:
				assertNever(type);
		}
	};

	return (
		<div>
			<Grid>
				<FormControl fullWidth>
					<InputLabel id="entry-type-label">Entry type</InputLabel>
					<Select
						labelId="entry-type-label"
						fullWidth
						id="entry-type"
						value={type}
						label="Entry type"
						onChange={(e) => setType(e.target.value as typeof type)}
					>
						<MenuItem value={"HealthCheck"}>Health check</MenuItem>
						<MenuItem value={"Hospital"}>Hospital</MenuItem>
						<MenuItem value={"OccupationalHealthcare"}>
							Occupational healthcare
						</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			{typeEntryForm(type)}
			<Button
				color="secondary"
				variant="contained"
				style={{ float: "left" }}
				fullWidth
				type="button"
				onClick={onCancel}
			>
				Cancel
			</Button>
		</div>
	);
};

export default AddEntryForm;
