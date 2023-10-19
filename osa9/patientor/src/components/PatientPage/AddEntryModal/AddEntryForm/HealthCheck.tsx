import { useState } from "react";
import {
	Diagnose,
	EntryFormValues,
	HealthCheckRating,
} from "../../../../types";
import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Rating,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { Favorite } from "@mui/icons-material";

interface Props {
	onSubmit: (values: EntryFormValues) => void;
	diagnoses: Diagnose[];
}

const AddHealthCheckEntry = ({ onSubmit, diagnoses }: Props) => {
	const [date, setDate] = useState<Dayjs | null>(null);
	const [specialist, setSpecialist] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [diagnosisCodes, setDiagnosisCodes] = useState<
		Array<Diagnose["code"]>
	>([]);

	const [healthCheckRating, setHealthCheckRating] =
		useState<HealthCheckRating>(HealthCheckRating.CriticalRisk);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!date) return;
		onSubmit({
			type: "HealthCheck",
			date: date.format("YYYY-MM-DD"),
			specialist: specialist,
			description: description,
			diagnosisCodes: diagnosisCodes,
			healthCheckRating: healthCheckRating,
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
					slotProps={{ textField: { required: true } }}
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
				<Grid
					display="flex"
					alignItems="center"
					gap={1}
					padding={2}
					borderRadius={1}
					border={1}
					sx={{ borderColor: "grey.400" }}
				>
					<Typography variant="subtitle1">Health rating: </Typography>
					<Rating
						value={4 - healthCheckRating}
						onChange={(_e, rating) =>
							setHealthCheckRating(
								rating
									? 4 - rating
									: HealthCheckRating.CriticalRisk
							)
						}
						max={4}
						icon={<Favorite />}
						emptyIcon={<Favorite style={{ opacity: 0.35 }} />}
					></Rating>
				</Grid>
				<Button type="submit" variant="contained" color="primary">
					Add
				</Button>
			</Stack>
		</form>
	);
};

export default AddHealthCheckEntry;
