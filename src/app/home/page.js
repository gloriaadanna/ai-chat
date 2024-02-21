"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PromptCard from '@/components/PromptCard';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SendIcon from '@mui/icons-material/Send';
import { Typography, CircularProgress } from '@mui/material';
import { collection, addDoc, query, getDocs, where, orderBy, limit } from "firebase/firestore";

import { ChatGPTAPI } from 'chatgpt'
import { db } from '@/services/firebaseClient';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [promptError, setPromptError] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = searchParams.get('userId');
        const promptsRef = collection(db, "prompts");
        const q = query(promptsRef, where("userId", "==", userId), orderBy("createdDate", "desc"), limit(5));
        const querySnapshot = await getDocs(q);
        let prompts = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          var firestoreData = doc.data();
          console.log(doc.id, " => ", firestoreData);
          prompts.push({ "id": doc.id, "prompt": firestoreData.prompt, "result": firestoreData.result });
        });
        setData(prompts);
      } catch (error) {
        console.error('Error fetching data from Firestore: ', error);
        return [];
      }
    }
    fetchData();
  }, [searchParams]);

  function validatePrompt(email) {
    if (email === '') {
      setPromptError(true);
      return true;
    }
    setPromptError(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const prompt = formData.get('prompt');
    console.log(prompt);
    if (validatePrompt(prompt)) {
      console.log('Prompt validation failed');
      return;
    }

    setLoading(true);
    const api = new ChatGPTAPI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      fetch: self.fetch.bind(self),
    });
    try {
      var response = await api.sendMessage(prompt);
      console.log(response);
      const userId = searchParams.get('userId');
      const createdDate = new Date();
      const docRef = await addDoc(collection(db, "prompts"), {
        userId: userId,
        prompt: prompt,
        result: response.text,
        createdDate: createdDate,
      });
      console.log("Document written with ID: ", docRef.id);
      const newPrompt = { "id": docRef.id, "prompt": prompt, "result": response.text, "createdDate": createdDate };
      console.log("new prompt => ", newPrompt);
      let updatedData = [newPrompt];
      setData(updatedData.concat(data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      throw error;
    }
  }

  return (
    <Suspense>
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
                autoFocus
                multiline
                rows={6}
                error={promptError}
                helperText={promptError ? 'Please enter a valid prompt' : ''}
              />

              <Grid container justifyContent="flex-end">
                {loading ? (<CircularProgress size={25} sx={{ my: 4 }} />) : (<Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mt: 3, mb: 2 }}
                  endIcon={<SendIcon />}
                >
                  Submit
                </Button>)}
              </Grid>
            </Box>
          </Box>
          <Button
            type="submit"
            variant="text"
            size="large"
            sx={{ mx: 3, mb: 0.5, display: "flex", justifyContent: "end", alignItems: "flex-end" }}
            onClick={() => {
              const userId = searchParams.get('userId');
              router.push(`/history?userId=${userId}`);
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
            {data.length === 0
              ? <Typography variant="h4" sx={{ my: 2 }}>
                Enter a prompt to start chatting!
              </Typography>
              : data.map((item) => (
                <PromptCard key={item.id} {...item} />
              ))}
          </Box>
        </Grid>
      </Grid>
    </Suspense>
  );
}