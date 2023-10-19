import {
	Entry,
	NewEntry,
	NewPatient,
	NonSensitivePatient,
	Patient,
} from "../types";

import patientData from "../data/patients";

import { v1 as uuid } from "uuid";
import { NotFoundError } from "../errors";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
	return patientData.map((patient) => ({
		id: patient.id,
		name: patient.name,
		dateOfBirth: patient.dateOfBirth,
		gender: patient.gender,
		occupation: patient.occupation,
	}));
};

const getPatient = (id: string): Patient | undefined => {
	return patientData.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
	const newPatient = {
		id: uuid(),
		entries: [],
		...patient,
	};

	patientData.push(newPatient);
	return newPatient;
};

const addEntry = (entry: NewEntry, patient_id: string): Entry => {
	const newEntry = {
		id: uuid(),
		...entry,
	};

	const patient = patientData.find((patient) => patient.id === patient_id);
	if (!patient)
		throw new NotFoundError(`Patient with id: ${patient_id} not found`);
	patient.entries.push(newEntry);

	return newEntry;
};

export default {
	getNonSensitivePatients,
	getPatient,
	addPatient,
	addEntry,
};
