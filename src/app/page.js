"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="m">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          AI Chat
        </Typography>
        <Typography variant="h3" component="h2" gutterBottom>
          Discover the Future of AI Conversations
        </Typography>
        <Typography paragraph>
          Our ChatGPT clone leverages cutting-edge AI technology to offer users a revolutionary chat experience. Explore some of the advantages:
        </Typography>
        <Typography component="ul">
          <li>Seamless Interaction - Engage in natural, human-like conversations.</li>
          <li>Wide Knowledge Base - Get information across a broad range of topics.</li>
          <li>Instantaneous Responses - Receive quick and accurate answers.</li>
          <li>24/7 Availability - Access the AI chatbot anytime, anywhere.</li>
          <li>Continuous Learning - Our AI constantly evolves, improving with every interaction.</li>
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            router.push('/signup');
          }}
          color="primary" sx={{ mt: 4 }}>
          Procees to SignUP
        </Button>
      </Box>
    </Container>
  );
}
