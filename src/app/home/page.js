"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PromptCard from './../../components/promptCard';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';
import { collection, addDoc } from "firebase/firestore"; 

import { ChatGPTAPI } from 'chatgpt'
import { db } from '@/services/firebaseClient';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [promptError, setPromptError] = useState(false);

  const prompts = [];

  function validatePrompt(email) {
    if (email === '') {
      setPromptError(true);
      return true;
    }
    setPromptError(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const prompt = data.get('prompt');
    console.log(prompt);
    if (validatePrompt(prompt)) {
      console.log('Prompt validation failed');
      return;
    }

    const api = new ChatGPTAPI({
      apiKey: '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',
      fetch: self.fetch.bind(self),
    });
    try {
      var response = await api.sendMessage(prompt);
      const userId = searchParams.get('userId')
      const docRef = await addDoc(collection(db, "prompts"), {
        userId: userId,
        prompt: prompt,
        result: response.text,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error);
      throw error;
    }

  }

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={4.5}
        >
          <Box
            sx={{
              my: 4,
              mx: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
            }}
          >

            <Box component="form" noValidate onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="prompt"
                label="Prompt"
                name="prompt"
                autoComplete="email"
                autoFocus
                multiline
                rows={6}
                error={promptError}
                helperText={promptError ? 'Please enter a valid prompt' : ''}
              />

              <Grid container justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mt: 3, mb: 2 }}
                  endIcon={<SendIcon />}
                >
                  Submit
                </Button>
              </Grid>
            </Box>
          </Box>
          <Button
            type="submit"
            variant="text"
            size="large"
            sx={{ mx: 3, mb: 0.5, display: "flex", justifyContent: "end", alignItems: "flex-end" }}
            onClick={() => {
              router.push('/history');
            }}
          >
            History
          </Button>
          <Button
            type="submit"
            variant="text"
            size="large"
            startIcon={<LogoutOutlinedIcon />}
            sx={{ mx: 3, mb: 0.5, display: "flex", justifyContent: "end", alignItems: "flex-end" }}
            onClick={() => {
              router.replace('/');
            }}
          >
            Logout
          </Button>
        </Grid>
        <Grid item xs={12} sm={8} md={6.5} component={Paper} elevation={0} square>
          <Box
            sx={{
              my: 4,
              mx: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
            }}
          >
            {prompts.length === 0
              ? <Typography variant="h4" sx={{ my: 2 }}>
                Enter a prompt to start chatting!
              </Typography>
              : prompts.map((item) => (
                <PromptCard {...item} />
              ))}
          </Box>
        </Grid>
      </Grid>
  );
}