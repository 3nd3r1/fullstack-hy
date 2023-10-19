import { BadInputError } from "./errors";
import {
	Diagnose,
	Gender,
	HealthCheckRating,
	NewEntry,
	NewPatient,
} from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== "object") {
		throw new BadInputError("Incorrect or missing data");
	}

	if (
		"name" in object &&
		"dateOfBirth" in object &&
		"ssn" in object &&
		"gender" in object &&
		"occupation" in object
	) {
		return {
			name: parseName(object.name),
			dateOfBirth: parseDateOfBirth(object.dateOfBirth),
			ssn: parseSsn(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
		};
	}

	throw new BadInputError("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): NewEntry => {
	if (!object || typeof object !== "object") {
		throw new BadInputError("Incorrect or missing data");
	}

	if ("type" in object) {
		switch (object.type) {
			case "Hospital":
				return parseHospitalEntry(object);
			case "OccupationalHealthcare":
				return parseOccupationalHealthcareEntry(object);
			case "HealthCheck":
				return parseHealthCheckEntry(object);
			default:
				throw new BadInputError("Incorrect entry: unknown type");
		}
	}

	throw new BadInputError("Incorrect data: some fields are missing");
};

export const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

export const isNumber = (number: unknown): number is number => {
	return typeof number === "number" || number instanceof Number;
};

export const isGender = (gender: string): gender is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(gender);
};

export const isHealthCheckRating = (
	healthCheckRating: number
): healthCheckRating is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseName = (name: unknown): string => {
	if (!isString(name)) {
		throw new BadInputError("Incorrect name: " + name);
	}

	return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
	if (!isString(dateOfBirth)) {
		throw new BadInputError("Incorrect dateOfBirth: " + dateOfBirth);
	}

	return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
	if (!isString(ssn)) {
		throw new BadInputError("Incorrect ssn: " + ssn);
	}

	return ssn;
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender)) {
		throw new BadInputError("Incorrect gender: " + gender);
	}

	return gender;
};

const parseOccupation = (occupation: unknown): string => {
	if (!isString(occupation)) {
		throw new BadInputError("Incorrect occupation: " + occupation);
	}

	return occupation;
};

const parseDate = (date: unknown): string => {
	if (!isString(date)) {
		throw new BadInputError("Incorrect date: " + date);
	}

	return date;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!isString(specialist)) {
		throw new BadInputError("Incorrect specialist: " + specialist);
	}
	return specialist;
};

const parseDescription = (description: unknown): string => {
	if (!isString(description)) {
		throw new BadInputError("Incorrect description: " + description);
	}
	return description;
};

const parseDiagnosisCodes = (
	diagnosisCodes: unknown
): Array<Diagnose["code"]> => {
	if (!Array.isArray(diagnosisCodes)) {
		throw new BadInputError("Incorrect diagnosisCodes: " + diagnosisCodes);
	}

	return diagnosisCodes.map((diagnosisCode) => {
		if (!isString(diagnosisCode)) {
			throw new BadInputError(
				"Incorrect diagnosisCode: " + diagnosisCode
			);
		}
		return diagnosisCode;
	});
};

const parseCriteria = (description: unknown): string => {
	if (!isString(description)) {
		throw new BadInputError("Incorrect criteria: " + description);
	}
	return description;
};

const parseDischarge = (
	discharge: unknown
): { date: string; criteria: string } => {
	if (!discharge || typeof discharge !== "object") {
		throw new BadInputError("Incorrect discharge: " + discharge);
	}

	if ("date" in discharge && "criteria" in discharge) {
		return {
			date: parseDate(discharge.date),
			criteria: parseCriteria(discharge.criteria),
		};
	}

	throw new BadInputError("Incorrect discharge: some fields are missing");
};

const parseEmployerName = (employerName: unknown): string => {
	if (!isString(employerName)) {
		throw new BadInputError("Incorrect employerName: " + employerName);
	}

	return employerName;
};

const parseSickLeave = (
	sickLeave: unknown
): { startDate: string; endDate: string } => {
	if (!sickLeave || typeof sickLeave !== "object") {
		throw new BadInputError("Incorrect sickLeave: " + sickLeave);
	}

	if ("startDate" in sickLeave && "endDate" in sickLeave) {
		return {
			startDate: parseDate(sickLeave.startDate),
			endDate: parseDate(sickLeave.endDate),
		};
	}

	throw new BadInputError("Incorrect sickLeave: some fields are missing");
};

const parseHealthCheckRating = (
	healthCheckRating: unknown
): HealthCheckRating => {
	if (
		!isNumber(healthCheckRating) ||
		!isHealthCheckRating(healthCheckRating)
	) {
		throw new BadInputError(
			"Incorrect healthCheckRating: " + healthCheckRating
		);
	}

	return healthCheckRating;
};

const parseHospitalEntry = (entry: unknown): NewEntry => {
	if (!entry || typeof entry !== "object") {
		throw new BadInputError("Incorrect entry: " + entry);
	}

	if (
		"date" in entry &&
		"specialist" in entry &&
		"description" in entry &&
		"type" in entry &&
		"discharge" in entry
	) {
		return {
			type: "Hospital",
			date: parseDate(entry.date),
			specialist: parseSpecialist(entry.specialist),
			description: parseDescription(entry.description),
			discharge: parseDischarge(entry.discharge),
			diagnosisCodes:
				"diagnosisCodes" in entry
					? parseDiagnosisCodes(entry.diagnosisCodes)
					: [],
		};
	}

	throw new BadInputError("Incorrect entry: some fields are missing");
};

const parseOccupationalHealthcareEntry = (entry: unknown): NewEntry => {
	if (!entry || typeof entry !== "object") {
		throw new BadInputError("Incorrect entry: " + entry);
	}

	if (
		"date" in entry &&
		"specialist" in entry &&
		"description" in entry &&
		"employerName" in entry
	) {
		return {
			type: "OccupationalHealthcare",
			date: parseDate(entry.date),
			specialist: parseSpecialist(entry.specialist),
			description: parseDescription(entry.description),
			diagnosisCodes:
				"diagnosisCodes" in entry
					? parseDiagnosisCodes(entry.diagnosisCodes)
					: [],
			employerName: parseEmployerName(entry.employerName),
			...("sickLeave" in entry && {
				sickLeave: parseSickLeave(entry.sickLeave),
			}),
		};
	}

	throw new BadInputError("Incorrect entry: some fields are missing");
};

const parseHealthCheckEntry = (entry: unknown): NewEntry => {
	if (!entry || typeof entry !== "object") {
		throw new BadInputError("Incorrect entry: " + entry);
	}

	if (
		"date" in entry &&
		"specialist" in entry &&
		"description" in entry &&
		"healthCheckRating" in entry
	) {
		return {
			type: "HealthCheck",
			date: parseDate(entry.date),
			specialist: parseSpecialist(entry.specialist),
			description: parseDescription(entry.description),
			diagnosisCodes:
				"diagnosisCodes" in entry
					? parseDiagnosisCodes(entry.diagnosisCodes)
					: [],
			healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
		};
	}

	throw new BadInputError("Incorrect entry: some fields are missing");
};
