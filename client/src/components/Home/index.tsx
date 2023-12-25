import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

const Home = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: 'url("/hero.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
          marginBottom: "2em",
        }}
      ></div>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3" component="div" sx={{ mb: 2 }}>
          Welcome to Patientor
        </Typography>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.{" "}
        </Typography>
      </Container>
    </div>
  );
};

export default Home;
