import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Patient } from "../../types";
import { getPatient } from "../../services/patients";

import { Typography, Card, CardContent, Box, Divider } from "@mui/material";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

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

  useEffect(() => {
    if (id) {
      getPatient(id).then((data) => setPatient(data));
    }
  }, [id]);

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
              <Typography variant="subtitle1">{entry.date}</Typography>

              <Typography variant="body1" sx={{ mb: 1 }}>
                {entry.description}
              </Typography>

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
