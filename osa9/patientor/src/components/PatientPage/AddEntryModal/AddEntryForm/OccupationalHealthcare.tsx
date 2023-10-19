import { useState } from "react";
import { Diagnose, EntryFormValues } from "../../../../types";
import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

interface Props {
	onSubmit: (values: EntryFormValues) => void;
	diagnoses: Diagnose[];
}

const AddOccupationalHealthcareEntryForm = ({ onSubmit, diagnoses }: Props) => {
	const [date, setDate] = useState<Dayjs | null>(null);
	const [specialist, setSpecialist] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [diagnosisCodes, setDiagnosisCodes] = useState<
		Array<Diagnose["code"]>
	>([]);

	const [employerName, setEmployerName] = useState<string>("");
	const [sickLeaveEnabled, setSickLeaveEnabled] = useState<boolean>(false);
	const [sickLeave, setSickLeave] = useState<{
		startDate: Dayjs | null;
		endDate: Dayjs | null;
	}>({ startDate: null, endDate: null });

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!date) return;

		onSubmit({
			type: "OccupationalHealthcare",
			date: date.format("YYYY-MM-DD"),
			specialist: specialist,
			description: description,
			diagnosisCodes: diagnosisCodes,
			employerName: employerName,
			...(sickLeaveEnabled &&
				sickLeave.startDate &&
				sickLeave.endDate && {
					sickLeave: {
						startDate: sickLeave.startDate.format("YYYY-MM-DD"),
						endDate: sickLeave.endDate.format("YYYY-MM-DD"),
					},
				}),
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
				/>
				<TextField
					required
					label="Specialist"
					variant="outlined"
					fullWidth
					value={specialist}
					onChange={(e) => setSpecialist(e.target.value)}
				/>
				<TextField
					required
					label="Description"
					variant="outlined"
					fullWidth
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
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
				<TextField
					required
					label="Employer name"
					variant="outlined"
					fullWidth
					value={employerName}
					onChange={(e) => setEmployerName(e.target.value)}
				/>
				<Grid gap={1}>
					<Grid>
						<FormControlLabel
							control={
								<Checkbox
									checked={sickLeaveEnabled}
									onChange={(e) =>
										setSickLeaveEnabled(e.target.checked)
									}
								/>
							}
							label="Sick leave"
						/>
					</Grid>
					{sickLeaveEnabled && (
						<Grid justifyContent="space-between" display="flex">
							<DatePicker
								label="Start date"
								value={sickLeave.startDate}
								onChange={(date) =>
									setSickLeave({
										...sickLeave,
										startDate: date,
									})
								}
							/>
							<DatePicker
								label="End date"
								value={sickLeave.endDate}
								onChange={(date) =>
									setSickLeave({
										...sickLeave,
										endDate: date,
									})
								}
							/>
						</Grid>
					)}
				</Grid>
				<Button type="submit" variant="contained" color="primary">
					Add
				</Button>
			</Stack>
		</form>
	);
};

export default AddOccupationalHealthcareEntryForm;
