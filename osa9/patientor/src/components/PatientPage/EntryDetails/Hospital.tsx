import { List, ListItem, TableCell, TableRow, Tooltip } from "@mui/material";
import { Diagnose, HospitalEntry } from "../../../types";
import { LocalHospital } from "@mui/icons-material";

const HospitalEntryDetails = ({
	entry,
	diagnoses,
}: {
	entry: HospitalEntry;
	diagnoses: Diagnose[];
}) => {
	return (
		<TableRow>
			<TableCell>
				<Tooltip title="Hospital">
					<LocalHospital />
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
				<strong>Discharge: </strong>
				<span>
					{entry.discharge.date} - {entry.discharge.criteria}
				</span>
			</TableCell>
			<TableCell>{entry.specialist}</TableCell>
		</TableRow>
	);
};

export default HospitalEntryDetails;
