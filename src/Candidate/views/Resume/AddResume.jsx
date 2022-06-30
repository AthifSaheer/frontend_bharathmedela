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

import { Link, useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as event from './HandleChanger';
import { addResumeDetailsAPI } from '../../API/APIService'
import axios from 'axios';

const theme = createTheme();

export default function AddResume() {
    let StudentID = sessionStorage.getItem("token");
    let decoded_id = atob(atob(atob(StudentID)));
    
    const [genderDropdown, setGenderDropdown] = useState('Gender');
    const [experience, setExperience] = useState('Experience');
    const [education, setEducation] = useState('Education');
    const [lookingForAJob, setlookingForAJob] = useState(false);
    
    const history = useHistory();
    
    const [error, setError] = useState('');

    const handleChangeGender = (event) => {
      setGenderDropdown(event.target.value)
    };
    const handleChangeExperience = (event) => {
      setExperience(event.target.value)
    };
    const handleChangeEducation = (event) => {
      setEducation(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('lookingForAJob') == null) {
          setlookingForAJob(true)
        } else {
          setlookingForAJob(false)
        }

        var datax = {
          student_id: 1,
          first_name: data.get('firstName'),
          last_name: data.get('lastName'),
          profile_text: data.get('profileTitle'),
          gender: data.get('gender'),
          email: data.get('email'),
          ph: data.get('phoneNumber'),
          linkedin_link: data.get('linkedinLink'),
          skills: data.get('skills'),
          experience: data.get('experience'),
          education: data.get('education'),
          current_location: data.get('currentLocation'),
          country: data.get('country'),
          preferred_location: data.get('preferredLocation'),
          resume_pdf: data.get('resumePdf'),
          photo: data.get('photo'),
          looking_for_a_job: lookingForAJob
        };
        console.log("-data- ", datax);
 
        axios.post(`${addResumeDetailsAPI}/${decoded_id}`, datax)
        .then((res) => {
          console.log("Success ----- !!", res.data);
          if(res.data["Success"]) {
            history.push("/resume");
            setError('')
          } else if(res.data['Error']){
            setError(res.data['Error'])
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

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
            Resume
          </Typography>
          <p style={{ color: 'red' }}>{error}</p>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  // onChange={handleChangefirstName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  // onChange={handleChangelastName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="profileTitle"
                  label="Profile Title"
                  name="profileTitle"
                  autoComplete="profileTitle"
                  // onChange={handleChangeprofileText}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="skills"
                  label="Skills"
                  name="skills"
                  autoComplete="skills"
                  // onChange={handleChangeskills}
                />
                <p>*saperate with coma(,)</p>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  // onChange={handleChangeemail}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  // onChange={handleChangePH}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Select 
                value={genderDropdown}
                onChange={handleChangeGender}
                displayEmpty
                name="gender"
                inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={"Gender"}>Gender</MenuItem>
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Others"}>Others</MenuItem>
                </Select>
            </Grid>

            <Grid item xs={12} sm={12}>
                <Select 
                value={experience}
                onChange={handleChangeExperience}
                displayEmpty
                name="experience"
                inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={"Experience"}>Experience</MenuItem>
                    <MenuItem value={"1"}>1 Year</MenuItem>
                    <MenuItem value={"2"}>2 Years</MenuItem>
                    <MenuItem value={"3"}>3 Years</MenuItem>
                    <MenuItem value={"4"}>4 Years</MenuItem>
                    <MenuItem value={">5"}>More than 5 years</MenuItem>
                </Select>
            </Grid>

            <Grid item xs={12} sm={12}>
                <Select 
                value={education}
                onChange={handleChangeEducation}
                displayEmpty
                name="education"
                inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={"Education"}>Education</MenuItem>
                    <MenuItem value={"Under graduate"}>Under graduate</MenuItem>
                    <MenuItem value={"Post graduate"}>Post graduate</MenuItem>
                    <MenuItem value={"Others"}>Others</MenuItem>
                </Select>
            </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="linkedinLink"
                  label="Linkedin Link"
                  type="linkedinLink"
                  id="linkedinLink"
                  autoComplete="new-linkedinLink"
                  // onChange={handleChangelinkedinLink}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="currentLocation"
                  label="Current Location"
                  type="currentLocation"
                  id="currentLocation"
                  autoComplete="new-currentLocation"
                  // onChange={handleChangecurrentLocation}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="country"
                  label="Country"
                  type="country"
                  id="country"
                  autoComplete="new-country"
                  // onChange={handleChangecountry}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="preferredLocation"
                  label="Preferred Location"
                  type="preferredLocation"
                  id="preferredLocation"
                  autoComplete="new-preferredLocation"
                  // onChange={handleChangepreferredLocation}
                />
              </Grid>

              <Grid item xs={12}>
                <label htmlFor="">Photo</label>  <br />
                <input type="file" name="photo" />
              </Grid>

              <Grid item xs={12}>
                <label htmlFor="">Resume(PDF file)</label>  <br />
                <input type="file" name="resumePdf" />
              </Grid>

              <Grid item xs={12}>
                <input type="checkbox" />
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Looking for a Job"
                  name="lookingForAJob"
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

// Experience
// Resume pdf
// Photo