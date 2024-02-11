"use client";

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PromptCard from './../../components/promptCard';

export default function History() {
  const prompts = [
    { "prompt": "Item 1", "result": "Item 1 Result" },
    { "prompt": "Item 2", "result": "Item 2 Result" },
    { "prompt": "Item 3", "result": "Item 3 Result" },
    { "prompt": "Item 1", "result": "Item 1 Result" },
    { "prompt": "Item 2", "result": "Item 2 Result" },
    { "prompt": "Item 3", "result": "Item 3 Result" },
    { "prompt": "Item 1", "result": "Item 1 Result" },
    { "prompt": "Item 2", "result": "Item 2 Result" },
    { "prompt": "Item 3", "result": "Item 3 Result" },
    { "prompt": "Item 1", "result": "Item 1 Result" },
    { "prompt": "Item 2", "result": "Item 2 Result" },
    { "prompt": "Item 3", "result": "Item 3 Result" },
    { "prompt": "Item 1", "result": "Item 1 Result" },
    { "prompt": "Item 2", "result": "Item 2 Result" },
    { "prompt": "Item 3", "result": "Item 3 Result" },
  ];

  return (<Grid container component="main" sx={{ height: '100vh' }}>
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
        {prompts.map((item) => (
          <PromptCard {...item} />
        ))}
      </Box>
    </Grid>
  </Grid>);
}