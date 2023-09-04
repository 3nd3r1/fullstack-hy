import { NonSensitivePatient } from "../types";

import patientData from "../data/patients";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
	return patientData.map((patient) => ({
		id: patient.id,
		name: patient.name,
		dateOfBirth: patient.dateOfBirth,
		gender: patient.gender,
		occupation: patient.occupation,
	}));
};

export default {
	getNonSensitivePatients,
};
