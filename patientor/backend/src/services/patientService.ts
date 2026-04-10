import type { NewEntry, NewPatient, NonSensitivePatient, Patient } from "../types.ts";
import patients from "../../data/patients.ts";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    }),
  );
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    entries: [],
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (
  id: string,
  newEntry: NewEntry,
): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);

  if (patient) {
    const entry = {
      ...newEntry,
      id: uuid(),
    };
    patient.entries?.push(entry);
  }

  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatientById,
  addPatient,
  addEntry,
};
