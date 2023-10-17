import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";
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

router.post("/", (req, res, next) => {
	try {
		const newPatient = toNewPatient(req.body);
		const addedPatient = patientService.addPatient(newPatient);
		res.json(addedPatient);
	} catch (error: unknown) {
		next(error);
	}
});

export default router;
