import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils";
import { NotFoundError } from "../errors";

const router = express.Router();

router.get("/", (_req, res) => {
	res.json(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
	const patient = patientService.getPatient(req.params.id);
	if (patient) {
		res.json(patient);
	} else {
		throw new NotFoundError("Patient not found");
	}
});

router.post("/", (req, res) => {
	const newPatient = toNewPatient(req.body);
	const addedPatient = patientService.addPatient(newPatient);
	res.json(addedPatient);
});

router.post("/:id/entries", (req, res) => {
	const newEntry = toNewEntry(req.body);
	const addedEntry = patientService.addEntry(newEntry, req.params.id);
	res.json(addedEntry);
});

export default router;
