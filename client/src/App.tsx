import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  Toolbar,
  AppBar,
  MenuItem,
  IconButton,
  Menu,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import the AccountCircleIcon

import { PatientEntry } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";
import Home from "./components/Home";

// import { PatientProvider } from './context/ PatientContext'

const App = () => {
  const [patients, setPatients] = useState<PatientEntry[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setLoggedIn(true);
    setUsername("DR. Smith"); 
    handleMenuClose()
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername(null);
    handleMenuClose(); 
  };

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Router>
        <div>
          <AppBar position="static" sx={{ margin: 0 }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                PATIENTOR
              </Typography>
              {loggedIn ? (
                <>
                  <Typography
                    variant="subtitle2"
                    sx={{ marginRight: 4 }}
                  >
                    Welcome {username} |
                  </Typography>
                  <Button
                    component={Link}
                    to="/"
                    color="inherit"
                    sx={{ mr: 2 }}
                  >
                    Home
                  </Button>
                  <Button
                    component={Link}
                    to="/patients"
                    color="inherit"
                    sx={{ mr: 2 }}
                  >
                    Patients
                  </Button>
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-controls="user-menu"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    sx={{ ml: 2 }}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/"
                    color="inherit"
                    sx={{ mr: 2 }}
                  >
                    Home
                  </Button>
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-controls="user-menu"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    sx={{ ml: 2 }}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleLogin}>Login</MenuItem>
                  </Menu>
                </>
              )}
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Container sx={{ mt: 4 }}>
            <Routes>
              <Route
                path="/patients"
                element={
                  <PatientListPage
                    patients={patients}
                    setPatients={setPatients}
                  />
                }
              />
              <Route
                path="/patients/:id"
                element={<PatientPage patients={patients} />}
              />
            </Routes>
          </Container>
        </div>
      </Router>
    </div>
  );
};

export default App;
