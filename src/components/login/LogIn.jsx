import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime } from '@mui/material/colors';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import logInStyles from "./login_style.module.scss";


const defaultTheme = createTheme({
  palette: {
    primary: {
      main: lime[900],
    },
    secondary: {
      main: lime[200],
    }
  }
}

);

const handleLogin = (data) => {
  console.log(data);

  const storedFormData = localStorage.getItem('formData');
  if (storedFormData) {
    const parsedData = JSON.parse(storedFormData);
    const { email, password } = parsedData;
    if (email === data.email && password === data.password) {
      alert('You are welcome!');
    } else {
      alert('No contact details');
    }
  } else {
    alert('No contact details');
  }

};


const LogIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className={logInStyles.logIn_container}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" className={logInStyles.logIn_box_form} sx={{ bgcolor: defaultTheme.palette.secondary.main }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 2, bgcolor: defaultTheme.palette.primary.main }}>
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleLogin)}
              sx={{
                marginTop: 3,
                alignItems: 'center',
              }}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus

                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    value={formData.email}
                    onChange={(e) => {
                      handleChange(e);
                      setValue('email', e.target.value);
                    }}
                    error={!!errors.email}
                    helperText={errors.email && 'Please enter a valid email address'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register('password', { required: true, minLength: 6 })}
                    onChange={(e) => {
                      handleChange(e);
                      setValue('password', e.target.value);
                    }}
                    error={!!errors.password}
                    helperText={errors.password && 'Password must be at least 6 characters long'}
                  />
                </Grid>
              </Grid>
            </Box>
            <button className={logInStyles.logIn_btn} type='submit' >Log in</button>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}
export default LogIn