import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Diagnosis, Patient } from "../../types";
import patientsService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";

import { Typography, Card, CardContent, Box, Divider } from "@mui/material";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

const GenderIcon = ({ gender }: { gender: string }) => {
  switch (gender) {
    case "male":
      return <MaleIcon sx={{ ml: 1 }} />;
    case "female":
      return <FemaleIcon sx={{ ml: 1 }} />;
    default:
      return <TransgenderIcon sx={{ ml: 1 }} />;
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    if (id) {
      patientsService.getPatient(id).then((data) => setPatient(data));
    }
  }, [id]);

  useEffect(() => {
    diagnosesService.getAll().then((data) => setDiagnoses(data));
  }, []);

  if (!patient) return <div>Loading...</div>;

  return (
    <Box sx={{ maxWidth: 700, margin: "0 auto", mt: 4 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h4">{patient.name}</Typography>
        <GenderIcon gender={patient.gender} />
      </Box>

      <Typography>
        <strong>SSN:</strong> {patient.ssn}
      </Typography>
      <Typography>
        <strong>Date of Birth:</strong> {patient.dateOfBirth}
      </Typography>
      <Typography>
        <strong>Occupation:</strong> {patient.occupation}
      </Typography>

      <Typography variant="h5" gutterBottom>
        Entries
      </Typography>

      {!patient.entries || patient.entries.length === 0 ? (
        <Typography>No entries</Typography>
      ) : (
        patient.entries.map((entry) => (
          <Card key={entry.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1">
                {entry.date}
                {entry.type === "Hospital" && <MedicalServicesIcon sx={{ ml: 1 }} />}
                {entry.type === "OccupationalHealthcare" && <WorkIcon sx={{ ml: 1 }} />}
                {entry.type === "HealthCheck" && <FavoriteIcon sx={{ ml: 1 }} />}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1 }}>
                {entry.description}
              </Typography>

              {entry.diagnosisCodes && diagnoses && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">Diagnoses:</Typography>
                  <ul>
                    {entry.diagnosisCodes.map((code) => {
                      const diagnosis = diagnoses.find((d) => d.code === code);
                      return (
                        <li key={code}>
                          {code}{" "}
                          {diagnosis ? diagnosis.name : "Unknown diagnosis"}
                        </li>
                      );
                    })}
                  </ul>
                </Box>
              )}

              {entry.type === "HealthCheck" && (
                <Typography variant="body2" color="text.secondary">
                  Health Check Rating: {entry.healthCheckRating}
                </Typography>
              )}

              {entry.type === "OccupationalHealthcare" && entry.sickLeave && (
                <Typography variant="body2" color="text.secondary">
                  Sick Leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
                </Typography>
              )}

              {entry.type === "Hospital" && entry.discharge && (
                <Typography variant="body2" color="text.secondary">
                  Discharge: {entry.discharge.date} - {entry.discharge.criteria}
                </Typography>
              )}

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" color="text.secondary">
                Specialist: {entry.specialist}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default PatientPage;
