"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PromptCard from '@/components/PromptCard';
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";

import { db } from '@/services/firebaseClient';


export default function History() {
  const searchParams = useSearchParams();
  const [history, setPromptHistory] = useState([]);

  useEffect(() => {
    // fetch previous prompts and responses 
    async function fetchQueriesAndResponses() {
      try {
        const userId = searchParams.get('userId');
        const promptsRef = collection(db, "prompts");
        const dataQuery = query(promptsRef, where("userId", "==", userId), orderBy("createdDate", "desc"));
        const querySnapshot = await getDocs(dataQuery);
        let prompts = [];
        querySnapshot.forEach((doc) => {
          var firestoreData = doc.data();
          prompts.push({ "id": doc.id, "prompt": firestoreData.prompt, "result": firestoreData.result });
        });
        // Update prompt state
        setPromptHistory(prompts);
      } catch (error) {
        console.error('Error fetching data from Firestore: ', error);
        return [];
      }
    }
    fetchQueriesAndResponses();
  }, [searchParams]);

  return (
    <Suspense>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item md={12} component={Paper} elevation={0} square>
          <Box
            sx={{
              my: 4,
              mx: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
            }}
          >
            {history.map((item) => (
              <PromptCard key={history.id} {...item} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Suspense>
  );
}