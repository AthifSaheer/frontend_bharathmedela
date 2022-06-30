import react, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';

import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const theme = createTheme();

export default function AddExperience() {
    const [gender, setGender] = useState('Gender');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
    };

    const handleChange = (event) => {
        setGender(event.target.value);
    };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
          Add Experience
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="Company"
                  label="Company"
                  name="Company"
                  autoComplete="family-name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="JobRole"
                  label="Job Role"
                  name="JobRole"
                  autoComplete="JobRole"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Join Date"
                  label="Join Date"
                  name="Join Date"
                  autoComplete="Join Date"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Resign Date"
                  label="Resign Date"
                  name="Resign Date"
                  autoComplete="Resign Date"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Summary"
                  label="Summary"
                  name="Summary"
                  autoComplete="Summary"
                />
              </Grid>

            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Submit
            </Button>
            
            <Link to="/resume" >
                <Button
                    type=""
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Back to resume
                </Button>
            </Link>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}