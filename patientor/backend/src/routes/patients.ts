import patientService from "../services/patientService.ts";
import express, { type Response, type Request } from "express";
import { errorMiddleware, newPatientParser } from "../middleware.ts";
import type { NewPatient, Patient } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = patientService.getNonSensitivePatients();
  res.send(data);
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatientById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: "Patient not found" });
  }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {  
  const addedPatient = patientService.addPatient(req.body);  
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;