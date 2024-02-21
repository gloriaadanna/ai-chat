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
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = searchParams.get('userId');
        const promptsRef = collection(db, "prompts");
        const q = query(promptsRef, where("userId", "==", userId), orderBy("createdDate", "desc"));
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
            {data.map((item) => (
              <PromptCard key={data.id} {...item} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Suspense>
  );
}