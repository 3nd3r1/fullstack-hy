export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other",
}

export interface Diagnose {
	code: string;
	name: string;
	latin?: string;
}

export interface Entry {}

export interface Patient {
	id: string;
	name: string;
	ssn: string;
	occupation: string;
	gender: Gender;
	dateOfBirth: string;
	entries: Entry[];
}

export interface NewPatient {
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
