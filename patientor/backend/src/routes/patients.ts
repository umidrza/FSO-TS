import patientService from "../services/patientService.ts";
import express, { type Response, type Request } from "express";
import { errorMiddleware, newPatientParser } from "../middleware.ts";
import type { NewEntry, NewPatient, Patient } from "../types.ts";

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

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  },
);

router.post(
  "/:id/entries",
  (
    req: Request<{ id: string }, unknown, unknown>,
    res: Response<Patient | { error: string }>,
  ) => {
    const { id } = req.params;
    const newEntry = req.body as NewEntry;
    const updatedPatient = patientService.addEntry(id, newEntry);

    if (updatedPatient) {
      res.json(updatedPatient);
    } else {
      res.status(404).send({ error: "Patient not found" });
    }
  },
);

router.use(errorMiddleware);

export default router;
