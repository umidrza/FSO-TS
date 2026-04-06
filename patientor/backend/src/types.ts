
export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type Entry = {
  id: string;
  date: string;
  type: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  description: string;
};

export type NewPatient = Omit<Patient, 'id'>;
export type NewEntry = Omit<Entry, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Patient, 'id' | 'entries'>;
export type NewEntryWithoutType = Omit<Entry, 'id' | 'type'>;
export type EntryWithoutType = Omit<Entry, 'id'>;
export type HealthCheckRating = 0 | 1 | 2 | 3;
export type Gender = 'male' | 'female' | 'other';
