import {
	Grid,
	List,
	ListItem,
	TableCell,
	TableRow,
	Tooltip,
} from "@mui/material";
import { Diagnose, HealthCheckEntry } from "../../../types";
import { MedicalInformation } from "@mui/icons-material";
import HealthRatingBar from "../../HealthRatingBar";

const HealthCheckEntryDetails = ({
	entry,
	diagnoses,
}: {
	entry: HealthCheckEntry;
	diagnoses: Diagnose[];
}) => {
	return (
		<TableRow>
			<TableCell>
				<Tooltip title="Health check">
					<MedicalInformation />
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
						<Grid display="flex" alignItems="center" gap={1}>
							<strong>Health rating: </strong>
							<HealthRatingBar
								rating={entry.healthCheckRating}
								showText={false}
							/>
						</Grid>
					</ListItem>
				</List>
			</TableCell>
			<TableCell>{entry.specialist}</TableCell>
		</TableRow>
	);
};

export default HealthCheckEntryDetails;
