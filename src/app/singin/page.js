"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { CircularProgress } from '@mui/material';
import { initializeFirebaseApp } from '@/services/firebaseClient';

export default function Home() {
  const router = useRouter();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  function validateEmail(email) {
    if (email === '') {
      setEmailError(true);
      return true;
    }
    setEmailError(false);
  }

  function validatePassword(password) {
    if (password === '') {
      setPasswordError(true);
      return true;
    }
    setPasswordError(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    console.log({
      email: email,
      password: password,
    });
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      console.log('Email or password validation failed');
      return;
    }
    try {
      setLoading(true);
      initializeFirebaseApp();
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in:', user.uid);
      router.replace(`/home?userId=${user.uid}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error signing in:', error.message);
      throw error;
    }
  };

  return (

    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={4} square>
        <Box
          sx={{
            my: 24,
            mx: 22,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          <Typography variant="h3" sx={{ my: 2 }}>
            WELCOME BACK!
          </Typography>
          <Typography variant="h4" sx={{ my: 1 }}>
            Redefine your AI Experience
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={emailError}
                helperText={emailError ? 'Please enter an email' : ''}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={passwordError}
                helperText={passwordError ? 'Please enter a password' : ''}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Grid container justifyContent="flex-end">
                {loading ? (<CircularProgress size={25} />) : (<Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>)}
              </Grid>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  New User?
                  <Link href="/signup" sx={{ ml: 1 }}>
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
