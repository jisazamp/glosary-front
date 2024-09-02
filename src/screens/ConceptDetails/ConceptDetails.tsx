import dayjs from "dayjs";
import { Container, Typography } from "@mui/material";
import { useGetConcept } from "../../hooks";
import { useParams } from "react-router-dom";

export const ConceptDetails = () => {
  const { id } = useParams();
  const { data: concept } = useGetConcept({ conceptId: id + "" });

  return (
    <Container sx={{ mt: 3 }}>
      <Typography>{concept?.data.data[0].attributes.name}</Typography>
      <Typography>
        Creado en:{" "}
        {dayjs(concept?.data.data[0].attributes.createdAt).format(
          "DD-MM-YYYY HH:mm"
        )}
      </Typography>
    </Container>
  );
};
