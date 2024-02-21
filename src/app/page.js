"use client";

import { Container, Typography, Button, AppBar, Toolbar, Box, Card, CardMedia, CardContent, Grid, Link } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Chat
          </Typography>
          <Button color="inherit" href="#features">Features</Button>
          <Button color="inherit" href="#about">About</Button>
        </Toolbar>
      </AppBar>

      <Container>
        <CardMedia component="img" height="650" image="/ai-concept-vector.jpg" alt="Feature 2" />
      </Container>

      <Container maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            AI Chat
          </Typography>
          <Typography variant="h5" component="h2" color="textSecondary" gutterBottom>
            Revolutionizing Conversations with AI
          </Typography>
          <Button variant="contained" color="primary" onClick={() => {
            router.push('/signin');
          }}>
            Try It Now
          </Button>
        </Box>

        <Grid container spacing={4} id="features">
          {/* Feature 1 */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia component="img" height="140" image="/features/download_and_share.png" alt="Feature 1" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Instant Replies
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  Get immediate, accurate responses to your questions, anytime.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 2 */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia component="img" height="140" image="/features/history.png" alt="Feature 2" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  History
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  View your chat history anytime, anywhere, from any device
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia component="img" height="140" image="/features/share.png" alt="Feature 3" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Download and Share
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  Download and share your responses on your favourite social media platforms.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md" component="footer" sx={{ my: 4 }} id="about">
        <Typography variant="h6" align="center" gutterBottom>
          About
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Inspired by the power of AI, this project aims to introduce users to the power and capabilities of AI. We aim to bring people closer to AI and use AI to impact their lives positively.
        </Typography>
        <Box mt={3} textAlign="center">
          <Link href="https://github.com/gloriaadanna" target="_blank" rel="noopener">GitHub</Link> |
          <Link href="https://www.linkedin.com/in/gloria-agwam-8480241b3?trk=contact-info" target="_blank" rel="noopener" sx={{ ml: 1 }}>LinkedIn</Link>
        </Box>
      </Container>
    </div>
  );
}
