import { Container, CssBaseline } from "@mui/material";
import { Navbar } from "./components";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <Container disableGutters maxWidth={false}>
      <CssBaseline />
      <Navbar />
      <Outlet />
    </Container>
  );
};
