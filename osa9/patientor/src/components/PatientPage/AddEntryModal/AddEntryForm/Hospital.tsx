import { useState } from "react";
import { Diagnose, EntryFormValues } from "../../../../types";
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

interface Props {
	onSubmit: (values: EntryFormValues) => void;
	diagnoses: Diagnose[];
}

const AddHospitalEntryForm = ({ onSubmit, diagnoses }: Props) => {
	const [date, setDate] = useState<Dayjs | null>(null);
	const [specialist, setSpecialist] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [diagnosisCodes, setDiagnosisCodes] = useState<
		Array<Diagnose["code"]>
	>([]);
	const [discharge, setDischarge] = useState<{
		date: Dayjs | null;
		criteria: string;
	}>({ date: null, criteria: "" });

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!date || !discharge.date) return;
		onSubmit({
			type: "Hospital",
			date: date.format("YYYY-MM-DD"),
			specialist: specialist,
			description: description,
			diagnosisCodes: diagnosisCodes,
			discharge: { ...discharge, date: date.format("YYYY-MM-DD") },
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack gap={2} paddingY={2}>
				<DatePicker
					label="Date"
					value={date}
					onChange={(date) => setDate(date)}
					sx={{ width: "100%" }}
					slotProps={{
						textField: {
							required: true,
						},
					}}
				></DatePicker>
				<TextField
					required
					label="Specialist"
					variant="outlined"
					fullWidth
					value={specialist}
					onChange={(e) => setSpecialist(e.target.value)}
				></TextField>
				<TextField
					required
					label="Description"
					variant="outlined"
					fullWidth
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></TextField>
				<FormControl fullWidth>
					<InputLabel id="diagnosis-codes-label">
						Diagnosis codes
					</InputLabel>
					<Select
						labelId="diagnosis-codes-label"
						id="diagnosis-codes"
						multiple
						value={diagnosisCodes}
						input={<OutlinedInput label="Diagnosis codes" />}
						onChange={({ target: { value } }) =>
							setDiagnosisCodes(
								typeof value === "string"
									? value.split(",")
									: value
							)
						}
					>
						{diagnoses.map((diagnose) => (
							<MenuItem key={diagnose.code} value={diagnose.code}>
								{diagnose.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Stack gap={1}>
					<Typography variant="subtitle1">Discharge</Typography>
					<DatePicker
						label="Date"
						value={discharge.date}
						onChange={(date) =>
							setDischarge({ ...discharge, date })
						}
						sx={{ width: "100%" }}
						slotProps={{
							textField: {
								required: true,
							},
						}}
					></DatePicker>
					<TextField
						required
						label="Criteria"
						fullWidth
						value={discharge.criteria}
						onChange={(e) =>
							setDischarge({
								...discharge,
								criteria: e.target.value,
							})
						}
					></TextField>
				</Stack>
				<Button type="submit" variant="contained" color="primary">
					Add
				</Button>
			</Stack>
		</form>
	);
};

export default AddHospitalEntryForm;
