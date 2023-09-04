import { NewPatient, NonSensitivePatient, Patient } from "../types";

import patientData from "../data/patients";

import { v1 as uuid } from "uuid";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
	return patientData.map((patient) => ({
		id: patient.id,
		name: patient.name,
		dateOfBirth: patient.dateOfBirth,
		gender: patient.gender,
		occupation: patient.occupation,
	}));
};

const addPatient = (patient: NewPatient): Patient => {
	const newPatient = {
		id: uuid(),
		...patient,
	};

	patientData.push(newPatient);
	return newPatient;
};

export default {
	getNonSensitivePatients,
	addPatient,
};
