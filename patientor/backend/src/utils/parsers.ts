import type { NewPatient } from '../types.ts';
import { Gender } from '../types.ts';

/**
 * -------------------------
 * Type Guards
 * -------------------------
 */

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: unknown): param is Gender => {
  return Object.values(Gender)
    .map(g => g.toString())
    .includes(param as string);
};

/**
 * -------------------------
 * Parse Functions
 * -------------------------
 */

const parseString = (field: unknown, fieldName: string): string => {
  if (!field || !isString(field)) {
    throw new Error(`Invalid or missing ${fieldName}`);
  }
  return field;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Invalid or missing dateOfBirth: ${date}`);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  return parseString(ssn, 'ssn');
};

const parseGender = (gender: unknown): Gender => {
  if (!isGender(gender)) {
    throw new Error(`Invalid or missing gender: ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  return parseString(occupation, 'occupation');
};

/**
 * -------------------------
 * Main Builder
 * -------------------------
 */

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing data');
  }

  const data = object as Fields;

  const newPatient: NewPatient = {
    name: parseString(data.name, 'name'),
    dateOfBirth: parseDateOfBirth(data.dateOfBirth),
    ssn: parseSsn(data.ssn),
    gender: parseGender(data.gender),
    occupation: parseOccupation(data.occupation),
  };

  return newPatient;
};