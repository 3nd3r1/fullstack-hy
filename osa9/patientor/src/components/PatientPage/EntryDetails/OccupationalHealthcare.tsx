import { List, ListItem, TableCell, TableRow, Tooltip } from "@mui/material";
import { Diagnose, OccupationalHealthcareEntry } from "../../../types";
import { Work } from "@mui/icons-material";

const OccupationalHealthcareEntryDetails = ({
	entry,
	diagnoses,
}: {
	entry: OccupationalHealthcareEntry;
	diagnoses: Diagnose[];
}) => {
	return (
		<TableRow>
			<TableCell>
				<Tooltip title="Occupational healthcare">
					<Work />
				</Tooltip>
			</TableCell>
			<TableCell>{entry.date}</TableCell>
			<TableCell>{entry.description}</TableCell>
			<TableCell>
				{entry.diagnosisCodes.length === 0 ? (
					"None"
				) : (
					<List>
						{entry.diagnosisCodes.map((v) => (
							<ListItem key={v}>
								{v +
									" - " +
									diagnoses?.find((d) => d.code === v)?.name}
							</ListItem>
						))}
					</List>
				)}
			</TableCell>
			<TableCell>
				<List>
					<ListItem>
						<strong>Employer: </strong>
						<span>{entry.employerName}</span>
					</ListItem>
					<ListItem>
						<strong>Sickleave: </strong>
						<span>
							{entry.sickLeave
								? entry.sickLeave.startDate +
								  " - " +
								  entry.sickLeave.endDate
								: "No sickleave"}
						</span>
					</ListItem>
				</List>
			</TableCell>
			<TableCell>{entry.specialist}</TableCell>
		</TableRow>
	);
};

export default OccupationalHealthcareEntryDetails;
