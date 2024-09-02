import Markdown from "react-markdown";
import dayjs from "dayjs";
import {
  Box,
  Container,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useGetConcept } from "../../hooks";
import rehypeRaw from "rehype-raw";

export const ConceptDetails = () => {
  const { id } = useParams();
  const { data: concept, isLoading } = useGetConcept({ conceptId: id + "" });
  const conceptData = concept?.data.data[0];

  if (isLoading)
    return (
      <Container
        sx={{
          alignItems: "center",
          display: "flex",
          height: "200px",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <CircularProgress />
      </Container>
    );

  if (!concept?.data.data.length)
    return (
      <Container
        sx={{
          mt: 3,
        }}
      >
        <Button component={Link} to="/" sx={{ mb: 3 }}>
          Volver
        </Button>

        <Typography sx={{ textAlign: "center" }}>No encontrado</Typography>
      </Container>
    );

  return (
    <Container sx={{ mt: 3 }}>
      <Button component={Link} to="/" sx={{ mb: 3 }}>
        Volver
      </Button>

      <Typography component="h1" fontSize="25px">
        {conceptData?.attributes.name}
      </Typography>

      <Typography>
        <Typography component="span">Creado por: </Typography>
        {conceptData?.attributes.authors.data[0]?.attributes.firstName ??
          "Desconocido"}
      </Typography>

      <Typography>
        <Typography component="span">Fecha de creación: </Typography>
        {dayjs(conceptData?.attributes.createdAt).format(
          "dddd D MMM YYYY HH:mm"
        )}
      </Typography>

      <Typography>
        <Typography component="span">
          Fecha de última actualización:{" "}
        </Typography>
        {dayjs(conceptData?.attributes.updatedAt).format(
          "dddd D MMM YYYY HH:mm"
        )}
      </Typography>

      <Box
        component="div"
        sx={{
          maxWidth: "900px",
          "& img": { maxWidth: "100%" },
        }}
      >
        <Markdown rehypePlugins={[rehypeRaw]}>
          {conceptData?.attributes.content}
        </Markdown>
      </Box>
    </Container>
  );
};
