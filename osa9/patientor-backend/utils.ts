import { BadInputError } from "./errors";
import { Gender, NewPatient } from "./types";

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

export const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

export const isGender = (gender: string): gender is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(gender);
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
