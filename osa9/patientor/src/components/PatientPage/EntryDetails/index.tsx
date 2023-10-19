import { Diagnose, Entry } from "../../../types";
import { assertNever } from "../../../utils";

import HealthCheckEntryDetails from "./HealthCheck";
import HospitalEntryDetails from "./Hospital";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcare";

const EntryDetails = ({
	entry,
	diagnoses,
}: {
	entry: Entry;
	diagnoses: Diagnose[];
}) => {
	switch (entry.type) {
		case "Hospital":
			return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
		case "OccupationalHealthcare":
			return (
				<OccupationalHealthcareEntryDetails
					entry={entry}
					diagnoses={diagnoses}
				/>
			);
		case "HealthCheck":
			return (
				<HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />
			);
		default:
			return assertNever(entry);
	}
};

export default EntryDetails;
