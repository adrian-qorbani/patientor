import { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
  Grid,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; 
import GitHubIcon from "@mui/icons-material/GitHub";

import { PatientEntry, Credentials } from "./types";

import patientService from "./services/patients";
import userService from "./services/login";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";
import Home from "./components/Home";

// import { PatientProvider } from './context/ PatientContext'

const App = () => {
  const [patients, setPatients] = useState<PatientEntry[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<string | null>(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    // setLoggedIn(true);
    // setUsername("DR. Smith");
    setLoginDialogOpen(true);
    handleMenuClose();
  };

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    handleMenuClose();
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const user = await userService.login({
        username,
        password,
      } as Credentials); // Credentials type assertion 
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("wrong credentials");
    }
    console.log("Username:", username);
    console.log("Password:", password);
    setLoginDialogOpen(false);
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <AppBar position="static" sx={{ margin: 0 }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                PATIENTOR
              </Typography>
              {loggedIn ? (
                <>
                  <Typography variant="subtitle2" sx={{ marginRight: 4 }}>
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
              {/* Login Dialog */}
              <Dialog open={loginDialogOpen} onClose={handleLoginDialogClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter your username and password to log in:
                  </DialogContentText>
                  <form onSubmit={handleLoginFormSubmit}>
                    <TextField
                      label="Username"
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      margin="normal"
                      required
                      fullWidth
                    />
                    <TextField
                      label="Password"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      margin="normal"
                      required
                      fullWidth
                    />
                    <Button type="submit" color="primary">
                      Login
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
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
          {/* Footer */}
          <Grid
            container
            component="footer"
            justifyContent="center"
            alignItems="center"
            sx={{ p: 2 }}
          >
            <Typography variant="subtitle2" sx={{ marginRight: 1 }}>
              2023 - Patienter - View on GitHub
            </Typography>
            <a
              href="https://github.com/adrian-qorbani/patientor"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <GitHubIcon sx={{ fontSize: 30, mr: 1 }} />
            </a>
          </Grid>
        </div>
      </Router>
    </div>
  );
};

export default App;
